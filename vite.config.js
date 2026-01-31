import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/app.js'),
            name: 'ClickyBot',
            fileName: () => 'clickysdk.js', // Force specific filename
            formats: ['umd']
        },
        sourcemap: true,
        outDir: 'dist'
    },
    resolve: {
        alias: {
            // In dev mode, redirect request for the built file to the source entry
            './clickysdk.js': resolve(__dirname, 'src/app.js')
        }
    }
});
