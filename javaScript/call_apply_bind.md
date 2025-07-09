## 🔧 `call()`, `apply()`, and `bind()` in JavaScript

In JavaScript, these methods allow you to **manually set the `this` context** of a function.

---

### 🔹 `call()` – Call with explicit `this` and arguments

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Mohit" };

greet.call(person, "Hello", "!"); // Hello, Mohit!
```

✅ **Syntax**: `func.call(thisArg, arg1, arg2, ...)`
🔸 Invokes immediately with arguments as comma-separated list.

---

### 🔹 `apply()` – Like `call()`, but with array of arguments

```js
greet.apply(person, ["Hi", "!!"]); // Hi, Mohit!!
```

✅ **Syntax**: `func.apply(thisArg, [argsArray])`
🔸 Invokes immediately with arguments passed as an array.

---

### 🔹 `bind()` – Returns a new function with bound `this`

```js
const greetMohit = greet.bind(person, "Hey", "!!!");

greetMohit(); // Hey, Mohit!!!
```

✅ **Syntax**: `func.bind(thisArg, arg1, arg2, ...)`
🔸 Does **not** invoke immediately. Useful for **callbacks**, **event handlers**, etc.

---

### 💡 Practical Example – Method Borrowing

```js
const user1 = {
  name: "Alice",
  greet: function(city) {
    console.log(`Hi, I'm ${this.name} from ${city}`);
  },
};

const user2 = { name: "Bob" };

// Borrow greet method
user1.greet.call(user2, "Delhi");       // Hi, I'm Bob from Delhi
user1.greet.apply(user2, ["Mumbai"]);   // Hi, I'm Bob from Mumbai

const greetBob = user1.greet.bind(user2, "Bangalore");
greetBob();                             // Hi, I'm Bob from Bangalore
```

---

### 🔁 Summary Table

| Method  | Invokes Immediately | Accepts Arguments | Returns New Function |
| ------- | ------------------- | ----------------- | -------------------- |
| `call`  | ✅ Yes               | As comma list     | ❌ No                 |
| `apply` | ✅ Yes               | As array          | ❌ No                 |
| `bind`  | ❌ No                | As comma list     | ✅ Yes                |

---
