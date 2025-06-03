import { defineConfig } from 'vite';
import { resolve } from 'path';
import { mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';

function copyDir(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  for (const item of readdirSync(srcDir)) {
    const srcPath = resolve(srcDir, item);
    const destPath = resolve(destDir, item);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

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
      copyDir(resolve(base, 'libs'), resolve(out, 'libs'));
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
        app: resolve(__dirname, 'extension/app.js'),
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
