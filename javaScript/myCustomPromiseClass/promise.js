// Custom Promise Implementation
class MyPromise {
  constructor(executor) {
    // Initial state
    this.state = 'pending'; // 'fulfilled' or 'rejected'
    this.value = undefined; // Resolved value
    this.reason = undefined; // Rejection reason
    this.onFulfilledCallbacks = []; // Queue for .then() when resolved
    this.onRejectedCallbacks = [];  // Queue for .catch() when rejected

    // Resolve function to transition from pending to fulfilled
    // defined inside the constructor becase
    /**
     **Reason: `resolve` and `reject` are executor-scoped functions**
    They're intended to be used **only during the execution of the executor function** you pass to the `MyPromise` constructor — and not outside it.---

    ### 🚩 Key Points:

        #### 1. **Encapsulation**
        
          * These functions are private to the constructor scope.
          * They're not exposed as class methods because no external code should be able to call them (only the executor).
        
        #### 2. **Closure Access to `this`**
        
          * The `resolve` and `reject` functions close over `this` (the promise instance), 
          allowing them to mutate `this.state`, `this.value`, etc.
        
        #### 3. **Promise spec behavior**
        
          * In native JavaScript Promises, the `resolve` and `reject` functions passed to the executor are also internal, 
           not methods on the instance.
          * This mirrors that behavior.

    **/
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    };

    // Reject function to transition from pending to rejected
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason));
      }
    };

    // Execute the executor function with resolve and reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err); // Handle synchronous errors
    }
  }

  // then method to handle success and failure cases
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // Handler for success
      const fulfilledHandler = (value) => {
        try {
          const result = onFulfilled ? onFulfilled(value) : value;
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      // Handler for failure
      const rejectedHandler = (reason) => {
        try {
          const result = onRejected ? onRejected(reason) : reject(reason);
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      // Check the state and handle immediately or queue
      if (this.state === 'fulfilled') {
        setTimeout(() => fulfilledHandler(this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => rejectedHandler(this.reason), 0);
      } else {
        this.onFulfilledCallbacks.push(() => setTimeout(() => fulfilledHandler(this.value), 0));
        this.onRejectedCallbacks.push(() => setTimeout(() => rejectedHandler(this.reason), 0));
      }
    });
  }

  // catch method for handling rejection only
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // finally method to run a callback regardless of the outcome
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }

  // Static method to create a resolved promise
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  // Static method to create a rejected promise
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// Example usage:
function fakeAPI(success = true) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("🎉 Data fetched successfully!");
      } else {
        reject("❌ Failed to fetch data.");
      }
    }, 1000);
  });
}

// Using the custom MyPromise to simulate an async API call
fakeAPI(true)
  .then((res) => {
    console.log("1st then:", res); // Should log success message
    return "✔️ Step 2 processing...";
  })
  .then((res2) => {
    console.log("2nd then:", res2); // Logs the return from previous then
  })
  .catch((err) => {
    console.error("Caught error:", err); // Will only run if there's an error
  })
  .finally(() => {
    console.log("🧹 Cleanup: Done (success or fail)"); // Always runs
  });

/*
Expected Output:

1st then: 🎉 Data fetched successfully!
2nd then: ✔️ Step 2 processing...
🧹 Cleanup: Done (success or fail)
*/
