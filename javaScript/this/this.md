# JavaScript Deep Dive: `this` Keyword & Scope

## 🔍 What is `this`?

* `this` refers to the **execution context**.
* It depends on **how a function is called**, not where it's defined.

## 📦 Lexical Scope vs `this` Context

| Concept | Bound At            | Refers To                          |
| ------- | ------------------- | ---------------------------------- |
| Scope   | Function Definition | Variable Access Context            |
| `this`  | Function Invocation | Calling Object / Execution Context |

## 🔁 `this` Binding Rules

### 📌 1. Default Binding

```js
function show() {
  console.log(this);
}

show(); // window (non-strict), undefined (strict)
```

### 📌 2. Implicit Binding

```js
const user = {
  name: "Mohit",
  greet() {
    console.log(this.name);
  },
};

user.greet(); // "Mohit"
```

### 📌 3. Explicit Binding

```js
function greet() {
  console.log(this.name);
}

const person = { name: "Mohit" };
greet.call(person);  // "Mohit"
greet.apply(person); // "Mohit"
const boundGreet = greet.bind(person);
boundGreet();        // "Mohit"
```

### 📌 4. New Binding (Constructor)

```js
function Person(name) {
  this.name = name;
}

const p = new Person("Mohit");
console.log(p.name); // "Mohit"
```

## 🧠 Arrow Functions and Lexical `this`

```js
const obj = {
  value: 10,
  regular: function () {
    return () => {
      console.log(this.value);
    };
  },
};

const arrowFn = obj.regular();
arrowFn(); // 10
```

## 🌀 Losing `this`

```js
const obj = {
  value: 42,
  getValue() {
    return this.value;
  }
};

const fn = obj.getValue;
console.log(fn()); // undefined

const boundFn = obj.getValue.bind(obj);
console.log(boundFn()); // 42

if i do this\
const fn = obj.getValue()
console.log(fn); // will get 42 because obj is caller then this refer to that object before this refer to window and there is now value
inside window
```

## 🔍 `this` in Classes

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}

const p = new Person("Mohit");
p.greet(); // "Mohit"
```

### Arrow Function in Class

```js
class Timer {
  constructor() {
    this.seconds = 0;
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}
```

## 🔄 `this` in Event Listeners

```js
const btn = document.querySelector("button");

btn.addEventListener("click", function () {
  console.log(this); // button
});

btn.addEventListener("click", () => {
  console.log(this); // lexical scope (likely window)
});
```

## 🧪 Closures + `this` Pitfall

```js
function Counter() {
  this.count = 0;
  setInterval(function () {
    this.count++; // wrong `this`
    console.log(this.count);
  }, 1000);
}

new Counter(); // NaN or undefined
```

✅ **Fix with Arrow Function**

```js
function Counter() {
  this.count = 0;
  setInterval(() => {
    this.count++;
    console.log(this.count);
  }, 1000);
}
```

## 🧰 Summary Cheatsheet

| How function is called          | What `this` refers to           |
| ------------------------------- | ------------------------------- |
| Regular function (non-strict)   | `window`                        |
| Regular function (strict)       | `undefined`                     |
| Method on object                | The object                      |
| Arrow function                  | Lexical scope                   |
| Constructor (`new`)             | New instance                    |
| `call`, `apply`, `bind`         | Explicit object                 |
| Event listener (function)       | Event target (e.g. button)      |
| Event listener (arrow function) | Lexical scope (likely `window`) |

You're absolutely right — this is one of **JavaScript's most confusing topics**: the behavior of `this` in **regular functions vs arrow functions**.

Let’s **break it down visually and clearly** so it becomes crystal clear.

---

## ✅ Case 1: Regular Function Returning Arrow Function

```js
const obj = {
  value: 10,
  regular: function () {
    return () => {
      console.log(this.value);
    };
  },
};

const arrowFn = obj.regular(); // this === obj
arrowFn(); // 🔥 10
```

### 🔍 Step-by-Step:

* `obj.regular()` is a **regular function call**, so:

  * `this` inside `regular` === `obj`
* Then it returns an **arrow function**, which **captures** `this` from the surrounding context.

  * So the arrow function’s `this` is also `obj`
* When `arrowFn()` is called later, it uses the captured `this`, not the caller’s.

✅ **Output**: `10`

---

## ❌ Case 2: Arrow Function as a Method

```js
const obj = {
  value: 10,
  regular: () => {
    console.log(this.value);
  },
};

obj.regular(); // ❌ undefined
```

### 🔍 What Happens:

* `regular` is defined as an **arrow function**
* Arrow functions **do NOT get their own `this`**.
* They inherit `this` from where they were **defined**, not from where they are **called**.

In this case:

* The arrow function was defined in the **global scope** (outside of any object)
* So `this` refers to:

  * `window` in browsers (if not in strict mode)
  * `undefined` in strict mode / Node.js

Since `this` is **not `obj`**, `this.value` is `undefined`.

❌ **Output**: `undefined`

---

## 🔁 Visual Summary Table

| Code Location                     | Function Type    | `this` Value     | Output      |
| --------------------------------- | ---------------- | ---------------- | ----------- |
| `obj.regular()` (Case 1)          | Regular Function | `obj`            | `10`        |
| Arrow returned inside `regular()` | Arrow Function   | `obj` (captured) | `10`        |
| `obj.regular()` (Case 2)          | Arrow Function   | Not `obj`        | `undefined` |

### lexical scope , checking , local scope/ function or global scope , so check these scope for lexical

---

## 🧠 Golden Rules for `this`

1. **Regular functions** get `this` based on **how they are called**.
2. **Arrow functions** get `this` based on **where they are defined**.

---

## 💡 Tips

* ✅ Use **regular functions** for object methods if you want to access `this` as the object.
* ❌ Don’t use arrow functions for methods where `this` matters.

---

Let me know if you’d like this explained with a **diagram**, **animations**, or **in Hindi**, if that helps!

