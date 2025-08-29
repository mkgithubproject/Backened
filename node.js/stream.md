# 🧠 Socket and Stream in Node.js — Full Theory with Examples

---

## 🔷 What is a Stream Abstraction?

### ✅ Definition:

A **stream abstraction** is a **unified programming interface** in Node.js that allows you to **work with continuous flow of data**, piece by piece (chunk by chunk), rather than loading the whole thing into memory.

### ✅ Why Use Streams?

* Efficient memory usage (no need to load entire data)
* Begin processing data immediately
* Useful for large files, network data, etc.

### ✅ Types of Streams in Node.js:

| Type      | Direction             | Example                            |
| --------- | --------------------- | ---------------------------------- |
| Readable  | Read only             | `fs.createReadStream('file.txt')`  |
| Writable  | Write only            | `fs.createWriteStream('file.txt')` |
| Duplex    | Read + Write          | `net.Socket`                       |
| Transform | Read → Modify → Write | `zlib.createGzip()`                |

### ✅ Examples of Each Stream Type:

#### 🔹 Readable Stream:

```js
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');

readStream.on('data', chunk => {
  console.log('Read chunk:', chunk.toString());
});
```

#### 🔹 Writable Stream:

```js
const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello, this is a writable stream!');
writeStream.end();
```

#### 🔹 Duplex Stream:

```js
const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('Received:', data.toString());
    socket.write('Echo: ' + data);
  });
});

server.listen(3000);
```

#### 🔹 Transform Stream:

```js
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('input.txt.gz');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);
```

---

## 🔌 What is a Socket?

### ✅ Definition:

A **socket** is a **network endpoint** that allows two systems (or apps) to **communicate over a network** (usually over TCP or UDP).

### ✅ Real-World Analogy:

* IP Address = House Address
* Port = Door
* Socket = Open door to send/receive data

### ✅ Types of Sockets:

| Socket Type | Protocol | Used For                        |
| ----------- | -------- | ------------------------------- |
| TCP Socket  | TCP      | Reliable, ordered communication |
| UDP Socket  | UDP      | Fast, unreliable data transfer  |
| WebSocket   | HTTP     | Real-time, full-duplex          |
| Unix Socket | OS-level | Local IPC (process to process)  |

---

## 🔄 How Socket Uses Stream Abstraction

### ✅ TCP Socket = Duplex Stream

In Node.js, `net.Socket` is a **Duplex stream**:

* Readable: `.on('data', callback)`
* Writable: `.write()`

### ✅ Example (TCP Server):

```js
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.write('Hello from server!');

  socket.on('data', (chunk) => {
    console.log('Received:', chunk.toString());
  });
});

server.listen(3000);
```

### ✅ Example (TCP Client):

```js
const net = require('net');

const client = net.createConnection(3000, 'localhost', () => {
  console.log('Connected to server');
  client.write('Hello Server!');
});

client.on('data', (data) => {
  console.log('From Server:', data.toString());
});
```

---

## 🌐 How HTTP Uses Sockets and Streams

### ✅ Behind the scenes:

* HTTP connection is built **on top of TCP socket**
* When you send/receive HTTP data, it's transferred via **TCP stream (socket)**
* `req` and `res` in Node.js HTTP module are **streams**

### ✅ HTTP Server Stream Example:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  req.on('data', chunk => {
    console.log('Received chunk:', chunk.toString());
  });

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Data received');
  });
});

server.listen(3000);
```

---

## 💡 Summary Table

| Concept          | Description                               |
| ---------------- | ----------------------------------------- |
| Stream           | Interface for reading/writing data chunks |
| Socket           | Network connection endpoint               |
| Socket ≠ Stream  | Not all streams are sockets               |
| Socket is Stream | A type of Duplex Stream                   |
| HTTP & Stream    | HTTP uses socket and stream internally    |

---

## 📌 Key Takeaways:

* Stream is a generic abstraction for data flow.
* Socket is a real network mechanism that uses streams.
* In Node.js, many things (file, HTTP, TCP) are stream-based.
* You can chain streams together for efficiency and modularity.

---
```
import { MongoClient } from "mongodb";
import fs from "fs";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function exportReport() {
  await client.connect();
  const db = client.db("shopDB");
  const orders = db.collection("orders");

  const pipeline = [
    { $unwind: "$products" },
    { $project: { orderId: 1, productId: "$products.productId", quantity: "$products.quantity" } }
  ];

  // Read stream (MongoDB cursor → Node.js readable)
  const readable = orders.aggregate(pipeline).stream();

  // Write stream (to file)
  const writable = fs.createWriteStream("report.json");

  // Pipe MongoDB docs → file
  readable.on("data", (doc) => {
    writable.write(JSON.stringify(doc) + "\n");
  });

  readable.on("end", () => {
    writable.end(); // close file
    console.log("Export finished!");
  });
}

exportReport();

```
