import fs from 'fs-extra';
import dayjs from 'dayjs';

function randomPause(min, max) {
  return min + Math.random() * (max - min);
}

export default async function autoClap(browser, urls, { clapCount, minDelay, maxDelay }) {
  const logDir = new URL('../logs', import.meta.url);
  await fs.ensureDir(logDir);
  const logPath = new URL(`engagement-${dayjs().format('YYYYMMDD')}.txt`, logDir);
  const logStream = fs.createWriteStream(logPath, { flags: 'a' });

  const summary = { processed: 0, failures: 0 };

  for (const url of urls) {
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('button[data-action="show-recommends"]', { timeout: 10000 });
      const title = await page.title();

      for (let i = 0; i < clapCount; i += 1) {
        await page.click('button[data-action="show-recommends"]');
        await page.waitForTimeout(randomPause(200, 350));
      }

      logStream.write(`${new Date().toISOString()}\t${title}\t${url}\n`);
      summary.processed += 1;
    } catch (err) {
      console.error(`Error with ${url}:`, err.message);
      summary.failures += 1;
    } finally {
      await page.close();
      await new Promise((res) => setTimeout(res, randomPause(minDelay, maxDelay)));
    }
  }

  logStream.end();
  return summary;
}
