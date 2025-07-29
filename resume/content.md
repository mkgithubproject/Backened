
---

## ✅ What is a REST API?

**REST (Representational State Transfer)** is an architectural style for designing networked applications. It relies on **HTTP methods** and a **stateless, resource-based** approach.

* Each **resource** (e.g., `user`, `order`) is identified by a URL.
* Uses HTTP methods: **GET**, **POST**, **PUT**, **DELETE**.
* Responses are usually in **JSON**.

---

## 🎯 Common REST API Interview Questions (with Simple Explanations)

---

### 1. **What are the main HTTP methods used in REST APIs?**

| Method | Purpose                 | Example Endpoint    |
| ------ | ----------------------- | ------------------- |
| GET    | Fetch resource          | `GET /users/123`    |
| POST   | Create new resource     | `POST /users`       |
| PUT    | Replace resource        | `PUT /users/123`    |
| PATCH  | Update part of resource | `PATCH /users/123`  |
| DELETE | Remove resource         | `DELETE /users/123` |

---

### 2. **What is the difference between PUT and PATCH?**

* **PUT** replaces the entire resource.
* **PATCH** updates only the specified fields.

**Example:**

```http
PUT /users/123
{
  "name": "John", "email": "john@example.com"
}
```

vs

```http
PATCH /users/123
{
  "name": "John"
}
```

---

### 3. **What is statelessness in REST APIs?**

REST APIs are **stateless**: the server does not store any session data between requests.

👉 Every request from the client must contain all the information needed.

---

### 4. **What is a resource in REST?**

A **resource** is a data object (e.g., user, product) accessible via a URI.

Example:

```
GET /products/101
```

---

### 5. **What are URI naming conventions in REST?**

* Use **nouns**, not verbs
* Use **plural form**
* Use **nested routes** for sub-resources

✅ Good:

```
GET /users/123/orders
```

❌ Bad:

```
GET /getUserOrders/123
```

---

### 6. **What is the proper response code for each action?**

| Action        | Code | Meaning                |
| ------------- | ---- | ---------------------- |
| Success (GET) | 200  | OK                     |
| Created       | 201  | Resource created       |
| No content    | 204  | Successful but no body |
| Bad request   | 400  | Validation failed      |
| Unauthorized  | 401  | Auth required          |
| Forbidden     | 403  | No access              |
| Not found     | 404  | Resource doesn't exist |
| Server error  | 500  | Internal error         |

---

### 7. **What are query parameters vs path parameters?**

* **Path parameter** is part of the URL and identifies a resource:

  ```
  GET /users/123
  ```

* **Query parameter** is for filtering/sorting/pagination:

  ```
  GET /users?page=2&limit=10
  ```

---

### 8. **How to handle versioning in REST APIs?**

Versioning helps you make changes without breaking clients.

**Approaches:**

* URI versioning: `GET /api/v1/users`
* Header versioning: `Accept: application/vnd.api.v1+json`

---

### 9. **What is HATEOAS?**

**HATEOAS**: Hypermedia As The Engine Of Application State.

It means the API provides **links to related resources** in the response.

Example:

```json
{
  "id": 123,
  "name": "John",
  "links": [
    { "rel": "orders", "href": "/users/123/orders" }
  ]
}
```

---

### 10. **How do you handle errors in REST APIs?**

Return a clear **status code** and **error message**.

```json
{
  "status": 400,
  "error": "ValidationError",
  "message": "Email is required"
}
```

---

### 11. **How do you secure REST APIs?**

* Use **HTTPS**
* Implement **authentication** (e.g., JWT, OAuth2)
* Add **authorization** (e.g., role-based access)
* Validate input data
* Rate limiting / throttling

---

### 12. **Explain idempotency in REST.**

An **idempotent** operation can be repeated safely without changing the result.

| Method | Idempotent? |
| ------ | ----------- |
| GET    | ✅           |
| PUT    | ✅           |
| DELETE | ✅           |
| POST   | ❌           |

---

### 13. **How do you structure a REST API project?**

Common folder structure in Node.js:

```
/routes
/controllers
/models
/services
/middlewares
/app.js
```

---

### 14. **How do you handle pagination?**

Using query parameters:

```
GET /users?page=2&limit=10
```

Response format:

```json
{
  "data": [/* 10 users */],
  "page": 2,
  "limit": 10,
  "total": 100
}
```

---

### 15. **What are best practices in REST API design?**

* Use **plural nouns** (`/users`)
* Always return **proper status codes**
* Support **filtering/sorting/pagination**
* Keep **stateless**
* Follow **consistent naming**
* Add **versioning**
* Validate and sanitize input

