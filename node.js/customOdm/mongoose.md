### mongodb without mongoose odm
```
const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("myDatabase");
    const users = db.collection("users");

    // Insert any shape of data — no schema enforced
    await users.insertOne({ name: "Mohit", age: 25 });
    await users.insertOne({ title: "Not a user", tags: ["random"] }); // Also allowed

    console.log("Data inserted!");
  } finally {
    await client.close();
  }
}

main();

```
## MongoDB will accept any document structure unless you enforce rules yourself.(no validation)
## Enforcing Schema Without Mongoose (MongoDB Validator)
```
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          description: "must be an integer >= 0"
        }
      }
    }
  }
});
```
### mongoose-architecture-layers
```
# 🧠 Mongoose Architecture – Layers Explained

> Understand how Mongoose works internally by exploring its layered design — from schemas and models to raw MongoDB driver communication.

---

## 🧩 Overview

Mongoose is an ODM (Object Document Mapper) for MongoDB that provides:
- Schema validation
- Model abstraction
- Query building
- Middleware support
- Virtuals, hooks, and more

---

## 📚 Mongoose Internal Layer Stack
# 👀 Mongoose Architecture – Layers Explained

> Understand how Mongoose works internally by exploring its layered design — from schemas and models to raw MongoDB driver communication.

---

## 👉 Overview

Mongoose is an ODM (Object Document Mapper) for MongoDB that provides:

* Schema validation
* Model abstraction
* Query building
* Middleware support
* Virtuals, hooks, and more

---

## 💼 Mongoose Internal Layer Stack

```
txt
Your JavaScript Code
   ↓
Schema Layer         ← Define shape and rules
   ↓
Model Layer          ← Interface to query the DB
   ↓
Query Layer          ← Builds and processes query logic
   ↓
MongoDB Node Driver  ← Sends queries to MongoDB Server
   ↓
MongoDB Server
```

---

## 1. 🧬 Schema Layer

### 🔹 Purpose: Define the structure, types, and constraints of documents

At this layer, you define:

* Fields and types
* Validation rules (`required`, `min`, `enum`, etc.)
* Default values
* Virtual fields
* Indexes
* Middleware hooks (pre/post)

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
```

✅ This gives structure to MongoDB's flexible, schemaless documents.

---

## 2. 🧠 Model Layer

### 🔹 Purpose: Provide JavaScript methods to interact with MongoDB collections

A **Model** is a constructor compiled from a Schema. It gives you:

* Static methods like `create()`, `find()`, `updateOne()`
* Document instance methods
* Automatic application of schema validations and middleware

```js
const User = mongoose.model('User', userSchema);

await User.create({ name: 'Mohit', email: 'mohit@example.com' });
```

✅ Behind the scenes, Mongoose uses the schema rules to enforce structure on inserts/updates.

---

## 3. 🔍 Query Layer

### 🔹 Purpose: Build, validate, and prepare queries

This layer:

* Casts filter values based on schema
* Applies pre/post query middleware
* Supports fluent chaining (`.sort().limit().select()`)
* Defers execution until `.exec()` or `await`

```js
const results = await User
  .find({ name: 'Mohit' })
  .sort({ createdAt: -1 })
  .limit(10);
```

✅ The query is internally converted into a valid MongoDB command object.

---

## 4. 📦 MongoDB Driver Layer

### 🔹 Purpose: Handle actual communication with the MongoDB server

This is the lowest layer — Mongoose delegates to the official [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/).

It:

* Manages TCP connections
* Encodes BSON
* Sends operations (find, insert, etc.) to MongoDB
* Receives and decodes responses

```js
// Access raw driver
const raw = await User.collection.findOne({ email: 'mohit@example.com' });
```

✅ This layer ensures communication is fast and reliable, using MongoDB’s binary wire protocol.

---

## 📊 Summary Table

| Layer              | Role                                         |
| ------------------ | -------------------------------------------- |
| **Schema**         | Define document structure, rules, middleware |
| **Model**          | Interface to interact with DB, CRUD methods  |
| **Query**          | Build and validate queries, apply middleware |
| **MongoDB Driver** | Low-level communication with MongoDB server  |

---

## 🧠 Bonus: Middleware Hooks

You can define hooks that run at specific lifecycle points:

```js
userSchema.pre('save', function(next) {
  this.name = this.name.toUpperCase();
  next();
});
```

Mongoose runs this **before** saving the document to MongoDB.

---

## 💠 Example Flow: `User.findOne({ name: 'Mohit' })`

1. **Query Layer**:

   * Casts `name` to match schema
   * Triggers `pre('findOne')` middleware if defined

2. **Model Layer**:

   * Executes query on the underlying collection

3. **MongoDB Driver**:

   * Sends query to MongoDB over TCP
   * Receives raw document data

4. **Mongoose Post-processing**:

   * Applies `getters`, `virtuals`, `post` middleware
   * Returns hydrated document to user

---

## 🧜 Mongoose Flow Diagram

