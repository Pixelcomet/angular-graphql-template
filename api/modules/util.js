import fs from 'fs'
import path from 'path';

export const readFile = (p) => fs.readFileSync(path.join(__dirname, p), "utf8");