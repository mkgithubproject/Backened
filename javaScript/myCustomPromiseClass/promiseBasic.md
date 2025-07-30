Let’s create a **custom Promise** from scratch in a **very simple way** with **line-by-line explanation**, using a **real-world example**: *ordering food online*.

---

## 🥡 Real-world Example: Food Order System

We’ll simulate ordering food using a custom-built `MyPromise` class that behaves like the native JavaScript `Promise`.

---

## ✅ Final Output Usage (Before Diving In)

```js
const order = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const foodReady = true;
    if (foodReady) {
      resolve("🍕 Pizza is ready!");
    } else {
      reject("❌ Food not available");
    }
  }, 1000);
});

order.then((message) => {
  console.log("SUCCESS:", message);
}).catch((error) => {
  console.log("FAIL:", error);
});
```

Now let's build `MyPromise` line by line 👇

---

## 🔧 Step-by-Step Implementation

```js
class MyPromise {
  constructor(executor) {
```

* `MyPromise` is a class, just like native `Promise`.
* It takes a function called `executor(resolve, reject)` as an argument. This function has your async logic.

---

```js
    this.status = "pending";  // "pending", "fulfilled", or "rejected"
    this.value = undefined;   // stores result of resolve/reject
    this.successCallback = null;
    this.failureCallback = null;
```

* `status` tracks the current state of the promise.
* `value` stores the resolved or rejected value.
* Callbacks are stored to call later when the promise resolves or rejects.

---

```js
    const resolve = (value) => {
      if (this.status !== "pending") return; // can’t change state again
      this.status = "fulfilled";
      this.value = value;
      if (this.successCallback) {
        this.successCallback(value);
      }
    };
```

* `resolve` changes the status to `"fulfilled"` and stores the value.
* If `.then()` was called earlier, we run the stored success callback.

---

```js
    const reject = (reason) => {
      if (this.status !== "pending") return;
      this.status = "rejected";
      this.value = reason;
      if (this.failureCallback) {
        this.failureCallback(reason);
      }
    };
```

* Same as `resolve`, but for rejection.

---

```js
    try {
      executor(resolve, reject); // run the user-provided async function
    } catch (err) {
      reject(err); // if error happens, treat it as rejection
    }
  }
```

* Wrap `executor` in a try-catch in case it throws errors synchronously.

---

### ✅ Implement `.then()` and `.catch()` Methods

```js
  then(callback) {
    if (this.status === "fulfilled") {
      callback(this.value); // already resolved? just call it
    } else {
      this.successCallback = callback; // else store for later
    }
    return this; // so we can chain
  }

  catch(callback) {
    if (this.status === "rejected") {
      callback(this.value); // already rejected? just call it
    } else {
      this.failureCallback = callback; // else store for later
    }
    return this; // so we can chain
  }
}
```

---

## 📦 Final Complete Code

```js
class MyPromise {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.successCallback = null;
    this.failureCallback = null;

    const resolve = (value) => {
      if (this.status !== "pending") return;
      this.status = "fulfilled";
      this.value = value;
      if (this.successCallback) {
        this.successCallback(value);
      }
    };

    const reject = (reason) => {
      if (this.status !== "pending") return;
      this.status = "rejected";
      this.value = reason;
      if (this.failureCallback) {
        this.failureCallback(reason);
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(callback) {
    if (this.status === "fulfilled") {
      callback(this.value);
    } else {
      this.successCallback = callback;
    }
    return this;
  }

  catch(callback) {
    if (this.status === "rejected") {
      callback(this.value);
    } else {
      this.failureCallback = callback;
    }
    return this;
  }
}
```

---

## 🧪 Test With Real Example

```js
const order = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const foodReady = true;
    if (foodReady) {
      resolve("🍕 Pizza is ready!");
    } else {
      reject("❌ Food not available");
    }
  }, 1000);
});

order
  .then((message) => {
    console.log("SUCCESS:", message);
  })
  .catch((error) => {
    console.log("FAIL:", error);
  });
```

---

## 🧠 Summary

