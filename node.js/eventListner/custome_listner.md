### 📌 What is an Event Listener in Node.js?

In **Node.js**, an **event listener** is a function that waits for a specific **event** to happen, and **responds** when it does.

Node.js is **event-driven**, meaning it uses the **Observer pattern** — you can "listen" to named events and respond when they're emitted.

Under the hood, this is powered by the `EventEmitter` class from the `events` module.

---

## ✅ Example using Node.js built-in `events` module:

```js
const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Register an event listener for the 'greet' event
myEmitter.on('greet', () => {
  console.log('Hello, welcome!');
});

// Emit (trigger) the 'greet' event
myEmitter.emit('greet');
```

### 🧠 Output:

```
Hello, welcome!
```

---

## 🧠 Explanation:

| Line                                      | Explanation                                                           |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `const EventEmitter = require('events');` | Import the built-in `events` module.                                  |
| `const myEmitter = new EventEmitter();`   | Create an instance (object) of the `EventEmitter` class.              |
| `myEmitter.on('greet', () => { ... });`   | Register a **listener** for a custom event called `'greet'`.          |
| `myEmitter.emit('greet');`                | Emit (trigger) the `'greet'` event, which runs the listener function. |

---

## 🛠️ Custom Event Listener (from scratch without using `events` module)

### ✅ Custom EventEmitter:

```js
// 1. Create custom EventEmitter class
class MyEventEmitter {
  constructor() {
    this.events = {};  // Holds event names and their listeners
  }

  // 2. Register an event listener
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];  // Create array if not present
    }
    this.events[eventName].push(listener); // Add listener
  }

  // 3. Emit (trigger) the event
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args); // Call each listener
      });
    }
  }
}
```

### ✅ Usage Example:

```js
// Create instance of custom emitter
const myEmitter = new MyEventEmitter();

// Register an event listener
myEmitter.on('sayHello', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the event with argument
myEmitter.emit('sayHello', 'Mohit');
```

### 🧠 Output:

```
Hello, Mohit!
```

---

## 🔍 Line-by-line Explanation:

### Custom Class:

```js
class MyEventEmitter {
  constructor() {
    this.events = {}; // Object to store event names and their listeners
  }
```

* We define a class with a constructor that initializes an empty object `events`.

```js
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }
```

* `on()` is used to register a listener for a specific event.
* If the event doesn't exist, it creates an array for it.
* Then, it pushes the listener into the array.

```js
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }
```

* `emit()` triggers the event.
* It checks if the event exists and then calls each listener attached to that event.
* It also supports passing arguments (`...args`) to the listener.

---

## ✅ Add `once()` and `off()` Methods

### Final Version:

```js
class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(listener => listener !== listenerToRemove);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }
}
```

### Usage:

```js
const myEmitter = new MyEventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

function oneTimeMessage(name) {
  console.log(`This runs only once for ${name}.`);
}

myEmitter.on('sayHello', greet);
myEmitter.once('sayHello', oneTimeMessage);

myEmitter.emit('sayHello', 'Mohit');
myEmitter.emit('sayHello', 'Mohit');
myEmitter.off('sayHello', greet);
myEmitter.emit('sayHello', 'Mohit');
```

### 🧠 Output:

```
Hello, Mohit!
This runs only once for Mohit.
Hello, Mohit!
```

---

## 🧠 Summary Table

| Method   | Description                                 |
| -------- | ------------------------------------------- |
| `on()`   | Add a listener that can run many times.     |
| `once()` | Add a listener that runs only **once**.     |
| `emit()` | Trigger all listeners for a specific event. |
| `off()`  | Remove a specific listener from an event.   |
