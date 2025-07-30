### classes
A class in JavaScript is a blueprint for creating objects with properties and methods.\
It's just syntactic sugar over JavaScript’s prototypal inheritance.

## 📦 Basic Syntax of a Class
```
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
## Every object in JavaScript has a hidden property called [[Prototype]] (also accessible via __proto__), which refers to another object.

That forms a prototype chain: childLevel1 --- childLeve1 -- parentObject --- null\
john --> Person.prototype --> Object.prototype --> null
```
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John");
john.sayHello(); // Hello, I'm John

####################################
function Person(name, age) {
  this.name = name;
  this.age = age;

  // Method defined inside the constructor
  this.sayHello = function() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  };
}

const p1 = new Person("Bob", 30);
console.log(p1.sayHello());
// Output: Hi, I'm Bob and I'm 30 years old
### ⚠️ Drawback: Every instance gets its own copy of the method (more memory usage).
###########################################

--------------------------------
class Animal {
  speak() {
    console.log("Generic sound");
  }
}

const a = new Animal();
a.speak(); // Generic sound

// Under the hood:
console.log(Object.getPrototypeOf(a) === Animal.prototype); // true

✅ **Yes**, exactly!
In your example:

```js
class Animal {
  speak() {
    console.log("Generic sound");
  }
}
```

The method `speak()` is **automatically added to the prototype** of the `Animal` class.

---

## 🧠 Behind the scenes:

When you declare a class like this:

```js
class Animal {
  speak() {
    console.log("Generic sound");
  }
}
```

It is **internally equivalent** to this:

```js
function Animal() {}

Animal.prototype.speak = function() {
  console.log("Generic sound");
};
```

So when you create an object like:

```js
const a = new Animal();
```

The object `a` will **not have `speak` directly on it**, but will inherit it from the prototype:

```js
console.log(a.hasOwnProperty("speak")); // false (it's on the prototype)
console.log(Animal.prototype.hasOwnProperty("speak")); // true
```

And:

```js
console.log(Object.getPrototypeOf(a) === Animal.prototype); // true
```

---

## ✅ Summary:

| Code                                            | Where does it go?                   |
| ----------------------------------------------- | ----------------------------------- |
| `speak()` inside a `class`                      | 🔁 Goes to `Animal.prototype`       |
| `this.speak = function() {}` inside constructor | ❌ Stays on each individual instance |

---

Would you like a diagram showing how class methods relate to prototype?

--------------------------------------
```
### 🔁 What Actually Happens Under the Hood?
```
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
// Efficient memory use: All instances share the same method.
### Constructor Functions and Prototypes (Rewritten Version)
```
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise`);
};

function Dog(name, breed) {
  // call Animal constructor
  Animal.call(this, name);
  this.breed = breed;
}

// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype); // set prototype chain
Dog.prototype.constructor = Dog; // reset constructor pointer

// Override speak method
Dog.prototype.speak = function() {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Rocky", "Labrador");
dog.speak(); // Rocky barks
```
## Prototype Chain for dog
```
dog
 └── [[Prototype]] → Dog.prototype
                      └── [[Prototype]] → Animal.prototype
                                               └── [[Prototype]] → Object.prototype
```
So when you call dog.speak():\

1.JS looks at dog.__proto__ → Dog.prototype\

2.Finds the speak() method → calls it\

3.If it wasn't there, it would go to Animal.prototype\

4.Then to Object.prototype\

5.Then null

## A factory function is a regular JavaScript function that returns a new object (or class or instance). It’s a way to create and customize objects without using the class keyword.
```
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
# 🧠 Why Use a Factory Function?
1.Simple way to create reusable object templates\
2.Can avoid this, new, and class\
3.You can customize the logic inside\
4.You can create closures (private variables)





