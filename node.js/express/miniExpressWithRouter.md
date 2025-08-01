Absolutely! Here's a **very simple version** of Mini Express with **line-by-line explanation**, perfect if you're learning how Express.js works under the hood.

---

## ✅ `mini-express.js` (Simple Version with Comments)

```js
const http = require('http'); // Load Node's built-in HTTP module
const url = require('url');   // For parsing the URL and query string

// -------------------------------
// 🔧 Router Class
// -------------------------------
class Router {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  handle(req, res) {
    let i = 0;
    const next = () => {
      if (i < this.middlewares.length) {
        return this.middlewares[i++](req, res, next);
      }
      const route = this.routes.find(r => r.method === req.method && r.path === req.url);
      if (route) {
        return route.handler(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not Found (from router)');
      }
    };
    next();
  }
}

// -------------------------------
// 🧠 createApp Function
// -------------------------------
function createApp() {
  const routes = []; // Array to hold GET/POST routes
  const middlewares = []; // Array to hold global middleware functions
  const routers = []; // Mounted routers like /users

  function app(req, res) {
    const parsedUrl = url.parse(req.url, true);
    req.url = parsedUrl.pathname;
    req.query = parsedUrl.query;

    res.send = (text) => {
      res.setHeader('Content-Type', 'text/plain');
      res.end(text);
    };

    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    let i = 0;
    const next = () => {
      if (i < middlewares.length) {
        return middlewares[i++](req, res, next);
      }

      for (const item of routers) {
        if (req.url.startsWith(item.path)) {
          const originalUrl = req.url;
          req.url = req.url.slice(item.path.length) || '/';
          item.router.handle(req, res);
          req.url = originalUrl;
          return;
        }
      }

      const route = routes.find(r => r.method === req.method && r.path === req.url);
      if (route) {
        return route.handler(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    };

    next();
  }

  app.get = (path, handler) => {
    routes.push({ method: 'GET', path, handler });
  };

  app.post = (path, handler) => {
    routes.push({ method: 'POST', path, handler });
  };

  app.use = (pathOrMiddleware, maybeRouter) => {
    if (typeof pathOrMiddleware === 'string' && maybeRouter?.handle) {
      routers.push({ path: pathOrMiddleware, router: maybeRouter });
    } else if (typeof pathOrMiddleware === 'function') {
      middlewares.push(pathOrMiddleware);
    }
  };

  app.listen = (port, cb) => {
    http.createServer(app).listen(port, cb);
  };

  app.Router = () => new Router();

  return app;
}

module.exports = createApp;
```

---

## ✅ `server.js` (Example usage)

```js
const createApp = require('./mini-express');
const app = createApp();

// Global Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route: GET /
app.get('/', (req, res) => {
  res.send('Hello from Mini Express');
});

// Route: GET /about
app.get('/about', (req, res) => {
  res.json({ message: 'This is about page' });
});

// Create a Router for /users
const userRouter = app.Router();

userRouter.use((req, res, next) => {
  console.log('Inside userRouter middleware');
  next();
});

userRouter.get('/', (req, res) => {
  res.send('User Home Page');
});

userRouter.get('/profile', (req, res) => {
  res.json({ user: 'John Doe' });
});

// Mount the router on /users
app.use('/users', userRouter);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 🔍 Flow for `GET /users/profile`

1. **Request**: Browser requests `/users/profile`
2. `app()` sees it matches `/users`, passes to `userRouter`
3. `userRouter` runs its middleware and finds `GET /profile`
4. Handler responds with JSON: `{ user: "John Doe" }`

---

## 🧠 Summary

| Feature        | Explanation                                         |
| -------------- | --------------------------------------------------- |
| `app()`        | Main request handler function                       |
| `app.get()`    | Registers GET route                                 |
| `app.use()`    | Adds middleware or mounts a router                  |
| `res.send()`   | Sends plain text                                    |
| `res.json()`   | Sends JSON                                          |
| `app.listen()` | Starts HTTP server on given port                    |
| `app.Router()` | Creates a new Router instance (like Express.Router) |

---
