```
# 📘 TCP (`net`) vs HTTP (`http`) in Node.js

---

## 🔹 1. Introduction

Node.js provides different modules to handle networking:

- `net`: Built-in module to create **low-level TCP servers/clients**
- `http`: Built-in module to create **high-level HTTP web servers/clients**, built on top of `net`

---

## 🔹 2. What is TCP?

- **TCP (Transmission Control Protocol)** is a transport protocol that ensures:
  - Reliable data transmission
  - Ordered delivery
  - Error checking and correction
- Used in many protocols (HTTP, FTP, SMTP) as a base.

---

## 🔹 3. The `net` Module in Node.js

### 🔸 Purpose:
Used to create raw **TCP socket servers/clients**

### 🔸 Example:

```js
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');
  socket.write('Welcome to TCP Chat!\n');

  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    socket.write('You said: ' + data.toString());
  });
});

server.listen(3000, () => {
  console.log('TCP Server listening on port 3000');
});
```
🔸 How to Test:
```
telnet localhost 3000
```
## 🔸 Characteristics:
    No HTTP formatting
    Direct stream communication (Buffer/String)
    You control the protocol structure

### 🔹  The http Module in Node.js
 ## purpose : 
     Used to create web servers that understand the HTTP protocol (GET, POST, headers, etc.)
  ```
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('HTTP request received');
  res.write('Welcome to HTTP Server!\n');
  res.end();
});

server.listen(3000, () => {
  console.log('HTTP Server listening on port 3000');
});
```
How to Test: curl http://localhost:3000 \

## 🔸 Characteristics:
 Parses HTTP headers and methods\
Provides req and res objects\
Adds support for status codes, content types, etc.



     
