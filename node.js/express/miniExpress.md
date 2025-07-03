```
// mini-express.js

# 🧪 Building Mini Express from Scratch with Node.js

This guide walks you through creating a mini version of Express.js to understand how server creation, routing, and middleware work behind the scenes in Express.

---

## ✅ Features We'll Implement

- `app.get(path, handler)`
- `app.post(path, handler)`
- `app.use(middleware)`
- `app.listen(port)`
- `res.send()` and `res.json()`

---

## 📦 Step 1: Create `mini-express.js`

```js
const http = require('http');
const url = require('url');

function createApp() {
  const routes = [];
  const middlewares = [];

  // Core handler (called by http.createServer)
  function app(req, res) {
    // Enhance res object
    res.send = function (data) {
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    };

    res.json = function (data) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    // Add req.path and req.query
    const parsedUrl = url.parse(req.url, true);
    req.path = parsedUrl.pathname;
    req.query = parsedUrl.query;

    // Middleware and route execution
    let i = 0;

    function next() {
      if (i < middlewares.length) {
        const mw = middlewares[i++];
        mw(req, res, next);
      } else {
        // Route matching
        const match = routes.find(r => r.method === req.method && r.path === req.path);
        if (match) {
          match.handler(req, res);
        } else {
          res.statusCode = 404;
          res.end('Not Found');
        }
      }
    }

    next(); // Start middleware/route execution
  }

  // Register GET route
  app.get = function (path, handler) {
    routes.push({ method: 'GET', path, handler });
  };

  // Register POST route
  app.post = function (path, handler) {
    routes.push({ method: 'POST', path, handler });
  };

  // Register middleware
  app.use = function (middleware) {
    middlewares.push(middleware);
  };

  // Start server
  app.listen = function (port, cb) {
    const server = http.createServer(app);
    server.listen(port, cb);
  }; // http.createServer(app) is like telling Node:“Here’s my function that knows how to handle all requests.”
      //And .listen() starts listening for those requests on a port.

  return app;
}

module.exports = createApp;

```

```
//server.js
const createApp = require('./mini-express');
const app = createApp();

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// JSON body parser
app.use((req, res, next) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
      } catch {
        req.body = {};
      }
      next();
    });
  } else {
    next();
  }
});

// Routes
app.get('/hello', (req, res) => {
  res.send('Hello from Mini Express!');
});

app.get('/query', (req, res) => {
  res.json({ query: req.query });
});

app.post('/data', (req, res) => {
  res.json({ received: req.body });
});

// Start the server
app.listen(3000, () => {
  console.log('Mini Express server running at http://localhost:3000');
});

```
## how it works
createApp()
  Returns a request handler (app) that:\
      Handles middleware chaining (app.use)\
      Routes by method + path (app.get, app.post)\
      Enhances req and res
## Middleware
  Stored in order\
  Executed one by one with next()\
  Like a pipeline (Logger → BodyParser → Router)
## Routing
  Matches method + path\
  Executes the matching handler\
  If none match → returns 404
## Response Helpers
  res.send(data) sets Content-Type: text/plain\
  res.json(obj) sets Content-Type: application/json and serializes the object
  



