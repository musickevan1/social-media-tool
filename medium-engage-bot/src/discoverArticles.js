export default async function discoverArticles(browser, tags) {
  const allUrls = [];

  for (const tag of tags) {
    const page = await browser.newPage();
    const tagUrls = new Set();
    await page.goto(`https://medium.com/tag/${tag}`, { waitUntil: 'networkidle2' });

    let lastHeight = 0;
    while (tagUrls.size < 15) {
      const links = await page.$$eval('a[href*="/p/"]', as => as.map(a => a.href.split('?')[0]));
      links.forEach((link) => tagUrls.add(link));

      const newHeight = await page.evaluate('document.body.scrollHeight');
      if (newHeight === lastHeight) break;
      lastHeight = newHeight;
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForTimeout(1500);
    }

    allUrls.push(...tagUrls);
    await page.close();
  }

  return allUrls;
}
