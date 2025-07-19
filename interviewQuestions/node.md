# Node.js Interview Questions with Examples and Detailed Explanations (2.5+ Years Experience)

---

## 1. What is the Event Loop in Node.js?

### 📘 Theory:

The Event Loop is the core mechanism in Node.js that handles asynchronous operations. Since Node.js is single-threaded, it uses the event loop to offload operations like I/O, network, or file system tasks to the system kernel, and then continues executing other code. This enables non-blocking behavior.

### ✅ Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");
```

**Output:**

```
Start
End
Timeout
```

> `setTimeout()` goes into the callback queue and executes after the call stack is empty.

---

## 2. Callback, Promises, and Async/Await

### 📘 Theory:

These are asynchronous patterns used in Node.js:

* **Callback**: A function passed as an argument to another function.
* **Promise**: Represents a value that may be available now or in the future.
* **Async/Await**: Syntactic sugar over Promises, making async code look synchronous.

### ✅ Callback:

```js
function getData(cb) {
  setTimeout(() => cb("Data loaded"), 1000);
}
getData(console.log);
```

### ✅ Promise:

```js
function getData() {
  return new Promise(resolve => setTimeout(() => resolve("Data loaded"), 1000));
}
getData().then(console.log);
```

### ✅ Async/Await:

```js
async function loadData() {
  const result = await getData();
  console.log(result);
}
```

---

## 3. `process.nextTick()` vs `setImmediate()` vs `setTimeout()`

### 📘 Theory:

* `process.nextTick()`: Executes code after the current operation but before the next event loop tick.
* `setImmediate()`: Executes code in the check phase of the event loop.
* `setTimeout()`: Executes after the minimum timeout (e.g., 0ms).

### ✅ Example:

```js
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);
process.nextTick(() => console.log('nextTick'));
```

**Output:**

```
nextTick
setTimeout
setImmediate
```

> `nextTick` always runs before timers and I/O callbacks.

---

## 4. How does `require()` work in Node.js?

### 📘 Theory:

Node.js uses the CommonJS module system where each file is treated as a module. The `require()` function loads modules, caches them, and wraps the module in a function to preserve scope.

### ✅ Example:

```js
// file: add.js
module.exports = (a, b) => a + b;

// file: app.js
const add = require('./add');
console.log(add(2, 3));
```

---

## 5. `require` vs `import`

### 📘 Theory:

* `require()` is part of CommonJS.
* `import` is part of ES Modules (ESM).
* ESM is preferred in modern projects and is asynchronous.

### ✅ CommonJS:

```js
const fs = require('fs');
```

### ✅ ESM:

```js
import fs from 'fs'; // Requires "type": "module" in package.json
```

---

## 6. Express Middleware

### 📘 Theory:

Middleware are functions that run before the final route handler. They have access to `req`, `res`, and `next()`.

### ✅ Example:

```js
app.use((req, res, next) => {
  console.log("Request received");
  next();
});
```

---

## 7. `app.use()` vs `app.get()`

### 📘 Theory:

* `app.use()`: Runs middleware for all HTTP methods.
* `app.get()`: Handles GET requests on a specific path.

### ✅ Example:

```js
app.use((req, res, next) => {
  console.log("Runs for all routes");
  next();
});

app.get('/hello', (req, res) => {
  res.send("Hello World");
});
```

---

## 8. Error Handling in Express

### 📘 Theory:

Express error-handling middleware has four parameters: `err`, `req`, `res`, and `next`. It catches errors from route handlers or other middleware.

### ✅ Example:

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

## 9. What is Mongoose?

### 📘 Theory:

Mongoose is an Object Data Modeling (ODM) library for MongoDB. It provides schema validation, middleware, and model abstraction.

### ✅ Example:

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String
});

const User = mongoose.model('User', userSchema);
```

---

## 10. Mongoose Middleware (`pre`, `post`)

### 📘 Theory:

Middleware hooks in Mongoose allow you to run logic before or after operations like `save`, `find`, or `update`.

### ✅ Example:

```js
userSchema.pre('save', function(next) {
  this.name = this.name.toLowerCase();
  next();
});
```

---
