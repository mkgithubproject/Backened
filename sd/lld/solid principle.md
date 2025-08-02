The **SOLID principles** are five design principles intended to make software designs more understandable, flexible, and maintainable. They are especially relevant in **object-oriented system design** and are crucial in interviews and real-world projects.

---

## ✅ SOLID Principles Overview:

| Acronym | Principle                                 | Description                                                                  |
| ------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| S       | **Single Responsibility Principle (SRP)** | A class should have only one reason to change.                               |
| O       | **Open/Closed Principle (OCP)**           | Software entities should be open for extension, but closed for modification. |
| L       | **Liskov Substitution Principle (LSP)**   | Subtypes must be substitutable for their base types.                         |
| I       | **Interface Segregation Principle (ISP)** | No client should be forced to depend on methods it does not use.             |
| D       | **Dependency Inversion Principle (DIP)**  | Depend on abstractions, not on concretions.                                  |

---

## 📌 1. Single Responsibility Principle (SRP)

**📖 Definition:**
A class should have only one reason to change — it should only do one thing.

**💡 Example:**

```java
// ❌ Bad: Class has multiple responsibilities
class Invoice {
    public void calculateTotal() { /* logic */ }
    public void printInvoice() { /* logic */ }
    public void saveToDatabase() { /* logic */ }
}

// ✅ Good: Split responsibilities
class Invoice {
    public void calculateTotal() { /* logic */ }
}

class InvoicePrinter {
    public void print(Invoice invoice) { /* logic */ }
}

class InvoiceRepository {
    public void save(Invoice invoice) { /* logic */ }
}
```

---

## 📌 2. Open/Closed Principle (OCP)

**📖 Definition:**
Classes should be open for extension but closed for modification.

**💡 Example: Payment Processing System**

```java
// Abstraction
interface Payment {
    void pay(double amount);
}

// Concrete implementations
class CreditCardPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Paid using Credit Card: " + amount);
    }
}

class PaypalPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Paid using PayPal: " + amount);
    }
}

// High-level module (uses abstraction)
class PaymentProcessor {
    public void processPayment(Payment payment, double amount) {
        payment.pay(amount);
    }
}
```

**🔁 To add new payment methods, just implement the Payment interface. No need to modify existing code.**

---

## 📌 3. Liskov Substitution Principle (LSP)

**📖 Definition:**
Subtypes must be replaceable for their parent types without breaking the program.

**💡 Example:**

```java
class Bird {
    public void fly() {
        System.out.println("Bird is flying");
    }
}

class Sparrow extends Bird { }

class Ostrich extends Bird {
    // ❌ Violates LSP - Ostrich can't fly, So even though you didn’t throw an exception, you’ve changed the expected behavior of the superclass (Bird.fly()), which breaks the assumption of substitutability.
    @Override
    public void fly() {
       // if you prtint like not fly, still silnetly u changed the expected behavior
        throw new UnsupportedOperationException("Ostrich can't fly!");
    }
}

// ✅ Better approach
interface Bird { }

interface FlyingBird extends Bird {
    void fly();
}

class Sparrow implements FlyingBird {
    public void fly() { System.out.println("Sparrow flying"); }
}

class Ostrich implements Bird {
    // No fly() method, adheres to LSP
}
```
Absolutely! Let’s understand **Liskov Substitution Principle (LSP)** in a **very simple way**, with real-world examples and **Java code**, step by step.

---

## 🔍 What is Liskov Substitution Principle (LSP)?

**Definition (Easy Version):**

> You should be able to use a subclass **wherever its parent class is expected**, **without breaking the program** or changing behavior.

---

## 💡 Real-World Analogy

Imagine you have a class `Bird`, and you write a function to make any bird fly. Now, someone adds an `Ostrich` class that **extends `Bird`**, but ostriches **can’t fly**.

So, if your `Bird`-handling code tries to make the `Ostrich` fly... ❌ **Boom! Error!**
This means the subclass (`Ostrich`) **violated** the expectations of the parent class (`Bird`), thus **violating LSP**.

---

## ❌ BAD EXAMPLE – Violating LSP

