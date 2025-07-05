// ✅ Class vs Function in JavaScript

// --- Class Declaration ---
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

const p1 = new Person("Alice");
p1.greet(); // Hello, Alice

console.log(typeof Person); // "function"

// --- Equivalent using Function + Prototype ---
function PersonFunction(name) {
  this.name = name;
}

PersonFunction.prototype.greet = function () {
  console.log(`Hello, ${this.name}`);
};

const p2 = new PersonFunction("Bob");
p2.greet(); // Hello, Bob

console.log(typeof PersonFunction); // "function"

// --- Differences ---

// 1. Cannot call class without new
try {
  Person("Charlie"); // ❌ TypeError
} catch (e) {
  console.log("Class without 'new':", e.message);
}

// 2. Functions can be hoisted, classes cannot
hoistedFunction();
function hoistedFunction() {
  console.log("This function is hoisted.");
}

try {
  hoistedClass(); // ❌ ReferenceError
} catch (e) {
  console.log("Class not hoisted:", e.message);
}

class hoistedClass {
  constructor() {
    console.log("Class constructor called.");
  }
}
