Here is a curated list of **MongoDB + Mongoose interview questions with answers**, specifically tailored for **2.5 years of experience as a Node.js backend developer**. These cover both theory and practical aspects expected in mid-level interviews (10–12+ LPA range).

---

## 🔸 **Section 1: MongoDB Core Interview Questions**

### 1. **What is MongoDB and why is it used?**

**Answer:**
MongoDB is a NoSQL, document-oriented database that stores data in JSON-like **BSON** format.
**Reasons to use:**

* Schema-less (flexible data model)
* High scalability (horizontal scaling via sharding)
* High performance (indexing, in-memory)
* Suitable for microservices and fast prototyping

---

### 2. **What is the difference between SQL and NoSQL databases?**

**Answer:**

| Feature        | SQL (Relational) | NoSQL (MongoDB)         |
| -------------- | ---------------- | ----------------------- |
| Schema         | Fixed            | Dynamic (schema-less)   |
| Storage Format | Tables & Rows    | JSON/BSON Documents     |
| Joins          | Supported        | Limited (via `$lookup`) |
| Transactions   | Supported        | Supported (since v4.0)  |
| Scale          | Vertical         | Horizontal (Sharding)   |

---

### 3. **What is BSON in MongoDB?**

**Answer:**
BSON stands for **Binary JSON**. It is a binary-encoded serialization of JSON-like documents used by MongoDB, which supports more data types (e.g., `Date`, `ObjectId`, `BinData`).

---

### 4. **How does indexing work in MongoDB?**

**Answer:**
Indexes improve query performance by allowing MongoDB to search documents faster. Common types:

* **Single field index**: `{ name: 1 }`
* **Compound index**: `{ name: 1, age: -1 }`
* **Text index**: `{ title: "text" }`
* **TTL index**: Auto-delete documents after a certain time.

---

### 5. **Explain aggregation in MongoDB.**

**Answer:**
Aggregation processes data records and returns computed results. It's used for analytics, grouping, filtering, projections, etc.

```js
db.orders.aggregate([
  { $match: { status: "delivered" }},
  { $group: { _id: "$customerId", total: { $sum: "$amount" } }}
])
```

---

### 6. **What is the difference between `find()` and `aggregate()`?**

**Answer:**

| Operation     | Use Case                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| `find()`      | Basic querying                                                            |
| `aggregate()` | Complex data transformations and computations (e.g., `$group`, `$lookup`) |

---

### 7. **What is `$lookup` in MongoDB?**

**Answer:**
`$lookup` is used to **join collections** (like SQL JOIN).

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userInfo"
    }
  }
])
```

---

### 8. **What is sharding in MongoDB?**

**Answer:**
Sharding is a method for distributing data across multiple machines (horizontal scaling).
Used when data size exceeds a single machine's capacity.

---

### 9. **What are transactions in MongoDB?**

**Answer:**
MongoDB supports **multi-document ACID transactions** (since v4.0) to ensure data consistency.

```js
const session = await conn.startSession();
session.startTransaction();
try {
  await user.save({ session });
  await order.save({ session });
  await session.commitTransaction();
} catch {
  await session.abortTransaction();
}
```

---

### 10. **What are the different MongoDB data types?**

**Answer:**

* String
* Number (Int32, Double)
* Object
* Array
* Boolean
* Null
* ObjectId
* Date
* Timestamp
* Binary data

---

## 🔸 **Section 2: Mongoose Interview Questions**

### 1. **What is Mongoose and why do we use it?**

**Answer:**
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js that:

* Provides schema-based structure
* Adds hooks/middleware
* Handles validations
* Simplifies CRUD operations

---

### 2. **How do you define a schema in Mongoose?**

**Answer:**

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, unique: true }
});
```

---

### 3. **Explain Mongoose middleware (hooks).**

**Answer:**
Mongoose supports **pre** and **post** middleware on methods like `save`, `find`, `remove`, etc.

```js
userSchema.pre('save', function(next) {
  this.name = this.name.trim();
  next();
});
```

---

### 4. **How do you handle validation in Mongoose?**

**Answer:**
You can use built-in validators or custom ones.

```js
email: {
  type: String,
  required: true,
  validate: {
    validator: (v) => /.+@.+\..+/.test(v),
    message: props => `${props.value} is not a valid email!`
  }
}
```

---

### 5. **What is the difference between `save()` and `insertMany()` in Mongoose?**

**Answer:**

| Method         | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| `save()`       | Saves a single document (runs validation & middleware) |
| `insertMany()` | Inserts multiple documents (optional validation)       |

---

### 6. **How does population (`populate()`) work in Mongoose?**

**Answer:**
`populate()` is used to replace a field (like `userId`) with the actual referenced document.

```js
Post.find().populate('userId');
```

Schema:

```js
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
```

---

### 7. **How can you update documents using Mongoose?**

**Answer:**

* `Model.updateOne({ _id }, { $set: { name: 'John' } })`
* `Model.findByIdAndUpdate(id, update, { new: true })`

> Note: Middleware is **not** triggered by default for `update` operations. Use `save()` for hook support.

---

### 8. **What are virtuals in Mongoose?**

**Answer:**
Virtuals are computed properties not stored in MongoDB.

```js
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});
```

---

### 9. **How to implement pagination using Mongoose?**

**Answer:**

```js
const page = 1, limit = 10;
Model.find().skip((page - 1) * limit).limit(limit);
```

---

### 10. **How do you handle unique constraints and duplicate errors?**

**Answer:**
Set `unique: true` in schema:

```js
email: { type: String, unique: true }
```

Handle error in code:

```js
try {
  await user.save();
} catch (err) {
  if (err.code === 11000) {
    console.log('Duplicate email error');
  }
}
```

---

## 🔸 Bonus: Real-World Scenario Questions

### ✅ Q: What would you do if your MongoDB queries are slow?

**Answer:**

* Use **indexes** properly
* Avoid unbounded queries
* Use **`.explain()`** to analyze query plans
* Optimize schema design (denormalization, embedding)

---

### ✅ Q: Embedded vs Referenced documents – when to use what?

**Answer:**

* Use **embedded** documents when data is accessed together (e.g., comments in posts).
* Use **referenced** documents for large or reusable data (e.g., user references).

---

Would you like a **PDF sheet version** or **mock interview Q\&A style** next?

Also available:

* MongoDB Query Practice Set
* Mongoose Error Handling Cheatsheet
* Real Interview Scenarios with Answers
