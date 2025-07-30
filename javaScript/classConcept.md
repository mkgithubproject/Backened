### 📦 JavaScript Classes and Prototypes Explained

A **class** in JavaScript is a blueprint for creating objects with properties and methods. It's just syntactic sugar over JavaScript’s prototypal inheritance system.

---

## 📦 Basic Syntax of a Class

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const p1 = new Person("Mohit", 25);
p1.sayHello(); // Hi, I'm Mohit and I'm 25 years old.
```

---

## 🧬 Prototype Chain

Every object in JavaScript has a hidden `[[Prototype]]` (accessible via `__proto__`), which refers to another object:

```
john --> Person.prototype --> Object.prototype --> null
```

### Old-School Constructor Function

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John");
john.sayHello(); // Hello, I'm John
```

---

## ⚠️ Constructor-Scoped Methods: Memory Drawback

```js
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.sayHello = function() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  };
}

const p1 = new Person("Bob", 30);
console.log(p1.sayHello());
```

### 🔁 Example:

```js
const p1 = new Person("Alice", 25);
const p2 = new Person("Bob", 30);
console.log(p1.sayHello === p2.sayHello); // ❌ false
```

| Defined Where                          | Shared?         | Memory Usage   |
| -------------------------------------- | --------------- | -------------- |
| Inside constructor                     | ❌ No (separate) | More memory    |
| On prototype (e.g. `Person.prototype`) | ✅ Yes (shared)  | More efficient |

---

## 🔍 What is a Constructor in JavaScript?

A **constructor function** is a normal function used with the `new` keyword:

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```

Calling `new Person("Bob", 30)` does:

1. Creates a new empty object
2. Sets `this` to that object
3. Runs the constructor function body

---

## 🧠 Behind the Class Syntax

```js
class Animal {
  speak() {
    console.log("Generic sound");
  }
}

const a = new Animal();
a.speak(); // Generic sound
```

Is equivalent to:

```js
function Animal() {}

Animal.prototype.speak = function() {
  console.log("Generic sound");
};
```

### Checking the Prototype Chain

```js
console.log(a.hasOwnProperty("speak")); // false
console.log(Animal.prototype.hasOwnProperty("speak")); // true
console.log(Object.getPrototypeOf(a) === Animal.prototype); // true
```

---

## 🔁 What Actually Happens Under the Hood?

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("Rocky", "Labrador");
dog.speak(); // Rocky barks
```

---

## Constructor Function Equivalent

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Rocky", "Labrador");
dog.speak(); // Rocky barks
```

## Prototype Chain for `dog`

```
dog
 └── [[Prototype]] → Dog.prototype
                      └── [[Prototype]] → Animal.prototype
                                               └── [[Prototype]] → Object.prototype
```

---

## 🏭 Factory Function

A **factory function** is a normal function that returns an object:

```js
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${this.name} and I'm ${this.age}`);
    }
  };
}

const user1 = createUser("Mohit", 25);
user1.greet(); // Hi, I'm Mohit and I'm 25
```

### 🧠 Why Use a Factory Function?

1. Simpler syntax, avoids `this`, `new`, and `class`
2. Great for creating closures (private variables)
3. Easy to customize logic during object creation
