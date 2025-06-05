import config from './src/config.js';
import login from './src/login.js';
import discoverArticles from './src/discoverArticles.js';
import autoClap from './src/autoClap.js';

(async () => {
  try {
    const { browser } = await login();
    const urls = await discoverArticles(browser, config.tags);
    const summary = await autoClap(browser, urls, config);
    await browser.close();

    console.log(`Processed: ${summary.processed}, Failures: ${summary.failures}`);
    // TODO: enforce <50 claps per hour to comply with Medium TOS
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
