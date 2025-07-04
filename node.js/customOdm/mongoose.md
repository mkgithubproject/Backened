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

```txt
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
