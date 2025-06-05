import dotenv from 'dotenv';
import fs from 'fs-extra';

const envFile = new URL('../.env', import.meta.url);
if (fs.existsSync(envFile)) dotenv.config({ path: envFile });

function parseList(value = '') {
  return value.split(',').map((v) => v.trim()).filter(Boolean);
}

const config = {
  tags: parseList(process.env.TAGS),
  clapCount: parseInt(process.env.CLAP_COUNT, 10) || 0,
  minDelay: parseInt(process.env.MIN_DELAY_MS, 10) || 0,
  maxDelay: parseInt(process.env.MAX_DELAY_MS, 10) || 0,
};

if (!config.tags.length) throw new Error('TAGS not configured');
if (!config.clapCount) throw new Error('CLAP_COUNT must be > 0');
if (config.minDelay > config.maxDelay) throw new Error('MIN_DELAY_MS must be <= MAX_DELAY_MS');

export default config;
