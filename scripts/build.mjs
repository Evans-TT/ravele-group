import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const dist = join(root, "dist");
const files = ["index.html", "styles.css", "script.js", "assets"];

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

for (const file of files) {
  cpSync(join(root, file), join(dist, file), { recursive: true });
}

writeFileSync(join(dist, ".nojekyll"), "");
console.log("Built dist folder for GitHub Pages.");
