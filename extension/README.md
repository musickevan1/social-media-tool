# LinkedIn Social Growth Bot Extension

This is a minimal MVP Chrome extension that adds a sidebar to LinkedIn pages with tools for safe engagement. Only the **AutoLike** tool is functional. Other tools are placeholders for future versions.

## Installation

1. Clone this repository.
2. Run `npm install` in the project root to install dependencies.
3. Build the extension with `npm run build`. The compiled files will be created in the `dist` folder.
4. Open Chrome's extension page (`chrome://extensions`), enable **Developer mode**, and choose **Load unpacked**.
5. Select the `dist` folder to load the extension.
6. Navigate to LinkedIn and the sidebar will appear on the right side.

## Usage

1. Enter keywords or hashtags (comma separated).
2. Adjust the session and hourly like limits or enable **Safe Mode** for slower actions.
3. Click **Start** to begin auto-liking matching posts in your feed. Click **Stop** to halt.
4. Activity logs can be cleared with the **Clear Log** button.

All settings and logs are stored using Chrome storage and will persist across sessions.

This MVP is for educational use. Use responsibly and respect LinkedIn's terms of service.
