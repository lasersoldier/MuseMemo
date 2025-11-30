import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Use Vite's built-in env loading
    const env = loadEnv(mode, '.', 'VITE_');
    console.log('Vite loaded environment variables:', Object.keys(env));
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Only define non-VITE_ variables here
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
