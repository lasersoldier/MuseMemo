import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BubbleNode } from '../types';

interface BubbleCanvasProps {
  data: BubbleNode[];
  onNodeClick: (node: BubbleNode) => void;
  width?: number;
  height?: number;
}

export const BubbleCanvas: React.FC<BubbleCanvasProps> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: wrapperRef.current.clientHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const maxVal = d3.max(data, d => d.value) || 1;
    
    // Scale for bubble sizes
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxVal])
      .range([55, 110]); 

    const nodes = data.map(d => ({
      ...d,
      r: radiusScale(d.value),
      x: width / 2 + (Math.random() - 0.5) * 50,
      y: height / 2 + (Math.random() - 0.5) * 50
    }));

    const simulation = d3.forceSimulation<any>(nodes)
      .force('charge', d3.forceManyBody().strength(5)) 
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => d.r + 5).strength(0.8))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const container = svg.append('g');

    // Drag behavior
    const drag = d3.drag<SVGGElement, any>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    const nodeGroup = container.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node cursor-pointer group')
      .call(drag as any)
      .on('click', (event, d) => {
        onNodeClick(d);
      });

    // --- Simple Transparent Defs ---
    const defs = svg.append('defs');

    const createSubtleGrad = (id: string, color: string) => {
        const grad = defs.append('radialGradient')
            .attr('id', id)
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('r', '50%');

        // Center is almost clear (5% opacity)
        grad.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.05);
        // Edge is slightly more visible (25% opacity)
        grad.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0.25);
    };

    createSubtleGrad('grad-blue', '#3B82F6');
    createSubtleGrad('grad-green', '#10B981');
    createSubtleGrad('grad-purple', '#8B5CF6');
    createSubtleGrad('grad-orange', '#F59E0B');
    createSubtleGrad('grad-gray', '#94a3b8');

    const getColorKey = (c: string) => {
        if (c.includes('3B82F6')) return 'blue';
        if (c.includes('10B981')) return 'green';
        if (c.includes('8B5CF6')) return 'purple';
        if (c.includes('F59E0B')) return 'orange';
        return 'gray';
    }

    // 1. The Sphere Body
    nodeGroup.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => `url(#grad-${getColorKey(d.color)})`)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.6) // Semi-transparent border
      .attr('class', 'transition-all duration-300 ease-out')
      // Hover effect managed via CSS/D3 events for smoother interaction
      .on('mouseover', function() {
         d3.select(this).attr('stroke-opacity', 1).attr('stroke-width', 2);
      })
      .on('mouseout', function() {
         d3.select(this).attr('stroke-opacity', 0.6).attr('stroke-width', 1.5);
      });

    // 2. Simple Label Text
    nodeGroup.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .style('fill', '#FFFFFF')
      .style('font-size', d => Math.min(d.r / 3.5, 18) + 'px') // Slightly adjusted font size
      .style('font-weight', '500')
      .style('letter-spacing', '0.05em')
      .style('text-shadow', '0px 2px 4px rgba(0,0,0,0.8)') // Essential for readability on dark
      .style('pointer-events', 'none')
      .attr('class', 'select-none font-sans');
      
    // 3. Count Text (Small subtitle)
    nodeGroup.append('text')
      .text(d => d.value > 0 ? d.value : '')
      .attr('text-anchor', 'middle')
      .attr('dy', '2.2em')
      .style('fill', 'rgba(255,255,255,0.6)')
      .style('font-size', '10px')
      .style('font-weight', '400')
      .style('pointer-events', 'none')
      .attr('class', 'select-none');

    simulation.on('tick', () => {
      nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, dimensions, onNodeClick]);

  return (
    <div ref={wrapperRef} className="w-full h-full relative overflow-hidden">
        <svg 
            ref={svgRef} 
            width={dimensions.width} 
            height={dimensions.height}
            className="w-full h-full block touch-none"
        />
    </div>
  );
};