**libuv: Event Loop and Thread Pool - Notes**

---

### 🔄 Event Loop

The **event loop** is the central mechanism in libuv (and Node.js) that manages asynchronous operations. It runs on a **single thread** and follows a series of phases to handle various kinds of tasks.

#### ✅ Responsibilities:

* Handles I/O readiness (e.g., sockets, timers)
* Executes callbacks from completed async operations
* Non-blocking scheduling of operations

#### ♻️ Phases of the Event Loop:

1. **Timers** — Executes `setTimeout` and `setInterval` callbacks.
2. **Pending Callbacks** — Handles some system-level callbacks.
3. **Idle, Prepare** — Used internally.
4. **Poll** — Waits for I/O events (or proceeds if callbacks are ready).
5. **Check** — Executes `setImmediate` callbacks.
6. **Close Callbacks** — Handles closed resources like sockets.

#### 🔄 Summary:

* Single-threaded
* Non-blocking
* Executes tasks in phases in a loop

#### 🌐 How Requests are Handled in Node.js Internally:

> Sometimes we say, "Main thread (event loop) receives a request." But this is a simplified abstraction. Here's what actually happens:

1. **libuv (C layer)** listens for I/O events like TCP connections.
2. When the OS reports data on the socket, libuv detects it.
3. libuv queues the corresponding **JavaScript callback**.
4. The **event loop** sees the JS stack is empty, and pushes the callback onto the stack.
5. **V8 (JavaScript engine)** executes the callback (e.g., your HTTP handler).

So the request is **not directly received by JavaScript**, but rather passed up from the OS → libuv → event loop → V8 engine.

| Layer      | Role                                                   |
| ---------- | ------------------------------------------------------ |
| OS & libuv | Accepts incoming connections, detects activity         |
| Event loop | Queues JS callbacks to run when the call stack is free |
| V8 engine  | Executes your callback code on the main JS thread      |

This is why Node.js can be non-blocking even for I/O: it delegates the work and only runs JS when data is ready.

---

### 🧵 Thread Pool

The **libuv thread pool** is used for executing tasks that **cannot be done asynchronously at the OS level**, especially file system operations, DNS lookups, and custom CPU-bound logic.

#### ✅ Responsibilities:

* Offloads blocking operations from the event loop
* Executes in parallel (if multiple CPU cores are available)

#### ⚡️ Default Behavior:

* Default size: **4 threads**
* Can be changed via environment variable:

  ```bash
  UV_THREADPOOL_SIZE=8 node app.js
  ```
* Max limit: 1024 (practically, match to available CPU cores)

#### 📊 Example Use Cases:

* `fs.readFile`
* `dns.lookup`
* `crypto.pbkdf2`
* `uv_queue_work`

---

### 💡 Interaction Between Event Loop and Thread Pool

1. Main thread receives a JS task to run.
2. For blocking tasks (e.g., file read), it **delegates to the thread pool**.
3. A worker thread executes the task.
4. When done, the result is sent back to the event loop.
5. The event loop queues the callback to be executed.

This keeps the event loop **non-blocking**, even for operations that are inherently blocking.

---

### 🧰 Workers in Node.js

Node.js supports multithreading using the **`worker_threads`** module, separate from the libuv thread pool. These are true **JavaScript threads** that run in parallel.

#### ✅ When to Use Workers:

* CPU-intensive tasks (e.g., large computations, image processing)
* Parallel JS execution outside the event loop
* You need isolation between tasks

#### 📦 Example:

```js
const { Worker } = require('worker_threads');

new Worker(`
  const { parentPort } = require('worker_threads');
  parentPort.postMessage('Hello from worker');
`, { eval: true }).on('message', message => {
  console.log(message); // Hello from worker
});
```

#### 🔍 Notes:

* Each worker runs in its own **Node.js instance**.
* Communication is done via **message passing**.
* They are ideal for scaling CPU-bound logic without blocking the main thread.

| Feature       | Thread Pool (libuv)         | Worker Threads (JS)      |
| ------------- | --------------------------- | ------------------------ |
| Purpose       | Offload native blocking ops | Run JS code in parallel  |
| Language      | Native C-backed tasks       | JavaScript               |
| Communication | Internal (hidden from dev)  | Message passing (manual) |
| Use for       | File I/O, crypto, DNS       | Heavy CPU-bound JS tasks |

---

### 🌋 One Core vs Multi-Core Behavior

#### ☑️ On a 1-core System:

* Only one thread (event loop or worker) runs at a time
* OS switches between threads using **context switching**
* Thread pool still helps to avoid blocking the main thread

#### ☑️ On a Multi-Core System:

* Event loop and worker threads can run in true parallel
* Better performance for high concurrency workloads

---

### 🎯 Summary Table

| Feature      | Event Loop             | Thread Pool                        |
| ------------ | ---------------------- | ---------------------------------- |
| Threads Used | 1 (main thread)        | Default 4 (configurable)           |
| Role         | Orchestrates async ops | Handles blocking I/O/CPU tasks     |
| Blocking?    | No                     | Yes (but offloaded from main loop) |
| Parallelism  | No                     | Yes (if multi-core system)         |

---

Let me know if you want diagrams or code examples added!
