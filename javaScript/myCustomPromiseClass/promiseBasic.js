// STEP-BY-STEP EXPLANATION

// 1. Constructor: Initializes the promise
// - Sets state to 'pending'
// - Defines resolve and reject functions (accessible only inside)
// - Executes the executor function immediately

class MyPromise {
  constructor(executor) {
    this.state = 'pending';           // Tracks current state: pending/fulfilled/rejected
    this.value = undefined;          // Stores fulfilled value
    this.reason = undefined;         // Stores rejection reason
    this.onFulfilledCallbacks = [];  // Queued success handlers
    this.onRejectedCallbacks = [];   // Queued failure handlers
    this.onFinallyCallbacks = [];    // Queued finally handlers

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value)); // Run .then() handlers
        this.onFinallyCallbacks.forEach(fn => fn());        // Run .finally() handlers
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason)); // Run rejection handlers
        this.onFinallyCallbacks.forEach(fn => fn());         // Run .finally() handlers
      }
    };

    try {
      executor(resolve, reject); // Runs user-provided executor function
    } catch (err) {
      reject(err); // Reject if executor throws an error
    }
  }

  // 2. then(): Handles fulfilled and rejected values
  // - Returns a new promise to support chaining
  // - Calls handlers immediately if already settled
  // - Queues them otherwise
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilledHandler = (value) => {
        try {
          const result = onFulfilled ? onFulfilled(value) : value;
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      const rejectedHandler = (reason) => {
        try {
          if (onRejected) {
            const result = onRejected(reason);
            result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
          } else {
            reject(reason); // forward error
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled') {
        setTimeout(() => fulfilledHandler(this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => rejectedHandler(this.reason), 0);
      } else {
        this.onFulfilledCallbacks.push(() => setTimeout(() => fulfilledHandler(this.value), 0));v// if we rite multple line p.then,p.then like that
        this.onRejectedCallbacks.push(() => setTimeout(() => rejectedHandler(this.reason), 0));
      }
    });
  }
  catch(onRejected) {
  return this.then(null, onRejected);
}
  // 3. finally(): Always runs regardless of resolve/reject
  // - Doesn’t change result
  // - Useful for cleanup
  finally(onFinally) {
    return this.then(
      value => {
        onFinally?.();
        return value; // Pass the value along
      },
      reason => {
        onFinally?.();
        throw reason; // Re-throw error for next .catch()
      }
    );
  }
}


// 📖 Step-by-Step Explanation

// 🎬 constructor(executor)
// Sets initial state:
// - pending → not resolved yet
// - fulfilled → resolve() was called
// - rejected → reject() was called

// Defines resolve(value):
// - Changes state to 'fulfilled'
// - Saves the value
// - Calls every function in onFulfilledCallbacks
// - Calls any .finally() callbacks

// Defines reject(reason):
// - Changes state to 'rejected'
// - Saves the reason
// - Calls every function in onRejectedCallbacks
// - Calls any .finally() callbacks

// Executes executor(resolve, reject) immediately like a native Promise


// 📦 .then(onFulfilled, onRejected)
// Returns a new MyPromise (promise chaining support)
// If the original promise is already settled:
// - Runs onFulfilled or onRejected asynchronously
// If still pending, pushes handlers to be run later
// Handles returned values or errors
// Supports:
// - Chaining: then(...).then(...)
// - Promises returned inside .then(...)


// 🧹 .finally(callback)
// Adds a cleanup function that runs on both success and failure
// Does not change the value or reason
// Internally uses .then(...) to hook into the result


// ⚙️ Why resolve() and reject() are inside constructor?
// - To keep them private
// - They must access this.state, this.value, etc.
// - Prevents external code from calling .resolve() on any promise instance


// 🔄 Timeline Example
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("🎉 Done!");
//   }, 1000);
// });

// p.then(result => {
//   console.log("✅ Got:", result);
// }).finally(() => {
//   console.log("🧹 Cleanup");
// });

// What happens:
// - p is created → state is 'pending'
// - After 1 sec → resolve("🎉 Done!")
// - state → 'fulfilled'
// - .then(...) runs: logs "✅ Got: 🎉 Done!"
// - .finally() runs: logs "🧹 Cleanup"


// ✅ Summary Table (Markdown Format)
//
// | Feature          | What it does                              |
// | ---------------- | ----------------------------------------- |
// | `this.state`     | Tracks the status of the promise          |
// | `this.value`     | Holds resolved value                      |
// | `this.reason`    | Holds rejection reason                    |
// | `.then()`        | Adds success and failure handlers         |
// | `.finally()`     | Adds a cleanup function                   |
// | `resolve(value)` | Marks fulfilled and runs success handlers |
// | `reject(reason)` | Marks rejected and runs error handlers    |
// | `.forEach(fn)`   | Executes all saved callbacks with result  |
// | Feature          | What it does                              |
// | ---------------- | ----------------------------------------- |
// | `this.state`     | Tracks the status of the promise          |
// | `this.value`     | Holds resolved value                      |
// | `this.reason`    | Holds rejection reason                    |
// | `.then()`        | Adds success and failure handlers         |
// | `.finally()`     | Adds a cleanup function                   |
// | `resolve(value)` | Marks fulfilled and runs success handlers |
// | `reject(reason)` | Marks rejected and runs error handlers    |
// | `.forEach(fn)`   | Executes all saved callbacks with result  |
// this.state     | Tracks the status of the promise
// this.value     | Holds resolved value
// this.reason    | Holds rejection reason
