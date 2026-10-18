import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const baseDir = path.resolve('dist/eurova-market/browser');
const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  let filePath = path.join(baseDir, reqPath);

  // 1. Direct file match
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    // Serve directly
  }
  // 2. Directory match -> look for index.html inside
  else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  // 3. Subpath without trailing slash (e.g. /our-stores -> dist/eurova-market/browser/our-stores/index.html)
  else if (fs.existsSync(path.join(baseDir, reqPath, 'index.html'))) {
    filePath = path.join(baseDir, reqPath, 'index.html');
  }
  // 4. Asset requested with subpath prefix (e.g. /our-stores/chunk-XYZ.js -> dist/eurova-market/browser/chunk-XYZ.js)
  else if (fs.existsSync(path.join(baseDir, path.basename(reqPath)))) {
    filePath = path.join(baseDir, path.basename(reqPath));
  }
  // 5. Fallback 404
  else {
    filePath = path.join(baseDir, '404.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const is404 = filePath.endsWith('404.html') && !reqPath.includes('404');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    } else {
      res.writeHead(is404 ? 404 : 200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(content);
    }
  });
});

const PORT = 4280;
server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
});
