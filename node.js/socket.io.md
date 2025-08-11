Got it ✅ — you want to first **see HTTP and Socket.IO running separately** (different ports), and then **merge them into the same port** so you can clearly visualize the change.

Let’s do it in **two stages**:

---

## **Stage 1 — HTTP server and Socket.IO server on separate ports**

### **server-http.js**

```js
// HTTP server (Express)
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/healthCheck', (req, res) => {
  res.send('Health is okay.');
});

app.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
```

---

### **server-socket.js**

```js
// WebSocket server (Socket.IO)
const { Server } = require('socket.io');

// Start Socket.IO server on a different port (5000)
const io = new Server(5000, {
  cors: {
    origin: '*', // allow all origins for testing
  },
});

io.on('connection', (socket) => {
  console.log('A user connected to Socket.IO');

  socket.emit('welcome', 'Hello from Socket.IO server');

  socket.on('message', (msg) => {
    console.log('Message from client:', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

console.log('Socket.IO server running on ws://localhost:5000');
```

---

### **Flow in Stage 1**

* HTTP server → Port **4000** (handles API calls like `/healthCheck`)
* Socket.IO server → Port **5000** (handles real-time communication)

**Diagram:**

```
Client
  ├── HTTP GET /healthCheck → localhost:4000
  └── WebSocket connect → localhost:5000
```

---

## **Stage 2 — Merge HTTP + Socket.IO into one port**

```js
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// HTTP route
app.get('/healthCheck', (req, res) => {
  res.send('Health is okay.');
});

// Create one HTTP server from Express
const server = http.createServer(app);

// Attach Socket.IO to the same server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected to Socket.IO');

  socket.emit('welcome', 'Hello from Socket.IO (same port)');

  socket.on('message', (msg) => {
    console.log('Message from client:', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start one combined server
server.listen(PORT, () => {
  console.log(`HTTP + Socket.IO server running at http://localhost:${PORT}`);
});
```

---

### **Flow in Stage 2**

* **Same port (4000)** for both:

  * `GET /healthCheck` → HTTP route via Express
  * WebSocket events → Socket.IO connection

**Diagram:**

```
Client
  ├── HTTP GET /healthCheck → localhost:4000
  └── WebSocket connect → localhost:4000
```

---

If you want, I can also give you a **test HTML file** that connects to both versions so you can open it in the browser and see the difference in action.
Do you want me to prepare that test client?
