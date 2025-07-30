## 📘 JavaScript: Execution Context vs Scope vs Lexical Scope vs Closure

---

### 🔹 1. Execution Context

#### ➤ Definition:

An **Execution Context** is the environment in which JavaScript code runs. Every time code runs, it's inside an execution context.

#### ✅ Types:

1. **Global Execution Context (GEC)** – created by default when JS starts.
2. **Function Execution Context (FEC)** – created every time a function is called.
3. **Eval Execution Context** – from `eval()` (rarely used).

#### ✅ Phases:

* **Creation Phase:**

  * Creates `Variable Object`, `Scope Chain`, and `this` binding.
  * Hoisting of functions and variables (`var`).
* **Execution Phase:**

  * Code runs line by line. Variables get assigned.

#### 🧠 Example:

```js
var x = 10;
function show() {
  var y = 20;
  console.log(x + y);
}
show();
```

---

### 🔹 2. Scope

#### ➤ Definition:

**Scope** determines variable visibility — where a variable can be accessed.

In JavaScript, there are **five main types of scopes**, each defining how and where variables can be accessed:

---

## ✅ 1. **Global Scope**

* Variables declared **outside any function or block**.
* Accessible **anywhere** in the code.

```js
let x = 10; // Global scope

function show() {
  console.log(x); // Accessible here
}
```

---

## ✅ 2. **Function Scope**

* Variables declared **inside a function** using `var`, `let`, or `const` are accessible **only within that function**.

```js
function test() {
  let a = 5; // Function scope
  console.log(a);
}
console.log(a); // ❌ Error: a is not defined
```

---

## ✅ 3. **Block Scope**

* Introduced with `let` and `const` (not `var`).
* Any variable declared inside `{}` is **limited to that block**.

```js
if (true) {
  let msg = "hello"; // Block scope
}
console.log(msg); // ❌ Error
```

> `var` is **not block-scoped**, which often causes confusion.

---

## ✅ 4. **Lexical Scope** (Static Scope)

* Scope defined by **where variables and functions are written** in the code.
* Functions have access to variables in their **outer lexical scope**.

```js
function outer() {
  let x = "outer";
  function inner() {
    console.log(x); // Lexical access to x
  }
  inner();
}
```

> This is what enables **closures** in JavaScript.

---

## ✅ 5. **Module Scope** (in ES6 Modules)

* Each **ES6 module** has its **own scope**.
* Variables declared in a module aren't accessible in other modules unless **explicitly exported/imported**.

```js
// file1.js
let secret = "hidden"; // Module scope
export const visible = "shown";

// file2.js
import { visible } from './file1.js';
console.log(visible); // OK
console.log(secret);  // ❌ Error
```

---

### 🧠 Bonus: **Script Scope** (Browser-only)

* In browsers, `<script>` tags without `type="module"` share the **same global scope**.
* Variables declared in one `<script>` are accessible in another.

---

## 🔁 Summary Table

| Scope Type | Where it's used                  | Visibility                                 |
| ---------- | -------------------------------- | ------------------------------------------ |
| Global     | Outside all functions/blocks     | Everywhere                                 |
| Function   | Inside a function                | Only inside that function                  |
| Block      | Inside `{}` with `let`/`const`   | Only inside that block                     |
| Lexical    | Defined by source code structure | Functions access variables in outer scopes |
| Module     | Inside ES6 module files          | Only in the module unless exported         |

---

Let me know if you'd like a **visual scope chain diagram** or a quiz to test this understanding!

   

#### 🧠 Example:

```js
let a = 10;
function test() {
  let b = 20;
  if (true) {
    let c = 30;
    console.log(a, b, c); // All accessible
  }
  // console.log(c); // Error: c is block-scoped
}
```

---

### 🔹 3. Lexical Scope

#### ➤ Definition:

**Lexical Scope** means scope is determined by the position of code **in the source**. Inner functions have access to their outer scope.\

🔍 So, Why "Lexical Scope"?\
Lexical scope means that scope is determined by the position of code in the source file — i.e., where functions and blocks are written (at coding time), not where they are called (at runtime).

#### 🧠 Example:

```js
function outer() {
  let a = 'outer';
  function inner() {
    console.log(a);
  }
  inner();
}
outer();
```

---

### 🔹 4. Closures

#### ➤ Definition:
A closure is created when a function is defined inside another function and accesses variables from the outer function.

A **closure** is created when a function "remembers" variables from its **lexical scope**, even after the outer function has finished.\
🧠 Key Points:\
A closure gives you access to an outer function’s scope from an inner function.

Closures are created every time a function is created, at function creation time.
#### 🧠 Example:

```js
function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    console.log(counter);
  }
}
const inc = outer();
inc(); // 1
inc(); // 2
```

#### 🔁 Closure Use Cases:

* Data privacy (private variables)
* Function factories
* Memoization / caching
* Event handlers

---

### 🔁 Summary Table

| Concept           | What it is                             | Created When                    | Key Feature                       |
| ----------------- | -------------------------------------- | ------------------------------- | --------------------------------- |
| Execution Context | Code execution environment             | On code/function run            | Contains scope chain, VO, this    |
| Scope             | Variable accessibility                 | At variable declaration         | Function, block, or global scoped |
| Lexical Scope     | Scope based on code position           | At writing time                 | Inner functions access outer vars |
| Closure           | Function retains access to outer scope | When inner function is returned | Keeps outer variables alive       |
