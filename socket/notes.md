### 🌐 What is **WebSocket**?

**WebSocket** is a **full-duplex, bidirectional communication protocol** that runs over a **single TCP connection**, allowing real-time communication between **clients (like browsers)** and **servers**.

---

## ✅ Key Characteristics

| Feature                | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| 🔁 Full-duplex         | Both client and server can send data independently and simultaneously |
| 🔗 Persistent          | Single long-lived connection (no need to re-establish per message)    |
| ⚡ Real-time            | Ideal for chats, live feeds, multiplayer games, etc.                  |
| 🧠 Low Overhead        | No HTTP headers on each message (after handshake)                     |
| 📡 Built on TCP        | Uses TCP for transport, not HTTP                                      |
| 📦 Text/Binary Support | Sends JSON, text, or binary (ArrayBuffer, Blob)                       |

---

## 📥 How WebSocket Works (Step-by-Step)

### 1. **Client initiates a WebSocket handshake over HTTP**

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZQ==
Sec-WebSocket-Version: 13
```

### 2. **Server responds with WebSocket handshake**

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

✅ Now the connection upgrades from **HTTP** to **WebSocket**.

---

### 3. **Data is exchanged in both directions**

* Frames are exchanged between client and server.
* No need for repeated requests like in HTTP.

---

## 🚀 Simple WebSocket Example

### Node.js Server using `ws`

```js
// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('✅ Client connected');

  socket.on('message', (msg) => {
    console.log('📨 Received:', msg);
    socket.send(`Echo: ${msg}`);
  });

  socket.on('close', () => {
    console.log('❌ Client disconnected');
  });
});
```

---

### Client (Browser Console)

```js
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('✅ Connected');
  socket.send('Hello from browser');
};

socket.onmessage = (event) => {
  console.log('📨 Server says:', event.data);
};

socket.onclose = () => {
  console.log('❌ Disconnected');
};
```

---

## 🧠 Visual: How WebSocket Works Internally

```
Browser ---- HTTP GET ----> Server
         <--- 101 Upgrade ---
         === Protocol Switch ===
         <== WebSocket Frames ==>
         <== Bidirectional Data ==>
```

* Uses **frames** instead of HTTP messages
* Each frame has **opcode, payload length, masking**, etc.

---

## 🔄 WebSocket vs HTTP

| Feature       | HTTP                            | WebSocket                     |
| ------------- | ------------------------------- | ----------------------------- |
| Communication | Request-Response                | Bidirectional, Full-duplex    |
| Connection    | New connection per request      | Persistent single connection  |
| Use Cases     | APIs, websites                  | Chats, live dashboards, games |
| Latency       | Higher (headers, multiple reqs) | Low latency                   |
| Protocol      | Application-layer (stateless)   | Stateful protocol over TCP    |

---

## ✅ Use Cases

* Real-time chat apps
* Multiplayer games
* Live stock/crypto tickers
* Real-time collaboration (Google Docs-like)
* IoT device control dashboards

---

## 🚫 Not Ideal When...

* You need cacheable, stateless requests → Use HTTP/REST
* You want to serve documents or static APIs
* You don’t need real-time updates

---

### Every WebSocket client connection gets its own unique socket on the server.
Client A ──── socketA ────▶ Server\
Client B ──── socketB ────▶ Server\
Client C ──── socketC ────▶ Server\
On the server:\
Each socketX is a dedicated, persistent TCP connection for that client.\
That socket is unique per client — like their own private channel.


