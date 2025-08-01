Let’s break down a **mini Express.js custom app** using `Router`, and explain **line by line** how your `app.js` connects to route files like `userRoutes.js`.

---

### 🧠 Key Concept First:

* `app.use('/users', userRoutes)` → mounts all routes defined in `userRoutes` with `/users` prefix.
* Inside `userRoutes`, you define route **paths relative to `/users`**.

---

### ✅ 1. Project Structure:

```
mini-express-app/
├── app.js
└── routes/
    └── userRoutes.js
```

---

### ✅ 2. app.js (Main Entry File)

```js
const express = require('express'); // Import Express framework
const app = express();              // Create an Express app instance

const userRoutes = require('./routes/userRoutes'); // Import user-defined routes

app.use(express.json()); // Middleware to parse JSON in request body

app.use('/users', userRoutes); 
// Mounts all routes from userRoutes.js under the '/users' base path

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

### ✅ 3. routes/userRoutes.js

```js
const express = require('express'); 
const router = express.Router();  // Create a router instance

// Define GET /users/
router.get('/', (req, res) => {
  res.send('List of users');
});

// Define GET /users/profile
router.get('/profile', (req, res) => {
  res.send('User profile');
});

module.exports = router; // Export the router to be used in app.js
```

---

### 💡 How it Connects:

| File            | Line                              | What it Does                                                                 |
| --------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| `app.js`        | `const userRoutes = require(...)` | Imports router from `userRoutes.js`                                          |
| `app.js`        | `app.use('/users', userRoutes)`   | Tells Express: any route that starts with `/users` → go to `userRoutes` file |
| `userRoutes.js` | `router.get('/')`                 | This means GET `/users/` (because `/users` is the base path)                 |
| `userRoutes.js` | `router.get('/profile')`          | This means GET `/users/profile`                                              |

---

### ✅ Testing Routes:

| Request URL          | Route Called             | Response        |
| -------------------- | ------------------------ | --------------- |
| `GET /users`         | `router.get('/')`        | `List of users` |
| `GET /users/profile` | `router.get('/profile')` | `User profile`  |

---

### 🔁 Why We Use Routers?

Routers help **split routes into separate files**:

* `userRoutes` → handles user-related routes.
* You can have `productRoutes`, `authRoutes`, etc.

It keeps the app modular and organized.

---

### ✅ Summary:

```js
// app.js
app.use('/users', userRoutes)
```

means:

> “Hey Express, for any route that starts with `/users`, go check inside `userRoutes` and match the remaining path.”

---

Would you like a version with `POST`, `PUT`, and `DELETE` too?


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
