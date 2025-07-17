## 📘 Node.js: Interview Notes on Concurrency

### ✅ What is Node.js?

Node.js is an open-source, cross-platform **JavaScript runtime** built on Google Chrome's **V8 engine**. It allows you to run JavaScript **on the server-side**, outside the browser.

* Uses **event-driven**, **non-blocking I/O** model.
* Designed for **scalable network applications**.

---

## 🔄 What is Concurrency?

**Concurrency** means the ability of a system to **manage multiple tasks at once**, even if they are not running at the exact same time. It’s about **task switching and coordination**.

> "Concurrency is not parallelism. Concurrency is dealing with lots of things at once. Parallelism is doing lots of things at once."

### 🧠 Real-Life Analogy

A single cashier taking multiple orders:

* Takes order from Customer A and sends it to the kitchen (non-blocking)
* Immediately takes order from Customer B while A's food is being prepared
* Delivers A's order once the kitchen is done

The cashier is handling multiple customers **concurrently**, even with just one thread.

---

## 🔧 Node.js Concurrency Model

Node.js uses a **single-threaded event loop** and **non-blocking I/O** for handling concurrency.

### ⚙️ Key Components:

* **Event Loop**: The mechanism that handles async tasks.
* **Callback Queue**: Stores completed async callbacks.
* **Thread Pool** (via libuv): Handles I/O operations like file or DB access under the hood.

---

## ✅ Code Example: Asynchronous Task Handling

```js
console.log("Start");

setTimeout(() => {
  console.log("Fetching data from DB...");
}, 2000);

setTimeout(() => {
  console.log("Sending email...");
}, 0);

console.log("End");
```

### 🧾 Output:

```
Start
End
Sending email...
Fetching data from DB...
```

---

## 🚀 Node.js: Single-threaded vs Multi-threaded

| Feature                | Node.js (Single-threaded)           | Multi-threaded Servers        |
| ---------------------- | ----------------------------------- | ----------------------------- |
| Thread management      | Lightweight, no thread per request  | Heavy, thread per connection  |
| I/O operations         | Non-blocking, uses callbacks        | Blocking unless async handled |
| Performance under load | Efficient for I/O-bound tasks       | Better for CPU-bound tasks    |
| Complexity             | Simpler to write, no locking needed | More complex (threads, locks) |

---

## 🎯 Interview Summary

> Node.js handles concurrency using a **single-threaded event loop**. It delegates I/O tasks (like file or DB access) to the system, continues running other code, and picks up results later via callbacks. This makes it **highly scalable** and ideal for **I/O-heavy applications** like APIs, chat apps, and real-time systems.

---

Let me know if you'd like to add a visual diagram of the event loop or go deeper into the event loop phases!
