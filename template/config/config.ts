import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

// Optional variables from .env
const optional: string[] = [
];

const baseConfig = dotenv.parse(fs.readFileSync('./.env.example'));

Object.keys(baseConfig).forEach(k => {
  if (optional.indexOf(k) === -1 && !process.env[k]) {
    throw new Error(`make sure to set ${k} in the .env!`);
  }
});
