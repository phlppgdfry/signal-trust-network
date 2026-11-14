import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const htmlPath = path.join(rootDir, "site", "index.html");
const cssPath = path.join(rootDir, "site", "assets", "css", "styles.css");
const enginePath = path.join(rootDir, "site", "assets", "lib", "signal-engine.mjs");
const appPath = path.join(rootDir, "site", "assets", "js", "app.mjs");
const outPath = path.join(rootDir, "signal-demo.html");

const html = fs.readFileSync(htmlPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const engineCode = fs
  .readFileSync(enginePath, "utf8")
  .replace(/^export\s+/gm, "");

const appCode = fs
  .readFileSync(appPath, "utf8")
  .replace(/import\s+\{[\s\S]*?\}\s+from\s+"\.\.\/lib\/signal-engine\.mjs";\s*/, "")
  .replace(/^export\s+/gm, "");

const bundledHtml = html
  .replace(
    '<link rel="stylesheet" href="assets/css/styles.css" />',
    `<style>\n${css}\n</style>`
  )
  .replace(
    '<script type="module" src="assets/js/app.mjs"></script>',
    `<script>\n(function() {\n${engineCode}\n${appCode}\n})();\n</script>`
  );

fs.writeFileSync(outPath, bundledHtml, "utf8");
console.log(`Built standalone single-file demo: ${outPath} (${bundledHtml.length} bytes)`);
