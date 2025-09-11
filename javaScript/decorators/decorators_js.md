Absolutely! Let’s do a deep dive into **decorators in JavaScript**. I’ll explain what they are, how they work, and give examples.

---

## **1. What are decorators?**

A **decorator** is a special kind of function that **can modify or enhance classes, methods, accessors, or properties**. They are often used in frameworks like **Angular**, **NestJS**, or **TypeScript**, but the concept exists in JavaScript/TypeScript proposals.

Think of a decorator like a **wrapper** around a class or method that can inject extra behavior without modifying the original code directly.

---

## **2. Syntax**

In modern JS/TypeScript, a decorator is applied using the `@` symbol:

```js
@decoratorFunction
class MyClass { }
```

or for methods:

```js
class MyClass {
  @decoratorFunction
  myMethod() { }
}
```

---

## **3. Types of decorators**

### **a) Class decorators**

A class decorator takes the **class constructor** and can return a new constructor.

```js
function addId(target) {
  target.prototype.id = Math.random().toString(36).substr(2, 9);
}

@addId
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Mohit");
console.log(user.name); // Mohit
console.log(user.id);   // random string
```

---

### **b) Method decorators**

A method decorator can **wrap or modify a method**.

```js
function log(target, propertyKey, descriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @log
  add(a, b) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Logs: Calling add with [2,3] and returns 5
```

* **target** → the class prototype
* **propertyKey** → method name
* **descriptor** → property descriptor object

---

### **c) Property decorators**

Used to **modify a property** on a class.

```js
function readOnly(target, key) {
  Object.defineProperty(target, key, {
    writable: false,
  });
}

class User {
  @readOnly
  name = "Mohit";
}

const user = new User();
user.name = "Another Name"; // fails silently or throws error in strict mode
console.log(user.name); // Mohit
```

---

### **d) Parameter decorators**

You can decorate **method parameters**:

```js
function logParam(target, key, index) {
  console.log(`Parameter at position ${index} in ${key} is decorated`);
}

class Person {
  greet(@logParam message) {
    console.log(message);
  }
}

const p = new Person();
p.greet("Hello"); // Logs: Parameter at position 0 in greet is decorated
```

---

## **4. Key Points**

1. Decorators **enhance classes/methods/properties** without touching their original implementation.
2. They are **executed in the order of bottom-up** for methods, top-down for classes.
3. Currently, decorators are **stage 3 proposal** in JavaScript; they work fully in **TypeScript**.
4. Can be used for **logging, validation, authorization, caching**, etc.

---

### **5. Example: Logging + Authorization decorator**

```js
function authorize(role) {
  return function (target, key, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
      if (this.userRole !== role) {
        throw new Error("Not authorized");
      }
      return original.apply(this, args);
    };
  };
}

class AdminActions {
  constructor(userRole) {
    this.userRole = userRole;
  }

  @authorize("admin")
  deleteUser() {
    console.log("User deleted!");
  }
}

const admin = new AdminActions("admin");
admin.deleteUser(); // Works

const guest = new AdminActions("guest");
guest.deleteUser(); // Throws "Not authorized"
```

---
Ah, that error makes total sense 👍

Here’s the issue:

* **JavaScript (Node.js)** does **not** support the `@decorator` syntax yet.
* That syntax only works in **TypeScript** (with `experimentalDecorators` enabled in `tsconfig.json`) or via **Babel** with the decorators plugin.

That’s why when you run `node app.js`, Node throws:

```
SyntaxError: Invalid or unexpected token
```

because `@addId` is not valid JavaScript.

---

## ✅ How to fix

### **Option 1: Use TypeScript**

If you want to use decorators with `@`, you need TypeScript.

1. Initialize TypeScript:

   ```bash
   npm init -y
   npm install typescript ts-node @types/node --save-dev
   npx tsc --init
   ```

2. In `tsconfig.json`, enable decorators:

   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": true
     }
   }
   ```

3. Rename `app.js` → `app.ts`, then run:

   ```bash
   npx ts-node app.ts
   ```

Your code will run fine.

---

### **Option 2: Pure JavaScript (no @ syntax)**

If you don’t want TypeScript, you can apply the decorator manually:

```js
function addId(target) {
  target.prototype.id = Math.random().toString(36).substr(2, 9);
}

class User {
  constructor(name) {
    this.name = name;
  }
}

// apply decorator manually
addId(User);

const user = new User("Mohit");
console.log(user.name); // Mohit
console.log(user.id);   // random string
```

---

👉 So basically:

* If you want the **`@decorator` syntax**, use **TypeScript** with `experimentalDecorators`.
* If you stick to **plain Node.js**, apply decorators as functions instead of `@`.

---

Do you want me to set this up for **TypeScript (with `@` syntax)** or keep it **pure JS without `@`**?