| Concept     | Meaning                                     |
| ----------- | ------------------------------------------- |
| `executor`  | Your async logic (like fetching or timeout) |
| `resolve()` | Marks the promise as success                |
| `reject()`  | Marks the promise as failure                |
| `then()`    | Runs on success                             |
| `catch()`   | Runs on failure                             |

---

Great! Let’s walk through how your `MyPromise` example executes **step-by-step**, including the **execution stack**, **event loop**, and **callback queue** — just like a browser or Node.js would process it.

---

## ✅ Your Code:

```js
const order = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const foodReady = true;
    if (foodReady) {
      resolve("🍕 Pizza is ready!");
    } else {
      reject("❌ Food not available");
    }
  }, 1000);
});

order
  .then((message) => {
    console.log("SUCCESS:", message);
  })
  .catch((error) => {
    console.log("FAIL:", error);
  });
```

---

## 🧠 Step-by-Step Execution with Stack & Queue

---

### 🟩 **1. Main Script Starts Running (Synchronous)**

| Call Stack |
| ---------- |
| `main()`   |

* Creates a new `MyPromise` instance: `new MyPromise(...)`
* Enters the constructor.
* Sets `status = "pending"`, stores initial values.
* Defines `resolve` and `reject`.
* Executes the **executor** function.

---

### 🟩 **2. Inside the Executor Function**

| Call Stack                |
| ------------------------- |
| `MyPromise.constructor()` |
| `executor()`              |

* Calls `setTimeout(() => { ... }, 1000)`
* This is registered as a **timer** with the browser/Node.js.
* Then the executor function **finishes**.

🧵 The timeout's callback goes to the **Web APIs** (or timer system) and waits 1 second.

---

### ✅ Stack Now Empty

| Call Stack | Event Loop | Callback Queue | Microtask Queue |
| ---------- | ---------- | -------------- | --------------- |
| (empty)    | ⏳ waits    |                |                 |

---

### 🟩 **3. `.then()` and `.catch()` Registration**

* `order.then(...)` is called:

  * Since promise is still `pending`, it **stores the success callback** inside `this.successCallback`.

* `order.catch(...)` is called:

  * Stores the failure callback inside `this.failureCallback`.

At this point:

* `this.status = "pending"`
* `this.successCallback = (message) => console.log(...)`
* `this.failureCallback = (error) => console.log(...)`

---

### 🟡 **4. After 1 second: `setTimeout` callback fires**

* The timer finishes.
* Its callback (with `resolve("🍕 Pizza is ready!")`) is pushed to the **callback queue**.

| Call Stack | Event Loop checks | Callback Queue                    | Microtask Queue |
| ---------- | ----------------- | --------------------------------- | --------------- |
| (empty)    | ✅ queue not empty | `() => resolve("Pizza is ready")` |                 |

* Event loop picks it up and pushes it to the call stack.

---

### 🟩 **5. `resolve()` is executed**

| Call Stack  |
| ----------- |
| `resolve()` |

* Checks: `status === "pending"` ✅
* Sets:

  * `this.status = "fulfilled"`
  * `this.value = "🍕 Pizza is ready!"`
* Calls `this.successCallback(this.value)` since it was already stored.

---

### 🟩 **6. Success Callback Runs**

| Call Stack                     |
| ------------------------------ |
| `successCallback()`            |
| `console.log("SUCCESS:", msg)` |

* Prints:

```
SUCCESS: 🍕 Pizza is ready!
```

---

## 📊 Final Summary Table:

| Phase                         | Description                                |
| ----------------------------- | ------------------------------------------ |
| Constructor runs              | Registers callbacks, sets up promise state |
| `setTimeout` fires (1s later) | Calls `resolve()` with the message         |
| `.then()` callback is called  | Success message is printed                 |

---

## 🧠 TL;DR: Execution Flow

1. JS engine hits `new MyPromise(...)`
2. Timer starts (1s)
3. `.then()` and `.catch()` callbacks are stored (but not run yet)
4. After 1s, timer completes → calls `resolve(...)`
5. Promise is fulfilled → success callback runs → logs the message

---

Let me know if you'd like a **visual timeline/diagram** of the call stack, queue, and event loop for this example — I can generate that too!

