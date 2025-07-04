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

## 👨‍💼 Author

**Mohit Gangwar**
Backend Developer — Node.js, MongoDB, DevOps
[Follow on GitHub](#)

---

## 🪖 License

MIT

---

✅ Want to go deeper?
Ask me to build:

* A **custom mini-ODM like Mongoose** from scratch
* A guide on **how Mongoose handles population & joins**
* **Mongoose performance tips** and indexing strategies

```
// ================================
// 📦 Custom Mini Mongoose ODM Clone
// ================================

// 1. Schema.js – Defines structure and rules
class Schema {
  constructor(definition) {
    this.definition = definition; // Store field definitions like type, required, etc.
  }

  // Validate a plain JS object against the schema
  validate(data) {
    for (let key in this.definition) {
      const rules = this.definition[key];
      const value = data[key];

      // Check required fields
      if (rules.required && (value === undefined || value === null)) {
        throw new Error(`${key} is required`);
      }

      // Check type
      if (value !== undefined && typeof value !== rules.type.name.toLowerCase()) {
        throw new Error(`${key} must be a ${rules.type.name}`);
      }
    }
  }
}

module.exports = Schema;


// 2. Model.js – Wraps schema and exposes MongoDB methods
const { ObjectId } = require('mongodb');

class Model {
  constructor(collectionName, schema, db) {
    this.collection = db.collection(collectionName); // Reference to MongoDB collection
    this.schema = schema;
  }

  // Validate and insert document
  async create(docData) {
    this.schema.validate(docData);
    const result = await this.collection.insertOne(docData);
    return result.ops ? result.ops[0] : { _id: result.insertedId, ...docData };
  }

  // Simple find query
  async find(query = {}) {
    return await this.collection.find(query).toArray();
  }

  // Update single document
  async updateOne(filter, update) {
    return await this.collection.updateOne(filter, { $set: update });
  }

  // Delete single document
  async deleteOne(filter) {
    return await this.collection.deleteOne(filter);
  }
}

module.exports = Model;


// 3. connect.js – Connects to MongoDB
const { MongoClient } = require('mongodb');

let _db = null;

async function connect(uri, dbName) {
  const client = new MongoClient(uri);
  await client.connect();
  _db = client.db(dbName);
  return _db;
}

function getDb() {
  if (!_db) throw new Error("Database not connected");
  return _db;
}

module.exports = { connect, getDb };


// 4. index.js – Example usage of custom ODM
const Schema = require('./Schema');
const Model = require('./Model');
const { connect, getDb } = require('./connect');

async function main() {
  // Connect to MongoDB
  await connect('mongodb://localhost:27017', 'customODM_DB');

  // Define a schema
  const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
  });

  // Create a model bound to the 'users' collection
  const User = new Model('users', userSchema, getDb());

  // Insert a document
  const newUser = await User.create({ name: 'Mohit', age: 25 });
  console.log('User inserted:', newUser);

  // Find documents
  const users = await User.find();
  console.log('All users:', users);

  // Update document
  await User.updateOne({ name: 'Mohit' }, { age: 26 });
  console.log('User updated.');

  // Delete document
  await User.deleteOne({ name: 'Mohit' });
  console.log('User deleted.');
}

main().catch(console.error);
```

