//node
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
//modules
import mime from 'mime';
import Terminal from '@stackpress/lib/Terminal';

async function main() {
  const cli = new Terminal([]);
  //make a server
  const server = createServer(function (req, res) {
    //check req path with docs folder (add .html if no extension)
    let pathname = req.url || '/';
    if (pathname === '/') {
      pathname = '/index.html';
    } else if (!path.extname(pathname)) {
      pathname += '.html';
    }
    //read file from docs folder
    const filePath = path.join(process.cwd(), 'docs', pathname);
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        //determine mime type
        const mimeType = mime.getType(pathname) || 'text/plain';
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
      }
    });
  });
  //start the server
  server.listen(3001, () => {
    cli.control.system('Server is running on port 3001');
    cli.control.system('------------------------------');
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});