Here’s a **comprehensive list of Node.js interview questions with answers** tailored specifically for **2.5 years of backend development experience**, suitable for mid-level roles targeting **10–12+ LPA** packages.

---

## ✅ **Core Node.js Interview Questions & Answers**

### 1. **What is Node.js and how does it work?**

**Answer:**
Node.js is a runtime built on **Chrome's V8 JavaScript engine**.
It uses an **event-driven, non-blocking I/O** model, ideal for scalable applications.

🧠 Internally, it uses:

* **V8** for JS execution
* **libuv** for event loop and async I/O
* **Event loop** for managing concurrency
* **C++ bindings** for system operations

---

### 2. **What is the difference between synchronous and asynchronous code in Node.js?**

**Answer:**

| Feature      | Synchronous         | Asynchronous                |
| ------------ | ------------------- | --------------------------- |
| Execution    | Blocking            | Non-blocking                |
| Example      | `fs.readFileSync()` | `fs.readFile()`             |
| Thread usage | Blocks main thread  | Uses background worker pool |

---

### 3. **What is the Event Loop in Node.js?**

**Answer:**
The Event Loop allows Node.js to perform non-blocking I/O by **delegating tasks to the system** and processing callbacks asynchronously when the operations are done.

🌀 **Phases of Event Loop:**
microtask queue (high priority) then checks for phases
1. Timers
2. Pending callbacks
3. Idle/prepare
4. Poll
5. Check (`setImmediate`)
6. Close callbacks


---

### 4. **How is Node.js single-threaded but handles concurrency?**

**Answer:**
Node.js runs JavaScript on a **single thread** using the **event loop**, but offloads I/O and CPU-intensive tasks to:

* **libuv thread pool**
* **OS-level async features**
  Thus, it can handle thousands of connections concurrently.

---

### 5. **What is the difference between `process.nextTick()`, `setImmediate()`, and `setTimeout()`?**

**Answer:**

| Function             | Execution Timing                         |
| -------------------- | ---------------------------------------- |
| `process.nextTick()` | Runs **before** the next event loop tick |
| `setImmediate()`     | Runs in **check phase** of event loop    |
| `setTimeout()`       | Executes after a minimum delay           |

---

### 6. **What are streams in Node.js?**

**Answer:**
Streams are objects for handling **continuous data flow** (e.g., file, network, stdin).
Types:

* Readable
* Writable
* Duplex (both)
* Transform (modifies data)

```js
fs.createReadStream('file.txt').pipe(process.stdout);
```

---

### 7. **What is the use of buffers in Node.js?**

**Answer:**
A `Buffer` is used to handle **binary data** directly in memory without conversion to string.

```js
const buf = Buffer.from('Hello');
console.log(buf.toString()); // Hello
```

---

### 8. **What are modules in Node.js?**

**Answer:**
Node.js uses CommonJS module system.

* **Built-in modules:** `fs`, `http`, `path`
* **Local modules:** Your own `.js` files
* **3rd-party modules:** Installed via npm (e.g., `express`)

```js
module.exports = function() { };
const myFunc = require('./myFile');
```

---

### 9. **Difference between `require()` and `import` in Node.js?**

**Answer:**

| `require()` (CommonJS)  | `import` (ES Modules)                         |
| ----------------------- | --------------------------------------------- |
| Used by default in Node | Requires `"type": "module"` in `package.json` |
| Synchronous             | Asynchronous                                  |
| `module.exports`        | `export` / `export default`                   |

---

### 10. **How does error handling work in Node.js?**

**Answer:**
Use `try...catch` for synchronous code, and `.catch()` or `try...catch` with `async/await` for promises.

```js
try {
  await doSomethingAsync();
} catch (err) {
  console.error(err);
}
```

For callbacks, follow **Node-style error-first**:

```js
fs.readFile('file.txt', (err, data) => {
  if (err) return console.error(err);
});
```

---

## ✅ **Practical / Express.js Questions**

### 11. **How do you create a REST API in Node.js using Express?**

**Answer:**

```js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/users', (req, res) => res.send('Users'));
app.post('/users', (req, res) => res.send(req.body));

app.listen(3000);
```

---

### 12. **Middleware in Express – what and why?**

**Answer:**
Middleware functions process requests in a pipeline (e.g., auth, logging, parsing).

```js
app.use((req, res, next) => {
  console.log('Request:', req.url);
  next();
});
```

Types:

* Application-level
* Router-level
* Error-handling
* Built-in (`express.json()`)

---

### 13. **What is the difference between `app.use()` and `app.get()`?**

**Answer:**

| Method      | Purpose                                |
| ----------- | -------------------------------------- |
| `app.use()` | Register middleware for **all routes** |
| `app.get()` | Handle specific GET requests           |

---

### 14. **How do you implement error handling middleware in Express?**

**Answer:**

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

---

### 15. **What is CORS and how do you enable it in Node.js?**

**Answer:**
CORS (Cross-Origin Resource Sharing) controls access to resources from different domains.

```js
const cors = require('cors');
app.use(cors());
```

---

## ✅ **Advanced / Real-world Concepts**

### 16. **How do you manage environment variables?**

**Answer:**

* Use `.env` file + `dotenv` package

```js
require('dotenv').config();
console.log(process.env.PORT);
```

---

### 17. **How do you handle async/await errors globally?**

**Answer:**
Create a wrapper function:

```js
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

Use:

```js
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

---

### 18. **How do you secure a Node.js app?**

**Answer:**

* Use `helmet` for headers
* Use `dotenv` to hide secrets
* Validate input (e.g., `joi`, `zod`)
* Use HTTPS
* Avoid eval, SQL injection
* Limit payloads (`express.json({ limit: '10kb' })`)

---

### 19. **How do you implement logging in Node.js?**

**Answer:**
Use `winston` or `pino` for file/console logging.

```js
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })]
});
```

---

### 20. **Explain the Node.js request lifecycle.**

**Answer:**

1. Request hits Node server
2. Middleware chain processes it
3. Route handler executes
4. Response is sent
5. Errors passed to error-handling middleware

---

## 📌 Bonus Scenario Questions

### ✅ Q: How do you handle 10K+ concurrent requests in Node.js?

**Answer:**

* Use **non-blocking async code**
* Cluster mode (`cluster` module)
* Load balancing (e.g., Nginx + PM2)
* Use caching (Redis)
* Database optimization

---

### ✅ Q: How would you handle file uploads in Node.js?

**Answer:**
Use `multer`:

```js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded');
});
```

---

Would you like a **PDF mock interview sheet** or **MCQ-style practice test** based on these?

Also available:

* Express.js internals
* Node.js + MongoDB project Q\&A
* System design questions for Node.js developers
