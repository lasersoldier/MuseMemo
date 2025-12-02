import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { useLanguage } from '../i18n/LanguageContext';
import { X, ChevronRight } from 'lucide-react';

interface TutorialStep {
    targetId: string;
    title: string;
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'center';
    action?: 'click' | 'next'; // 'click' means wait for user to click the target, 'next' means show next button
}

const STEPS: TutorialStep[] = [
    {
        targetId: 'center',
        title: 'Welcome to MuseMemo',
        content: 'This tutorial will guide you through the basics of discovering and managing prompts.',
        position: 'center',
        action: 'next'
    },
    {
        targetId: 'nav-library',
        title: 'Nexus Library',
        content: 'Click here to access the public database of neural instructions.',
        position: 'right',
        action: 'click'
    },
    {
        targetId: 'tutorial-first-prompt-card',
        title: 'View Prompts',
        content: 'Here you can browse available prompts. Hover over a card to see details.',
        position: 'bottom',
        action: 'next'
    },
    {
        targetId: 'tutorial-view-btn',
        title: 'Preview Prompt',
        content: 'Click "View" to see a preview of what this prompt does.',
        position: 'left',
        action: 'click'
    },
    {
        targetId: 'tutorial-preview-modal-close',
        title: 'Close Preview',
        content: 'This shows you the prompt content and sample output. Click the X button to close.',
        position: 'top',
        action: 'click'
    },
    {
        targetId: 'tutorial-add-prompt-btn',
        title: 'Acquire Prompt',
        content: 'Click the + button to save this prompt to your personal space.',
        position: 'left',
        action: 'click'
    },
    {
        targetId: 'nav-myspace',
        title: 'My Space',
        content: 'Now, let\'s go to your personal workspace to use your saved prompts.',
        position: 'right',
        action: 'click'
    },
    {
        targetId: 'tutorial-model-bubble',
        title: 'Select Model',
        content: 'Click on the ChatGPT bubble to view prompts for this AI model.',
        position: 'bottom',
        action: 'click'
    },
    {
        targetId: 'tutorial-category-bubble',
        title: 'Select Category',
        content: 'Click on the Tutorial category to view your tutorial prompt.',
        position: 'bottom',
        action: 'click'
    },
    {
        targetId: 'tutorial-copy-prompt-btn',
        title: 'Use Prompt',
        content: 'Click "COPY" to copy the prompt content to your clipboard.',
        position: 'left',
        action: 'click'
    },
    {
        targetId: 'center',
        title: 'Tutorial Complete',
        content: 'You are now ready to use MuseMemo. Enjoy!',
        position: 'center',
        action: 'next'
    }
];

