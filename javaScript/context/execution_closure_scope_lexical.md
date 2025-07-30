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

#### ✅ Types:

1. **Global Scope** – accessible anywhere.
2. **Function Scope** – accessible only within that function.
3. **Block Scope** – `let` and `const` inside `{}`.

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

**Lexical Scope** means scope is determined by the position of code **in the source**. Inner functions have access to their outer scope.

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

A **closure** is created when a function "remembers" variables from its **lexical scope**, even after the outer function has finished.

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
