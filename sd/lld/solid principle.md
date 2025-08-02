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
    // ❌ Violates LSP - Ostrich can't fly
    @Override
    public void fly() {
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

