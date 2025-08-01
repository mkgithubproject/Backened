Let's cover **JWT (JSON Web Token)** in two parts:

---

## 🔐 Part 1: **JWT Implementation in Node.js (with Express)**

We’ll build a simple example with:

* `Login`: Generates token
* `Protected route`: Requires token
* Uses `jsonwebtoken` package

---

### 📦 Step 1: Install dependencies

```bash
npm install express jsonwebtoken dotenv
```

---

### 📁 Project structure

```
jwt-auth/
├── server.js
├── .env
```

---

### 📄 .env

```env
JWT_SECRET=supersecretkey123
```

---

### 📄 server.js

```js
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: 'mohit', password: '1234' }
];

// Login route (generates token)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## ✅ Test the Flow

1. **Login:**

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"mohit","password":"1234"}'
```

2. **Use the token**:

```bash
curl http://localhost:3000/profile -H "Authorization: Bearer <TOKEN>"
```

---

## 🎯 Part 2: JWT Interview Questions (with Answers)

---

### 1. ❓ What is JWT?

**Answer**:
JWT (JSON Web Token) is a compact, URL-safe token format used to securely transmit information between parties as a JSON object. It's commonly used for **authentication and authorization**.

---

### 2. ❓ What are the three parts of a JWT?

**Answer**:

1. **Header** – Contains metadata like algorithm and token type.
2. **Payload** – Contains the claims (data).
3. **Signature** – Used to verify the token wasn’t tampered with.

```
Header.Payload.Signature
```

---

### 3. ❓ How does JWT authentication work?

**Answer**:

1. User logs in → Server generates a token.
2. Token is sent to the client.
3. Client stores token (usually in localStorage or cookies).
4. On every request, token is sent via `Authorization` header.
5. Server verifies and allows access.

---

### 4. ❓ What is the difference between **authentication** and **authorization**?

* **Authentication**: Validating who the user is (login).
* **Authorization**: Checking what the user has access to (permissions).

---

### 5. ❓ What are common security concerns with JWT?

**Answer**:

* **Token leakage** (via XSS, logs).
* **No server-side token invalidation** unless using blacklists.
* **Token expiration** must be handled carefully.
* Avoid storing JWT in localStorage (prefer cookies with `HttpOnly` flag).

---

### 6. ❓ Can you invalidate a JWT token?

**Answer**:
JWTs are stateless, so you can't invalidate them on the server directly. Workarounds:

* Maintain a **blacklist** of tokens.
* Use **short expiration** with **refresh tokens**.

---

### 7. ❓ Where should JWTs be stored on the client side?

* Ideally: **HttpOnly cookies** (protects from XSS).
* Avoid: `localStorage` (easier to steal via XSS).

---
Great questions! Let’s break it down:

---

## ✅ **1. What is the use of the JWT Signature?**

The **signature** ensures that the **token has not been tampered with**.

---

### 🔐 How Signature Works

When you generate a token:

```js
jwt.sign(payload, secret, options)
```

Internally, it creates:

```
base64UrlEncode(header) + "." + base64UrlEncode(payload)
→ signs it using the secret key
```

Then adds a **signature**:

```
JWT = header.payload.signature
```

So, **Signature = HMACSHA256(base64UrlHeader + "." + base64UrlPayload, secret)**

---

### 🛡️ Why Signature is Important

* When a client sends back the token, the server **verifies the signature using the secret key**.
* If the payload was modified (e.g., someone changed `"role": "user"` to `"role": "admin"`), the signature won't match and the token will be rejected.

---

## ✅ **2. What is the default lifetime of a JWT token?**

By **default**, JWT **does not expire** — **unless you explicitly set an `expiresIn`**.

---

### Example: Setting token expiration

```js
const token = jwt.sign({ id: 1 }, 'secretkey', { expiresIn: '1h' });
```

🔸 `expiresIn` options:

* `'1h'` → 1 hour
* `'7d'` → 7 days
* `60` → 60 seconds (numeric is in seconds)

---

### 🔁 If no `expiresIn` is set:

```js
const token = jwt.sign({ id: 1 }, 'secretkey'); // Never expires!
```

✅ It will keep working **forever** until:

* The **secret key changes**
* Or you implement **blacklisting**

---

## 📝 Summary

| Feature               | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| 🔐 Signature          | Prevents tampering. Ensures token is issued by a trusted server.             |
| ⏳ Expiration          | Not set by default. You must **manually add** `expiresIn` for security.      |
| 🧨 Without expiration | Risky — user remains logged in **forever** unless you manually revoke token. |

---

