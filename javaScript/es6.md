ES6 (also known as **ECMAScript 2015**) was a **major update** to JavaScript that introduced many new features to improve readability, maintainability, and performance. Here's a breakdown of the **most important and commonly used ES6 features** with practical examples:

---

## ✅ 1. `let` and `const`

Block-scoped variable declarations (replaces `var`).

```js
let x = 10;    // reassignable
x = 15;

const y = 20;  // constant, cannot be reassigned
// y = 25; ❌ TypeError
```

---

## ✅ 2. Arrow Functions `()=>`

Shorter syntax for functions with lexical `this`.

```js
const add = (a, b) => a + b;
console.log(add(3, 4)); // 7
```

```js
// Traditional
function greet() {
  console.log("Hello");
}

// ES6 Arrow
const greetArrow = () => console.log("Hello");
greetArrow();
```

---

## ✅ 3. Template Literals `` `...` ``

Multi-line strings and string interpolation.

```js
const name = "Alice";
const message = `Hello, ${name}!`;
console.log(message); // Hello, Alice!
```

---

## ✅ 4. Default Parameters

Set default values for function parameters.

```js
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greet();         // Hello, Guest
greet("Bob");    // Hello, Bob
```

---

## ✅ 5. Destructuring

Extract values from arrays or objects.

```js
// Object
const user = { name: "Bob", age: 25 };
const { name, age } = user;
console.log(name, age); // Bob 25

// Array
const [a, b] = [1, 2];
console.log(a, b); // 1 2
```

---

## ✅ 6. Spread `...` and Rest `...` Operators

```js
// Spread: expand array
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // [1, 2, 3, 4]

// Rest: collect remaining elements
function sum(...nums) {
  return nums.reduce((acc, val) => acc + val, 0);
}
console.log(sum(1, 2, 3)); // 6
```

---

## ✅ 7. Enhanced Object Literals

Shorthand syntax for defining object properties and methods.

```js
const name = "Alice";
const user = {
  name,
  greet() {
    console.log("Hi!");
  }
};

user.greet(); // Hi!
```

---

## ✅ 8. Classes

Cleaner syntax for creating constructor functions and inheritance.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

const d = new Dog("Rex");
d.speak(); // Rex barks
```

---

## ✅ 9. Promises

Used for asynchronous operations.

```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 1000);
  });
};

fetchData().then(data => console.log(data)); // Done
```

---

## ✅ 10. Modules (`import` / `export`)

Modular code across files.

```js
// user.js
export const name = "Alice";

// app.js
import { name } from './user.js';
console.log(name); // Alice
```

---

## ✅ 11. `for...of` Loop

Iterate over arrays, strings, etc.

```js
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

---

## ✅ 12. `Map` and `Set`

New data structures:

* **Set** = unique values
* **Map** = key-value pairs

```js
const mySet = new Set([1, 2, 2, 3]);
console.log(mySet); // Set(3) {1, 2, 3}

const myMap = new Map();
myMap.set("a", 1);
myMap.set("b", 2);
console.log(myMap.get("a")); // 1
```

---

## ✅ 13. Symbol

A unique, immutable primitive used as object keys.

```js
const sym = Symbol("id");
const user = { [sym]: 123 };
console.log(user[sym]); // 123
```

---

## ✅ Summary Table

| Feature              | Description                                |
| -------------------- | ------------------------------------------ |
| `let`, `const`       | Block-scoped variables                     |
| Arrow Functions      | Short function syntax with lexical `this`  |
| Template Literals    | Backtick strings with interpolation        |
| Default Parameters   | Fallback values for function args          |
| Destructuring        | Unpack from arrays/objects                 |
| Spread & Rest        | Copy, merge, and gather values             |
| Enhanced Object Lit. | Shorter object and method syntax           |
| Classes              | OOP with `class`, `constructor`, `extends` |
| Promises             | Async handling with `.then`/`.catch`       |
| Modules              | `import`/`export` for modular code         |
| `for...of`           | Loop over iterable items                   |
| `Map`, `Set`         | New data structures                        |
| `Symbol`             | Unique object keys                         |

---

Let me know if you want examples with real use cases or a cheatsheet PDF!