export const TutorialOverlay: React.FC = () => {
    const { isTutorialActive, tutorialStep, nextTutorialStep, endTutorial, setTutorialStep } = useStore();
    const { t } = useLanguage();
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    // Get translated tutorial steps
    const STEPS = [
        {
            targetId: 'center',
            title: t.tutorialWelcomeTitle,
            content: t.tutorialWelcomeContent,
            position: 'center',
            action: 'next'
        },
        {
            targetId: 'nav-library',
            title: t.tutorialLibraryTitle,
            content: t.tutorialLibraryContent,
            position: 'right',
            action: 'click'
        },
        {
            targetId: 'tutorial-first-prompt-card',
            title: t.tutorialViewPromptsTitle,
            content: t.tutorialViewPromptsContent,
            position: 'bottom',
            action: 'next'
        },
        {
            targetId: 'tutorial-view-btn',
            title: t.tutorialPreviewTitle,
            content: t.tutorialPreviewContent,
            position: 'left',
            action: 'click'
        },
        {
            targetId: 'tutorial-preview-modal-close',
            title: t.tutorialClosePreviewTitle,
            content: t.tutorialClosePreviewContent,
            position: 'top',
            action: 'click'
        },
        {
            targetId: 'tutorial-add-prompt-btn',
            title: t.tutorialAcquireTitle,
            content: t.tutorialAcquireContent,
            position: 'left',
            action: 'click'
        },
        {
            targetId: 'nav-myspace',
            title: t.tutorialMySpaceTitle,
            content: t.tutorialMySpaceContent,
            position: 'right',
            action: 'click'
        },
        {
            targetId: 'tutorial-model-bubble',
            title: t.tutorialSelectModelTitle,
            content: t.tutorialSelectModelContent,
            position: 'bottom',
            action: 'click'
        },
        {
            targetId: 'tutorial-category-bubble',
            title: t.tutorialSelectCategoryTitle,
            content: t.tutorialSelectCategoryContent,
            position: 'bottom',
            action: 'click'
        },
        {
            targetId: 'tutorial-copy-prompt-btn',
            title: t.tutorialCopyTitle,
            content: t.tutorialCopyContent,
            position: 'left',
            action: 'click'
        },
        {
            targetId: 'center',
            title: t.tutorialCompleteTitle,
            content: t.tutorialCompleteContent,
            position: 'center',
            action: 'next'
        }
    ];

    const currentStep = STEPS[tutorialStep];

    useEffect(() => {
        if (!isTutorialActive) return;

        const updateRect = () => {
            if (currentStep.targetId === 'center') {
                setTargetRect(null);
                return;
            }

            const element = document.getElementById(currentStep.targetId);
            if (element) {
                setTargetRect(element.getBoundingClientRect());
            } else {
                // If element not found (e.g. view not loaded yet), retry or wait
                // For now, we might want to wait a bit or just show centered
                setTargetRect(null);
            }
        };

        updateRect();
        // Update on resize and scroll
        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, true);

        // Polling for element appearance (e.g. after page transition)
        const interval = setInterval(updateRect, 500);

        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect, true);
            clearInterval(interval);
        };
    }, [isTutorialActive, tutorialStep, currentStep]);

    // Handle click on target element
    useEffect(() => {
        if (!isTutorialActive || !currentStep || currentStep.action !== 'click' || currentStep.targetId === 'center') return;

        const element = document.getElementById(currentStep.targetId);
        if (!element) return;

        const handleClick = (e: Event) => {
            // For SVG elements (bubbles), we need to check if the click is on the element or its children
            const target = e.target as Element;
            const clickedElement = document.getElementById(currentStep.targetId);

            if (clickedElement && (target === clickedElement || clickedElement.contains(target))) {
                // Move to next step after a delay to allow animation/navigation
                // Longer delay for bubble clicks to allow D3 animation
                const delay = currentStep.targetId.includes('bubble') ? 800 : 500;
                setTimeout(() => {
                    nextTutorialStep();
                }, delay);
            }
        };

        // Listen on document for SVG elements
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [isTutorialActive, currentStep, nextTutorialStep]);

    // Smart skip detection: if user clicks elements out of order, skip to appropriate step
    useEffect(() => {
        if (!isTutorialActive) return;

        const handleGlobalClick = (e: Event) => {
            const target = e.target as Element;

            // Check if user clicked the add button before the tutorial step
            if (tutorialStep < 5) { // Before the "Acquire Prompt" step (index 5)
                const addBtn = document.getElementById('tutorial-add-prompt-btn');
                if (addBtn && (target === addBtn || addBtn.contains(target))) {
                    // Skip to the "My Space" step (step 6)
                    setTimeout(() => setTutorialStep(6), 500);
                }
            }
        };

        document.addEventListener('click', handleGlobalClick, true);
        return () => {
            document.removeEventListener('click', handleGlobalClick, true);
        };
    }, [isTutorialActive, tutorialStep, setTutorialStep]);

    if (!isTutorialActive) return null;

    // Calculate spotlight style
    const spotlightStyle: React.CSSProperties = targetRect ? {
        top: targetRect.top - 10,
        left: targetRect.left - 10,
        width: targetRect.width + 20,
        height: targetRect.height + 20,
        borderRadius: '12px',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85)'
    } : {
        // Center spotlight if no target (or center step)
        // Actually for center step we just want a modal-like overlay
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85)'
    };

    // Calculate tooltip position
    const getTooltipStyle = () => {
        if (!targetRect) {
            return {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            };
        }

        const gap = 20;
        switch (currentStep.position) {
            case 'top':
                return {
                    top: targetRect.top - gap,
                    left: targetRect.left + targetRect.width / 2,
                    transform: 'translate(-50%, -100%)'
                };
            case 'bottom':
                return {
                    top: targetRect.bottom + gap,
                    left: targetRect.left + targetRect.width / 2,
                    transform: 'translate(-50%, 0)'
                };
            case 'left':
                return {
                    top: targetRect.top + targetRect.height / 2,
                    left: targetRect.left - gap,
                    transform: 'translate(-100%, -50%)'
                };
            case 'right':
                return {
                    top: targetRect.top + targetRect.height / 2,
                    left: targetRect.right + gap,
                    transform: 'translate(0, -50%)'
                };
            default:
                return {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                };
        }
    };

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* Spotlight */}
            <div
                className="absolute transition-all duration-500 ease-in-out pointer-events-none"
                style={spotlightStyle}
            ></div>

            {/* Tooltip */}
            <div
                className="absolute w-80 bg-[#09090b] border border-white/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto transition-all duration-500 ease-in-out"
                style={getTooltipStyle()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{currentStep.title}</h3>
                    <button onClick={endTutorial} className="text-stone-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                    {currentStep.content}
                </p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {STEPS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${idx === tutorialStep ? 'bg-blue-500' : 'bg-white/10'}`}
                            ></div>
                        ))}
                    </div>

                    {currentStep.action === 'next' && (
                        <button
                            onClick={() => {
                                if (tutorialStep === STEPS.length - 1) {
                                    endTutorial();
                                } else {
                                    nextTutorialStep();
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-xs font-bold hover:bg-stone-200 transition-colors"
                        >
                            {tutorialStep === STEPS.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
