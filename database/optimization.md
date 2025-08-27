# 📌 API & Database Optimization Checklist

---

## 1. Request & Response Optimization

* ✅ Return only required fields (avoid `SELECT *` / full MongoDB docs).
* ✅ Use **pagination** (`limit & offset` or keyset pagination).
* ✅ Enable **response compression** (gzip/brotli).
* ✅ Batch multiple small requests into a single API call.

**Example:**

```sql
-- MySQL
SELECT id, name, email FROM users LIMIT 20 OFFSET 40;

// MongoDB
 db.users.find({}, { name: 1, email: 1 }).limit(20).skip(40);
```

---

## 2. Database Optimization

* ✅ **Schema design**: Normalize or denormalize depending on use case.
* ✅ **Indexes**: Use primary, composite, and covering indexes wisely.
* ✅ **Query optimization**: Analyze with `EXPLAIN` (MySQL) or `.explain()` (MongoDB).
* ✅ **Connection pooling** to reuse DB connections.
* ✅ **Caching** frequently accessed queries (Redis, in-memory).
* ✅ Avoid **N+1 queries** (batch fetch or joins).
* ✅ Use **sharding or partitioning** for very large datasets.
* ✅ Tune DB configuration (e.g., InnoDB buffer pool, WiredTiger cache).
* ✅ Use **read replicas** for read-heavy workloads.

---

### 📊 MySQL vs MongoDB Optimization Examples

| Optimization Area   | MySQL Example                                          | MongoDB Example                                           |
| ------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| **Schema Design**   | Normalized tables: `users` & `orders`                  | References between collections: `userId` in `orders`      |
| **Denormalization** | Materialized views for reporting                       | Embed user info inside orders                             |
| **Indexing**        | `CREATE INDEX idx_email ON users(email);`              | `db.users.createIndex({ email: 1 })`                      |
| **Query Analysis**  | `EXPLAIN SELECT * FROM users WHERE email='x';`         | `db.users.find({ email: "x" }).explain("executionStats")` |
| **Pagination**      | `SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 40;` | `db.orders.find().sort({_id:1}).limit(20).skip(40)`       |
| **Sharding**        | Horizontal partitioning by user\_id                    | Shard collection on `{ region: 1 }`                       |
| **Replication**     | Master-Slave replication                               | Replica sets                                              |
| **Configuration**   | Tune `innodb_buffer_pool_size`                         | Increase WiredTiger cache size                            |

---

## 3. Caching

* ✅ **Client-side caching** with HTTP headers (`ETag`, `Cache-Control`).
* ✅ **Server-side caching** for expensive API responses.
* ✅ **Query-level caching** for repeated DB queries.
* ✅ **CDN caching** for static/rarely changing API responses.

**Example:**

```http
Cache-Control: max-age=3600
ETag: "user-123-version1"
```

---

## 4. Code Optimization

* ✅ Offload heavy computations to **background jobs** (e.g., RabbitMQ, BullMQ).
* ✅ Use **async/non-blocking I/O** (especially in Node.js).
* ✅ Reuse **DB/API connections** instead of creating new ones.

---

## 5. Network Optimization

* ✅ Use **HTTP/2 or HTTP/3 (QUIC)**.
* ✅ Enable **keep-alive connections**.
* ✅ Minimize payload size (consider **Protobuf/MessagePack**).

---

## 6. Security & Performance Together

* ✅ Apply **rate limiting & throttling**.
* ✅ Use **circuit breaker pattern** for downstream failures.
* ✅ Validate inputs early to reject invalid requests fast.

---

## 7. Monitoring & Profiling

* ✅ Track **slow API responses** with logs.
* ✅ Use **APM tools** (Datadog, New Relic, Prometheus, Grafana).
* ✅ Monitor **p95/p99 latency**, not just average.
* ✅ Run **load tests** (k6, JMeter).

---

## 8. Advanced Optimizations

* ✅ Use **GraphQL or gRPC** for flexibility/efficiency.
* ✅ Deploy **API Gateway** (NGINX, Envoy, AWS API Gateway).
* ✅ Use **edge computing/CDNs** for faster delivery.
* ✅ Prefer **bulk writes/reads** over multiple single operations.

---

⚡ **Rule of Thumb:** Optimize at every layer → Request → API → Database → Response → Network → Monitoring.