```java
class Bird {
    public void fly() {
        System.out.println("Bird is flying...");
    }
}

class Sparrow extends Bird {
    // All good
}

class Ostrich extends Bird {
    @Override
    public void fly() {
        // Ostrich can't fly, so throws error!
        throw new UnsupportedOperationException("Ostrich can't fly!");
    }
}

public class Main {
    public static void makeBirdFly(Bird bird) {
        bird.fly();  // Expected all birds to fly
    }

    public static void main(String[] args) {
        Bird sparrow = new Sparrow();
        makeBirdFly(sparrow); // ✅ Works

        Bird ostrich = new Ostrich();
        makeBirdFly(ostrich); // ❌ Crash: UnsupportedOperationException
    }
}
```

🔴 **Problem**: You trusted that `Bird.fly()` would always work, but `Ostrich` breaks that trust.

---

## ✅ GOOD EXAMPLE – Following LSP

We fix this by **not forcing Ostrich to have `fly()`** if it can't.

### ✅ Solution: Use proper interfaces or inheritance hierarchy

```java
interface Bird { }

interface FlyingBird extends Bird {
    void fly();
}

class Sparrow implements FlyingBird {
    public void fly() {
        System.out.println("Sparrow is flying...");
    }
}

class Ostrich implements Bird {
    // Doesn't implement fly(), because it can't
}

public class Main {
    public static void makeFlyingBirdFly(FlyingBird bird) {
        bird.fly(); // Safe! Only flying birds are passed
    }

    public static void main(String[] args) {
        FlyingBird sparrow = new Sparrow();
        makeFlyingBirdFly(sparrow); // ✅ Works

        // Ostrich doesn't implement fly, so we never call fly() on it
        Bird ostrich = new Ostrich();
        // makeFlyingBirdFly(ostrich); // ❌ Not allowed at compile time - safe!
    }
}
```

✅ **Now:**

* We never try to fly an Ostrich.
* We call `fly()` only on objects that **can** fly.
* We follow **LSP** — subclasses behave as expected when treated like their parent.

---

## 🔑 Key Rule to Remember:

> **If your subclass changes or breaks the behavior expected by the parent class, you're violating LSP.**

---

## ✅ Another Simple Example (Math Shapes):

### ❌ LSP Violation:

```java
class Rectangle {
    protected int width, height;

    public void setWidth(int w) { width = w; }
    public void setHeight(int h) { height = h; }

    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        width = height = w; // 👎 changes behavior
    }

    @Override
    public void setHeight(int h) {
        width = height = h; // 👎 changes behavior
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r = new Square(); // 👈 Looks like rectangle
        r.setWidth(5);
        r.setHeight(10);
        System.out.println(r.getArea()); // 🤯 Outputs 100, not 50! Broken!
    }
}
```

### ✅ Fix: Don’t force Square to inherit from Rectangle. Model separately.

---

## ✅ Summary

| Rule                                      | Bad                          | Good                    |
| ----------------------------------------- | ---------------------------- | ----------------------- |
| Subclasses must not break parent behavior | Ostrich flying               | Ostrich without fly()   |
| Replace base class with subclass safely   | `Rectangle r = new Square()` | Separate `Square` logic |

---

Would you like a visual diagram or want me to explain **LSP violations in your own code** if you share any?

---

## 📌 4. Interface Segregation Principle (ISP)

**📖 Definition:**
Clients should not be forced to implement interfaces they do not use.

**💡 Example:**

```java
// ❌ Bad: One large interface
interface Worker {
    void work();
    void eat();
}

// Robot doesn't eat!
class Robot implements Worker {
    public void work() { System.out.println("Robot working"); }
    public void eat() { throw new UnsupportedOperationException(); }
}

// ✅ Good: Smaller interfaces
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Human implements Workable, Eatable {
    public void work() { System.out.println("Human working"); }
    public void eat() { System.out.println("Human eating"); }
}

class Robot implements Workable {
    public void work() { System.out.println("Robot working"); }
}
```

---

## 📌 5. Dependency Inversion Principle (DIP)

**📖 Definition:**
High-level modules should not depend on low-level modules. Both should depend on abstractions.

**💡 Example:**

```java
// Abstraction
interface Keyboard {
    String getInput();
}

// Concrete implementations
class MechanicalKeyboard implements Keyboard {
    public String getInput() {
        return "Mechanical input";
    }
}

class WirelessKeyboard implements Keyboard {
    public String getInput() {
        return "Wireless input";
    }
}

// High-level class depending on abstraction
class Computer {
    private Keyboard keyboard;

    public Computer(Keyboard keyboard) {
        this.keyboard = keyboard;
    }

    public void readInput() {
        System.out.println("Reading: " + keyboard.getInput());
    }
}
```

