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
