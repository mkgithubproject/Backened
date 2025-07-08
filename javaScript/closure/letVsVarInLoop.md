# JavaScript Closures in setTimeout Explained with Example

## ✅ Code Example

```js
const fun = () => {
    for (let i = 0; i <= 3; i++) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    }
}
fun();
```

## ❓ Question

> After setTimeout, the callback goes to Web API. When it returns after 1000ms, the function that created `i` is gone. So why is `i` still remembered?

---

## ✅ Short Answer:

Because of **closure**, the JavaScript engine keeps the variable `i` alive in memory **only because** it’s still **being used** by the callback function passed to `setTimeout`.

---

## 🔍 What is a Closure?

> A **closure** is when a function remembers the variables from the scope in which it was created, even after that scope has gone.

In our case:

* The arrow function `() => console.log(i)` was created in the loop.
* It **closes over** the variable `i`.
* So it remembers `i` even after `fun()` is finished.

---

## 🔄 Loop Execution Details

### Iteration 1 (i = 0):

```js
{
    let i = 0;
    setTimeout(() => console.log(i), 1000);
}
```

Closure is created with scope: `{ i: 0 }`

### Iteration 2 (i = 1): Closure captures `{ i: 1 }`

### Iteration 3 (i = 2): Closure captures `{ i: 2 }`

### Iteration 4 (i = 3): Closure captures `{ i: 3 }`

Each closure is stored by `setTimeout`, and those closures are holding onto their respective `i` values.

---

## 📦 In Web API Memory

Each `setTimeout` call stores:

```js
setTimeout(
  fn_with_closure: {
    code: () => console.log(i),
    remembered_scope: { i: <value> }
  },
  1000
);
```

---

## 🧠 Why `i` is Still in Memory

1. When `fun()` runs, it creates closures in each loop.
2. These closures are passed to `setTimeout`, and stored in Web API.
3. Even when `fun()` returns, the closures **still exist** and **hold references to `i`**.
4. So JavaScript **keeps `i` alive** in memory.
5. After 1000ms, the callbacks go to the queue, then into the stack.
6. Each logs its own `i` (0, 1, 2, 3).
7. After execution, closures and `i` references are garbage collected.

---

## 🎒 Think of Closures Like Backpacks

Each `setTimeout` callback is carrying a "backpack" of variables:

```js
() => console.log(i)
// Backpack: { i = 0 }
```

---

## 🧼 Garbage Collection

* JavaScript waits to free memory **until the closure is no longer needed**.
* Once the `setTimeout` callback executes, and no reference to `i` remains → garbage collected.

---

## 🧪 Summary Table

| Concept              | Explanation                                                  |
| -------------------- | ------------------------------------------------------------ |
| Closure              | Function remembers variables it used from its creation scope |
| Why `i` is preserved | Because it's closed over by the arrow function               |
| Memory cleanup       | Happens after callback finishes and no references exist      |

---

## ✅ Key Takeaway

Closures are why functions in JavaScript can access the right variables even **after the outer function is done running**. The engine keeps those variables in memory **only as long as they are needed** by the inner function.
