# 🔍 Core Node.js Body Parsing (No Express)

When using the native `http` module, Node.js provides the raw request body as a stream. Unlike Express, there's no built-in middleware to parse the body, so we do it manually.

## 📦 Steps to Parse Body in Core Node

1. Listen to `'data'` events on `req` to collect incoming chunks.
2. Concatenate and convert chunks to a full string.
3. After `'end'` event, parse the string based on `Content-Type`.

## 📌 Example

```js
const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      const contentType = req.headers['content-type'];
      let parsed;

      if (contentType === 'application/json') {
        parsed = JSON.parse(body);
      } else if (contentType === 'application/x-www-form-urlencoded') {
        parsed = querystring.parse(body);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(parsed));
    });
  } else {
    res.end('Send a POST request');
  }
}).listen(3000);