**Now, we can inject any kind of keyboard without changing the `Computer` class.**




Great! Let's understand the **Dependency Inversion Principle (DIP)** with a **real-world example in Java**.

---

## 🔍 What is Dependency Inversion Principle (DIP)?

**Definition (Simplified):**

> **High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).**
> Also, abstractions should not depend on details; details (implementations) should depend on abstractions.

---

## 🎯 Why DIP?

Without DIP, your classes become **tightly coupled** — any change in low-level modules requires changes in high-level modules too.

With DIP, your system becomes:

* Loosely coupled
* More testable
* Easier to change or extend

---

## 💡 Real-World Example: Keyboard Input to a Computer

Let’s say you’re building a `Computer` class that needs input from a keyboard.

---

### ❌ Without DIP (Tightly Coupled)

```java
class MechanicalKeyboard {
    public String getInput() {
        return "Mechanical Keyboard Input";
    }
}

class Computer {
    private MechanicalKeyboard keyboard = new MechanicalKeyboard(); // 👎 tight coupling

    public void readInput() {
        System.out.println("Reading: " + keyboard.getInput());
    }
}
```

### 🔴 Problem:

* Computer depends **directly** on `MechanicalKeyboard`.
* What if we want to use a `WirelessKeyboard`?
* We'd have to **modify the `Computer` class** → this violates Open/Closed Principle too.

---

### ✅ With DIP (Loosely Coupled using Interface)

### 1. Create an abstraction (interface):

```java
interface Keyboard {
    String getInput();
}
```

### 2. Implement different types of keyboards:

```java
class MechanicalKeyboard implements Keyboard {
    public String getInput() {
        return "Mechanical Keyboard Input";
    }
}

class WirelessKeyboard implements Keyboard {
    public String getInput() {
        return "Wireless Keyboard Input";
    }
}
```

### 3. High-level module depends on abstraction:

```java
class Computer {
    private Keyboard keyboard; // 👈 depends on interface, not implementation

    public Computer(Keyboard keyboard) {
        this.keyboard = keyboard;
    }

    public void readInput() {
        System.out.println("Reading: " + keyboard.getInput());
    }
}
```

### 4. Use it:

```java
public class Main {
    public static void main(String[] args) {
        Keyboard keyboard = new WirelessKeyboard(); // Or new MechanicalKeyboard();
        Computer computer = new Computer(keyboard);
        computer.readInput(); // Output: Wireless Keyboard Input
    }
}
```

---

## ✅ Benefits of Using DIP

| Without DIP (bad)                                    | With DIP (good)                                 |
| ---------------------------------------------------- | ----------------------------------------------- |
| `Computer` knows about `MechanicalKeyboard` directly | `Computer` depends only on `Keyboard` interface |
| Hard to replace or test                              | Easy to mock in tests                           |
| Code breaks if low-level class changes               | Code is stable and flexible                     |

---

## 🧪 For Unit Testing Example:

You can now easily mock the keyboard:

```java
class MockKeyboard implements Keyboard {
    public String getInput() {
        return "Test Input";
    }
}
```

And test your `Computer` class without real keyboard logic.

---

## ✅ Summary

* Use **interfaces** to define behavior.
* **Inject** dependencies via constructor (constructor injection).
* Let **low-level classes implement interfaces**, and **high-level classes use those interfaces**.

---

Would you like a **Spring-based real-world DIP example** using dependency injection via annotations (`@Autowired`)?


---

## 💡 Summary Table

| Principle | Purpose                                | Example Use Case                           |
| --------- | -------------------------------------- | ------------------------------------------ |
| SRP       | Maintain single focus                  | Separate printing logic from Invoice class |
| OCP       | Add features without breaking old code | New payment methods                        |
| LSP       | Subtypes behave like base types        | Bird → FlyingBird, Ostrich                 |
| ISP       | Small, role-specific interfaces        | Robot doesn’t eat                          |
| DIP       | Depend on abstractions                 | Keyboard interface used by Computer        |

---

Would you like a **real-world Java project** applying all SOLID principles in a single use case (e.g., Order Management System)?