```
txt
     [Your Code]
          ↓
 ┌──────────────────────────────┐
 │  Mongoose Schema   │ ← define shape, validators, hooks
 └──────────────────────────────┘
          ↓
 ┌──────────────────────────────┐
 │   Mongoose Model   │ ← expose methods to interact
 └──────────────────────────────┘
          ↓
 ┌──────────────────────────────┐
 │   Mongoose Query   │ ← build + validate queries
 └──────────────────────────────┘
          ↓
 ┌──────────────────────────────┐
 │ MongoDB Node Driver│ ← send queries over TCP
 └──────────────────────────────┘
          ↓
     [MongoDB Server]
```

---

## 📝 Final Thoughts

Mongoose adds:

✅ Structure
✅ Type safety
✅ Built-in validations
✅ Hooks/middleware
✅ Cleaner query APIs
✅ Strong developer experience

---


```
### implemantion custom odm

```
// custom_odm.js
const { MongoClient } = require('mongodb');

// --- MongoDB Connection ---
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db = null;

// Connect to MongoDB database
async function connect() {
  if (!db) {
    await client.connect();
    db = client.db('custom_odm');
  }
  return db;
}

// --- Schema Class ---
// Defines the structure of the document and stores middleware functions
class Schema {
  constructor(definition) {
    this.definition = definition;
    this.middleware = {
      pre: {},
      post: {}
    };
  }

  // Register a pre-hook for a specific lifecycle method (save, update, remove)
  pre(hook, fn) {
    if (!this.middleware.pre[hook]) this.middleware.pre[hook] = [];
    this.middleware.pre[hook].push(fn);
  }

  // Register a post-hook
  post(hook, fn) {
    if (!this.middleware.post[hook]) this.middleware.post[hook] = [];
    this.middleware.post[hook].push(fn);
  }

  // Simple type validation against the schema
  validate(data) {
    for (const key in this.definition) {
      const type = this.definition[key];
      const value = data[key];
      if (value === undefined) continue;
      if (typeof type === 'function') {
        if (typeof value !== type.name.toLowerCase()) {
          throw new Error(`Validation failed for '${key}': expected ${type.name}`);
        }
      }
    }
  }
}

// --- Model Factory Function ---
// Returns a class with document behavior: save, update, remove, find
function Model(name, schema) {
  class CustomModel {
    constructor(data) {
      // Assign all properties from input data to the instance
      Object.assign(this, data);
    }

    // Save the document to MongoDB with pre/post middleware
    async save() {
      const db = await connect();
      const collection = db.collection(name);
      schema.validate(this);

      if (schema.middleware.pre['save']) {
        for (const fn of schema.middleware.pre['save']) await fn.call(this);
      }

      const result = await collection.insertOne(this);

      if (schema.middleware.post['save']) {
        for (const fn of schema.middleware.post['save']) await fn.call(this);
      }

      return result;
    }

    // Update document with pre/post hooks
    async update(changes) {
      const db = await connect();
      const collection = db.collection(name);

      Object.assign(this, changes);
      schema.validate(this);

      if (schema.middleware.pre['update']) {
        for (const fn of schema.middleware.pre['update']) await fn.call(this);
      }

      const result = await collection.updateOne({ _id: this._id }, { $set: changes });

      if (schema.middleware.post['update']) {
        for (const fn of schema.middleware.post['update']) await fn.call(this);
      }

      return result;
    }

    // Remove the document from MongoDB
    async remove() {
      const db = await connect();
      const collection = db.collection(name);

      if (schema.middleware.pre['remove']) {
        for (const fn of schema.middleware.pre['remove']) await fn.call(this);
      }

      const result = await collection.deleteOne({ _id: this._id });

      if (schema.middleware.post['remove']) {
        for (const fn of schema.middleware.post['remove']) await fn.call(this);
      }

      return result;
    }

    // Static method to find documents by query
    static async find(query = {}) {
      const db = await connect();
      const collection = db.collection(name);
      const docs = await collection.find(query).toArray();
      return docs.map(doc => new CustomModel(doc));
    }
  }

  return CustomModel;
}

// --- Example Usage ---
(async () => {
  // 1. Define schema
  const userSchema = new Schema({
    name: String,
    email: String
  });

  // 2. Add middleware hooks
  userSchema.pre('save', async function () {
    console.log('[Pre Save]', this.name);
  });

  userSchema.post('save', async function () {
    console.log('[Post Save]', this.name);
  });

  userSchema.pre('update', async function () {
    console.log('[Pre Update]', this.name);
  });

  userSchema.post('update', async function () {
    console.log('[Post Update]', this.name);
  });

  userSchema.pre('remove', async function () {
    console.log('[Pre Remove]', this.name);
  });

  userSchema.post('remove', async function () {
    console.log('[Post Remove]', this.name);
  });

  // 3. Create model
  const User = Model('users', userSchema);

  // 4. Create and manipulate document
  const user = new User({ name: 'Bob', email: 'bob@example.com' });
  await user.save();                  // insert document
  await user.update({ name: 'Bobby' }); // update document
  await user.remove();               // delete document
})();

```
