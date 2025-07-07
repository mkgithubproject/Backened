## Custom MyPromise `.then()` Execution Flow (Line-by-Line)

### ✅ Example Code

```js
new MyPromise((resolve, reject) => {
  console.log("1️⃣ Executor running");
  resolve("✅ First value");
})
  .then((res) => {
    console.log("2️⃣ First then:", res);
    return "➡️ From first then";
  })
  .then((res2) => {
    console.log("3️⃣ Second then:", res2);
  });
```

---

### 📘 Step-by-Step Execution

#### **Step 1: Promise Instantiation**

* `new MyPromise(...)` is called.
* Constructor runs:

  * Initializes `state = 'pending'`
  * `value = undefined`
  * Executes the `executor` function.
* Logs: `1️⃣ Executor running`
* Calls `resolve("✅ First value")`

#### **Step 2: `resolve` is triggered**

* Updates `this.state = 'fulfilled'`
* Sets `this.value = '✅ First value'`
* Executes any queued `onFulfilledCallbacks` (none yet).

#### **Step 3: First `.then()` is attached**

* Calls `then()` on the resolved promise.
* A new `MyPromise` is returned.
* Since `this.state === 'fulfilled'`, it schedules:

  ```js
  setTimeout(() => fulfilledHandler(this.value), 0);
  ```

#### **Step 4: First `fulfilledHandler` runs**

* Executes: `fulfilledHandler("✅ First value")`
* Calls the user's `onFulfilled`:

  ```js
  console.log("2️⃣ First then:", res);
  return "➡️ From first then";
  ```
* Logs: `2️⃣ First then: ✅ First value`
* Returns a non-promise value → resolve next chained promise with `'➡️ From first then'`

#### **Step 5: Second `.then()` is attached**

* Called on promise already resolved with `'➡️ From first then'`
* Schedules its handler:

  ```js
  setTimeout(() => fulfilledHandler(this.value), 0);
  ```

#### **Step 6: Second `fulfilledHandler` runs**

* Executes: `fulfilledHandler("➡️ From first then")`
* Logs: `3️⃣ Second then: ➡️ From first then`

---

### 🧾 Final Console Output:

```
1️⃣ Executor running
2️⃣ First then: ✅ First value
3️⃣ Second then: ➡️ From first then
```

---

### 🧠 Key Concepts

| Concept              | Explanation                                       |
| -------------------- | ------------------------------------------------- |
| `executor()`         | Runs immediately during instantiation             |
| `.then()`            | Always returns a **new** `MyPromise`              |
| `setTimeout(..., 0)` | Ensures async behavior per spec                   |
| Returned value       | If it's a promise, wait on it; else pass it along |
| Callback queues      | Stored during pending state, called on resolution |

---

### 🧠 Microtask Analogy (Simplified)

* JavaScript ensures `.then()` callbacks run *after* synchronous code, even if already fulfilled.
* You simulate this behavior using `setTimeout(..., 0)` to mimic microtasks.

---

### 🔍 Deep Dive into `fulfilledHandler`

```js
const fulfilledHandler = (value) => {
  try {
    const result = onFulfilled ? onFulfilled(value) : value;
    result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
  } catch (err) {
    reject(err);
  }
};
```

**What it does:**

* Runs when the previous promise is **fulfilled**.
* Tries to execute the user’s success handler (`onFulfilled`).
* Handles the **result**:

  * If it's another `MyPromise`, it **waits** for it to finish (`.then(resolve, reject)`).
  * If it's a normal value, it **immediately resolves** the next promise in the chain.
* If an error is thrown, it **rejects the next promise**.

**Line-by-Line Breakdown:**

| Line                                                                | Purpose                                                                 |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `const result = onFulfilled ? onFulfilled(value) : value;`          | Call user’s handler if it exists, else just forward the value           |
| `result instanceof MyPromise ? result.then(...) : resolve(result);` | Support chaining: wait if it's a promise, resolve immediately if not    |
| `catch (err)`                                                       | Catches any error thrown in user's handler and rejects the next promise |

**Example:**

```js
MyPromise.resolve(5)
  .then(val => val + 10)                    // result = 15
  .then(val => new MyPromise(r => r(val))) // result = MyPromise(15)
  .then(console.log);                      // logs: 15
```

---

### 🔍 Deep Dive into `rejectedHandler`

```js
const rejectedHandler = (reason) => {
  try {
    const result = onRejected ? onRejected(reason) : reject(reason);
    result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
  } catch (err) {
    reject(err);
  }
};
```

**What it does:**

* Runs when the previous promise is **rejected**.
* Tries to execute the user’s failure handler (`onRejected`).
* If the user **did not provide** a rejection handler, the rejection is passed down.
* If the handler returns:

  * a promise → it’s chained using `.then(resolve, reject)`
  * a value → resolve the next promise with it
* If the handler throws → reject the next promise

**Key Points:**

| Line                                               | Purpose                                      |
| -------------------------------------------------- | -------------------------------------------- |
| `onRejected ? onRejected(reason) : reject(reason)` | Call user's handler or forward the rejection |
| `result instanceof MyPromise`                      | If it's a promise, wait on it                |
| `resolve(result)`                                  | Otherwise, resolve next promise              |
| `catch (err)`                                      | Rejects next promise if any error is thrown  |

**Example:**

```js
MyPromise.reject("fail")
  .then(null, (err) => {
    console.log("Caught:", err);
    return "Recovered";
  })
  .then(res => console.log("Next:", res));

// Output:
// Caught: fail
// Next: Recovered
```

---

### 🔍 Deep Dive into `.catch()` and `.finally()`

#### `.catch()`

```js
catch(onRejected) {
  return this.then(null, onRejected);
}
```

* It’s just **syntactic sugar** for `.then(null, onRejected)`.
* Useful for **error-only** handling.

#### `.finally()`

```js
finally(callback) {
  return this.then(
    value => MyPromise.resolve(callback()).then(() => value),
    reason => MyPromise.resolve(callback()).then(() => { throw reason })
  );
}
```

* Runs `callback` regardless of success or failure.
* Converts its result to a promise (if it isn’t already).
* After the callback finishes:

  * If original was successful → resolves with original value
  * If original failed → rethrows the original error

**Example:**

```js
MyPromise.resolve("data")
  .finally(() => console.log("Cleanup"))
  .then(res => console.log("Success:", res));

// Output:
// Cleanup
// Success: data
```

---

Let me know if you'd like to dive into promise chaining, unhandled rejections, or building `all`, `race`, `allSettled`, etc.!
