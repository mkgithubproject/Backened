```
// mini-express.js
const http = require('http');
const url = require('url');

// ----------------------------
// 🧩 Router Class
// ----------------------------
class Router {
  constructor() {
    this.routes = [];       // For storing routes (GET/POST)
    this.middlewares = [];  // For storing middlewares
  }

  // Add a GET route
  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  // Add a POST route
  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  // Add middleware to this router
  use(handler) {
    this.middlewares.push(handler);
  }

  // Handle incoming requests to this router
  handle(req, res) {
    let i = 0;

    const next = () => {
      // Run all middlewares one by one
      if (i < this.middlewares.length) {
        const mw = this.middlewares[i++];
        return mw(req, res, next);
      }

      // Try to find a matching route
      const route = this.routes.find(
        r => r.method === req.method && r.path === req.url
      );

      if (route) {
        route.handler(req, res); // Run the route handler
      } else {
        res.statusCode = 404;
        res.end('Not Found (from router)');
      }
    };

    next();
  }
}

// ----------------------------
// 🧠 Main createApp function
// ----------------------------
function createApp() {
  const middlewares = []; // Global middlewares for app
  const routes = [];      // Routes directly on app
  const routers = [];     // Mounted routers (like /users)

  // This is the main app function that handles every request
  function app(req, res) {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    req.url = parsedUrl.pathname; // Example: /users/info
    req.query = parsedUrl.query;  // Example: { id: "123" }

    // Add helper methods to res
    res.send = (text) => {
      res.setHeader('Content-Type', 'text/plain');
      res.end(text);
    };

    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    // Run middlewares and routers in order
    let i = 0;

    const next = () => {
      // Run global middlewares
      if (i < middlewares.length) {
        const mw = middlewares[i++];
        return mw(req, res, next);
      }

      // Check if request matches a mounted router
      for (const item of routers) {
        if (req.url.startsWith(item.path)) {
          const oldUrl = req.url;

          // Remove the base path (e.g., /users) before passing to the router
          req.url = req.url.slice(item.path.length) || '/';

          item.router.handle(req, res); // Let router handle it

          req.url = oldUrl; // Restore original URL
          return;
        }
      }

      // If no router matched, check app routes
      const route = routes.find(
        r => r.method === req.method && r.path === req.url
      );

      if (route) {
        route.handler(req, res); // Run the route handler
      } else {
        res.statusCode = 404;
        res.end('Not Found (from app)');
      }
    };

    next(); // Start the middleware chain
  }

  // Add GET route to app
  app.get = (path, handler) => {
    routes.push({ method: 'GET', path, handler });
  };

  // Add POST route to app
  app.post = (path, handler) => {
    routes.push({ method: 'POST', path, handler });
  };

  // Register a global middleware or mount a router
  app.use = (pathOrMiddleware, maybeRouter) => {
    // Case 1: Mounting a router — app.use('/users', router)
    if (typeof pathOrMiddleware === 'string' && maybeRouter?.handle) {
      routers.push({ path: pathOrMiddleware, router: maybeRouter });
    }
    // Case 2: Middleware — app.use(fn)
    else if (typeof pathOrMiddleware === 'function') {
      middlewares.push(pathOrMiddleware);
    }
  };

  // Start HTTP server
  app.listen = (port, cb) => {
    http.createServer(app).listen(port, cb);
  };

  // Provide access to Router class
  app.Router = () => new Router();

  return app;
}

module.exports = createApp;
```

```
// server.js
const createApp = require('./mini-express');
const app = createApp();

// ----------------------------
// 🧩 Create a Router
// ----------------------------
const userRouter = app.Router();

userRouter.use((req, res, next) => {
  console.log('UserRouter Middleware');
  next();
});

userRouter.get('/', (req, res) => {
  res.send('User Home');
});

userRouter.get('/info', (req, res) => {
  res.json({ name: 'Alice' });
});

// ----------------------------
// 🧠 App Middleware and Routes
// ----------------------------

// Global middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount router on /users
app.use('/users', userRouter);

// App-level route
app.get('/', (req, res) => {
  res.send('Welcome to Mini Express');
});

// ----------------------------
// 🚀 Start the Server
// ----------------------------
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

### request socket
```
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('🔗 Socket ID:', req.socket.remotePort);

  setTimeout(() => {
    res.end(`Response to socket ${req.socket.remotePort}`);
  }, 1000);
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```
When you open two tabs in the browser and go to localhost:3000, you’ll see:\
 🔗 Socket ID: 51846\
 🔗 Socket ID: 51848\
And each response says:\
Response to socket 51846\
Response to socket 51848\
This proves that each res is already linked to its own req, because they share the same socket.


