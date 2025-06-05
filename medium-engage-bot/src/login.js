import fs from 'fs-extra';
import puppeteer from 'puppeteer';

export default async function login() {
  const cookiePath = new URL('../cookies/medium-session.json', import.meta.url);
  if (!await fs.pathExists(cookiePath)) {
    throw new Error('Cookie file missing. Export your Medium session to cookies/medium-session.json');
  }

  const browser = await puppeteer.launch({ headless: true });
  const [page] = await browser.pages();

  const cookies = await fs.readJson(cookiePath);
  await page.setCookie(...cookies);

  await page.goto('https://medium.com/', { waitUntil: 'networkidle2' });

  const avatar = await page.$('img.avatar-image');
  if (!avatar) {
    await browser.close();
    throw new Error('Login failed. Check your session cookies.');
  }

  return { browser, page };
}
