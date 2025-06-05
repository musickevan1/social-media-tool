# Medium Engagement Automation Tool

Automates clapping on newly published Medium articles for selected tags.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Export your Medium session cookies to `cookies/medium-session.json`.
3. Edit `.env` with desired tags and delays.

## Usage
```bash
npm start
```
Logs are written per day in the `logs/` folder.

Use responsibly: limit to under **50 claps per hour** to respect Medium TOS.
