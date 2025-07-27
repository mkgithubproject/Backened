Great! Below is a **simple glossary** of key system design terms with **easy explanations** using **Node.js context** so you can relate better.

---

### 🧠 **System Design Glossary for Node.js Backend Developers**

---

### ✅ **1. Load Balancer**

* **What:** Distributes traffic across multiple servers so no single server is overloaded.
* **Why:** Helps your app scale and stay online even if one server fails.
* **Example:** You have 3 Node.js servers behind an Nginx load balancer. When 1,000 users hit your API, traffic is divided evenly.

---

### ✅ **2. Caching**

* **What:** Temporarily stores data in memory to serve faster on repeat requests.
* **Why:** Reduces load on the database and speeds up response times.
* **Example:** Storing product details in Redis so your API doesn’t hit the database every time.

---

### ✅ **3. CDN (Content Delivery Network)**

* **What:** Delivers static assets like images, JS/CSS files from servers close to the user.
* **Why:** Improves load time and reduces server load.
* **Example:** Hosting frontend assets (e.g., product images) on Cloudflare or AWS CloudFront.

---

### ✅ **4. Horizontal Scaling**

* **What:** Add more servers to handle increased load.
* **Why:** More scalable than vertical scaling (adding more CPU/RAM).
* **Example:** Running 4 Node.js instances of your API instead of 1, behind a load balancer.

---

### ✅ **5. Database Sharding**

* **What:** Splits large databases into smaller parts (shards) to spread load.
* **Why:** Helps when a single DB server can’t handle all the data or traffic.
* **Example:** Users with IDs 1–1M go to DB1, 1M–2M go to DB2.

---

### ✅ **6. Indexing**

* **What:** Like a table of contents for databases; makes lookups faster.
* **Why:** Without indexes, DB must scan entire tables → slow queries.
* **Example:** Indexing `email` in your users collection for fast login lookup.

---

### ✅ **7. Queue / Message Queue**

* **What:** Temporarily holds tasks to be processed asynchronously.
* **Why:** Keeps your API responsive and offloads heavy work.
* **Example:** Use Bull.js to queue "Send Welcome Email" instead of blocking the API response.

---

### ✅ **8. Rate Limiting**

* **What:** Restricts how many times a user can call an API in a given time.
* **Why:** Prevents abuse, spam, and server overload.
* **Example:** Limit `/login` to 5 requests per minute per IP using Redis + middleware.

---

### ✅ **9. WebSocket / Real-Time Communication**

* **What:** Persistent connection between client and server for real-time data.
* **Why:** Good for chat, live updates.
* **Example:** Use `Socket.IO` for a group chat feature in a Node.js app.

---

### ✅ **10. CAP Theorem**

* **What:** In distributed systems, you can’t have all 3 guarantees at the same time:

  * **C (Consistency):** Every read receives the most recent write or an error.
  * **A (Availability):** Every request receives a response (success/failure), even during failures.
  * **P (Partition Tolerance):** The system continues to operate despite network splits between nodes.
* **Why:** You must choose two of the three. Network partition is unavoidable in distributed systems, so trade-off is usually between C and A.
* **Example:**

  * **MongoDB** favors **Availability + Partition Tolerance**: Even during a network partition, it allows writes which may cause temporary inconsistency.
  * **CP System Example (Zookeeper):** Prioritizes consistency, may become unavailable during a partition to avoid inconsistent state.

---

### ✅ **11. Stateless Services**

* **What:** No session/data is stored on the server between requests.
* **Why:** Makes it easy to scale horizontally.
* **Example:** Use JWT tokens instead of storing login sessions in Node.js memory.

---

### ✅ **12. Event-Driven Architecture**

* **What:** Components react to events instead of direct function calls.
* **Why:** Improves decoupling and scalability.
* **Example:** When a new order is placed, emit an event that triggers sending emails, updating stock, etc., via Node EventEmitter or Kafka.

---

Would you like to see **how these are used in a real system design**, like designing a **URL shortener or e-commerce cart** using Node.js? Or do you want me to explain more terms like **eventual consistency**, **throttling**, or **circuit breakers**?
