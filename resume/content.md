
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

