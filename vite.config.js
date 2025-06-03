import { defineConfig } from 'vite';
import { resolve } from 'path';
import { mkdirSync, copyFileSync } from 'fs';

function copyAssets() {
  return {
    name: 'copy-assets',
    closeBundle() {
      const base = resolve(__dirname, 'extension');
      const out = resolve(__dirname, 'dist');
      mkdirSync(out, { recursive: true });
      const files = ['manifest.json', 'style.css'];
      for (const f of files) {
        copyFileSync(resolve(base, f), resolve(out, f));
      }
    }
  };
}

export default defineConfig({
  root: 'extension',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, 'extension/contentScript.js')
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
        inlineDynamicImports: false
      }
    }
  },
  plugins: [copyAssets()]
});
