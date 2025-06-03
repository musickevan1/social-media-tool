# LinkedIn Social Growth Bot

This repository contains a minimal Chrome Extension that adds a sidebar to LinkedIn for safe engagement automation.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the extension:
   ```bash
   npm run build
   ```
   This creates a `dist` folder with the compiled extension.
3. In Chrome, open `chrome://extensions`, enable **Developer mode**, and choose **Load unpacked**. Select the `dist` folder.

The source code for the extension lives in the `extension/` directory. The `dist/` directory is generated on build and should be used when loading the extension.
