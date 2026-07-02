import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || process.env.PORT || 5173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);
  const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  let filePath = resolve(join(root, cleanPath || "index.html"));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!existsSync(filePath)) {
    filePath = resolve(join(root, "index.html"));
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": types[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Ravele Royal Farming site running at http://localhost:${port}/`);
  console.log(`Serving ${root}`);
});
