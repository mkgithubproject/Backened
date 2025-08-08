In Node.js, **error handling** is a crucial part of building reliable applications. It ensures your app doesn’t crash unexpectedly and gives you control over how to recover or respond to failures.

---

## 🔹 Types of Errors in Node.js

| Type                    | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| **Synchronous Errors**  | Errors that occur during synchronous operations.                   |
| **Asynchronous Errors** | Errors that happen in callbacks, promises, or async/await.         |
| **Operational Errors**  | Runtime issues like failed DB connection, invalid user input, etc. |
| **Programmer Errors**   | Bugs in code: undefined variables, type errors, etc.               |
| **System Errors**       | OS-related issues: file not found, network down, etc.              |
| **Thrown Errors**       | Explicitly thrown using `throw`.                                   |
| **Uncaught Exceptions** | Errors not caught and crash the app if not handled.                |

---

## 🔹 Handling Synchronous Errors

Use `try...catch`:

```js
try {
  const data = JSON.parse('invalid JSON');
} catch (err) {
  console.error('Caught an error:', err.message);
}
```

---

## 🔹 Handling Asynchronous Errors

### 1. **Callback Pattern**

Node-style callbacks follow the `(err, result)` pattern:

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('File read error:', err);
    return;
  }
  console.log('File content:', data);
});
```

---

### 2. **Promises**

Use `.catch()` for errors:

```js
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

---

### 3. **async/await with try...catch**

```js
async function run() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (err) {
    console.error('Error in async function:', err);
  }
}
```

---

## 🔹 Custom Error Classes

You can create your own error types:

```js
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
```

Then use:

```js
throw new NotFoundError('User not found');
```

---

## 🔹 Express Error Handling Middleware

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
});
```

You can throw errors from routes:

```js
app.get('/', (req, res, next) => {
  try {
    throw new Error('Something went wrong!');
  } catch (err) {
    next(err); // Pass to error middleware
  }
});
```

---

## 🔹 Process-level Error Handlers

### 1. **Uncaught Exceptions**

```js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Best to crash and restart
});
```

### 2. **Unhandled Promise Rejections**

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

---

## 🔹 Best Practices

* ✅ Always handle both sync and async errors.
* ✅ Don’t swallow errors silently.
* ✅ Use centralized error handling middleware (in Express or other frameworks).
* ✅ Avoid throwing inside async functions—use `try...catch`.
* ✅ Use custom error classes for clarity.
* ✅ Log errors with useful context (time, request info, etc.).
* ✅ Use tools like [Sentry](https://sentry.io/) for real-time error monitoring.

---

## 🔹 Example: Centralized Error Handling in Express

```js
// error-handler.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
  });
}

module.exports = { AppError, errorHandler };
```

```js
// server.js
const express = require('express');
const { AppError, errorHandler } = require('./error-handler');

const app = express();

app.get('/', (req, res) => {
  throw new AppError('Custom Error Example', 400);
});

app.use(errorHandler);
app.listen(3000);
```

---

Express error handling is a **core part of building robust APIs**. Let’s go step by step and cover:

---

## ✅ 1. **Basic Error Handling Middleware**

In Express, a special kind of middleware handles errors — it must have **four arguments**:

```js
(err, req, res, next) => { ... }
```

### 🔧 Example:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  throw new Error('Something went wrong!');
});

// Error-handling middleware (must be defined at the end)
app.use((err, req, res, next) => {
  console.error(err.stack); // log the error
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log('Server running'));
```

---

## ✅ 2. **Handling Async Errors**

If you’re using `async/await`, throwing errors inside async routes won’t be caught unless you pass them to `next()` manually or use a wrapper.

### ⚠️ This doesn't work as expected:

```js
app.get('/user', async (req, res) => {
  throw new Error('User not found'); // won't reach error middleware
});
```

### ✅ Use `next(err)`:

```js
app.get('/user', async (req, res, next) => {
  try {
    // some code that throws
    throw new Error('User not found');
  } catch (err) {
    next(err); // sends to error middleware
  }
});
```

---

## ✅ 3. **Custom Error Classes (Optional but Clean)**

For better control and clarity, define custom error classes:

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}
```

Then use:

```js
return next(new AppError('User not found', 404));
```

In the error handler:

```js
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});
```

---

## ✅ 4. **Best Practices**

| Tip                                   | Description                         |
| ------------------------------------- | ----------------------------------- |
| ✅ Always define error middleware last | After all routes                    |
| ✅ Use `next(err)` in async functions  | To forward errors                   |
| ✅ Avoid exposing sensitive info       | Only show error details in dev      |
| ✅ Log errors                          | Useful for debugging and monitoring |
| ✅ Use custom error classes            | Clean and consistent error format   |

---

## 🧪 Example: Full Error Handling Flow

```js
const express = require('express');
const app = express();

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.get('/fail', (req, res, next) => {
  return next(new AppError('This route failed!', 400));
});

app.get('/async-error', async (req, res, next) => {
  try {
    throw new Error('Async failure!');
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Something went wrong',
  });
});

app.listen(3000, () => console.log('Server running'));
```

---

Would you like a reusable error-handling utility file or REST API template with this built-in?
