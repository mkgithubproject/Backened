## 🧠 JavaScript: Normal Function vs Constructor Function (Visual Summary)

---

### ✅ 1. Normal Function

```js
function greet(name) {
  return `Hello, ${name}`;
}

const msg = greet("Alice");
console.log(msg); // Hello, Alice
```

#### 🔍 How it works:

* No object is created.
* `this` refers to: `undefined` (in strict mode) or `window` (non-strict).
* It runs and returns a value (string in this case).

#### ✅ Used For:

* Simple reusable logic
* Utility functions
* Does NOT create new objects automatically

---

### ✅ 2. Constructor Function

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const p1 = new Person("Bob", 25);
p1.sayHello(); // Hi, I'm Bob
```

#### 🔍 How it works:

1. A new object is created: `{}`
2. `this` is bound to that object
3. Properties are assigned to `this`
4. That object is returned automatically

#### ✅ Used For:

* Object blueprints (before ES6 classes)
* Creating multiple instances (like classes)

---

### 🔄 Visual Flow:

#### Normal Function:

```
Call: greet("Alice")
→ Executes code
→ Returns string
→ No new object created
```

#### Constructor Function:

```
Call: new Person("Bob", 25)
→ Creates empty object {}
→ Binds `this` to new object
→ Sets properties on object
→ Returns object { name: "Bob", age: 25, sayHello: f }
```

---

### 🆚 Side-by-Side Comparison

| Feature            | Normal Function       | Constructor Function          |
| ------------------ | --------------------- | ----------------------------- |
| Called with        | `func()`              | `new Func()`                  |
| Naming             | `camelCase`           | `PascalCase`                  |
| Purpose            | Logic / Utilities     | Object creation               |
| `this` refers to   | Global / undefined    | New object                    |
| Return value       | Custom or `undefined` | Automatically returns new obj |
| Prototype attached | No                    | Yes (`Func.prototype`)        |

---

### 🚀 Best Practice:

* Use **normal functions** for logic.
* Use **constructor functions** (or classes) for creating objects.

Would you like a diagram added as a PNG or SVG to visually show memory/reference flow?