---
Here’s a curated list of **AWS interview questions** focused on core services like **S3**, **EC2**, **Route 53**, and **ELB (Elastic Load Balancer)**. Each question includes a **brief, simple answer**, ideal for a **mid-level backend engineer** interview (like your role with 2.5 years of experience):

---

## ✅ **Amazon EC2 (Elastic Compute Cloud)**

### 1. **What is EC2 in AWS?**

EC2 stands for **Elastic Compute Cloud**. It provides resizable compute capacity (virtual servers) in the cloud to run applications.

### 2. **What is an AMI?**

An **Amazon Machine Image (AMI)** is a template used to launch EC2 instances. It includes OS, application server, and apps.

### 3. **What are EC2 instance types?**

Instance types define compute, memory, and storage capabilities, e.g.:

* `t2.micro` (general-purpose)
* `m5.large` (balanced)
* `c5.large` (compute-optimized)

### 4. **What is the difference between Stop and Terminate in EC2?**

* **Stop**: Instance is shut down but EBS volume persists.
* **Terminate**: Instance and attached volumes are deleted (unless volume has "Delete on termination" disabled).

### 5. **What are EC2 Security Groups?**

**Security Groups** act as virtual firewalls for EC2 instances to control **inbound and outbound traffic**.

---

## ✅ **Amazon S3 (Simple Storage Service)**

### 6. **What is S3 used for?**

S3 is an object storage service used to store and retrieve any amount of data at any time.

### 7. **What are the storage classes in S3?**

* **Standard** – Frequent access
* **IA (Infrequent Access)** – Less frequent access
* **Glacier / Glacier Deep Archive** – Archival
* **One Zone-IA** – Single AZ infrequent access

### 8. **What is S3 versioning?**

Allows storing **multiple versions** of an object to protect against accidental overwrites or deletions.

### 9. **How does S3 handle data durability?**

S3 provides **11 9’s (99.999999999%) durability** by replicating data across multiple facilities.

### 10. **What is the difference between S3 and EBS?**

* **S3** is for **object storage** (like files, images).
* **EBS** is for **block storage** attached to EC2 (like a virtual hard disk).

---

## ✅ **Route 53 (DNS and Domain Management)**

### 11. **What is Route 53?**

A scalable **DNS (Domain Name System)** web service that translates domain names into IP addresses.

### 12. **What routing policies does Route 53 support?**

* **Simple routing**
* **Weighted routing**
* **Latency-based routing**
* **Failover routing**
* **Geolocation routing**
* **Multivalue answer routing**

### 13. **How does Route 53 handle health checks?**

You can configure **health checks** for endpoints; if an endpoint fails, Route 53 can route traffic to a healthy backup.

---

## ✅ **Elastic Load Balancer (ELB)**

### 14. **What is ELB?**

ELB automatically distributes incoming application traffic across multiple EC2 instances.

### 15. **Types of ELB?**

* **Application Load Balancer (ALB)** – Layer 7 (HTTP/HTTPS)
* **Network Load Balancer (NLB)** – Layer 4 (TCP/UDP)
* **Gateway Load Balancer (GWLB)** – For third-party appliances

### 16. **How does ELB improve fault tolerance?**

By distributing traffic across multiple **Availability Zones** and healthy instances.

### 17. **Can ELB handle SSL termination?**

Yes, **ALB and NLB** can offload the SSL handshake, reducing the CPU load on backend instances.

---

## ✅ **Combined Scenario-Based Questions**

### 18. **How would you deploy a highly available web application on AWS?**

* Use **EC2** instances in **multiple AZs** (behind an **Auto Scaling Group**).
* Use **ALB** to distribute traffic.
* Use **S3** for storing static files (images, uploads).
* Use **Route 53** for DNS.
* Use **RDS/Aurora** for database with multi-AZ support.

### 19. **How would you secure files stored in S3?**

* Use **bucket policies** and **IAM roles**.
* Enable **S3 server-side encryption (SSE)**.
* Block public access unless explicitly needed.
* Enable **versioning** and **MFA delete**.

### 20. **What happens when an EC2 instance behind an ELB fails?**

* ELB health checks detect it and stop routing traffic to the failed instance.
* Auto Scaling Group can replace it if configured.

---

Let me know if you want:

* Deeper dive into VPC integration
* Infrastructure diagram based on these services
* Real-world system design using EC2 + S3 + Route 53 + ELB

Or I can convert this into an **interview Q\&A cheat sheet PDF** for easy prep.


