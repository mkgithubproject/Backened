The **Strategy Design Pattern** is a behavioral design pattern that allows you to define a family of algorithms, encapsulate each one, and make them interchangeable. It helps you choose the algorithm at runtime.

---

## 🔴 Problem Without Strategy Pattern

Let’s say you are building a **payment system**. You want to support multiple payment methods like:

* Credit Card
* PayPal
* UPI

If you write something like:

```java
class PaymentService {
    public void pay(String type) {
        if (type.equals("credit")) {
            System.out.println("Paid using Credit Card");
        } else if (type.equals("paypal")) {
            System.out.println("Paid using PayPal");
        } else if (type.equals("upi")) {
            System.out.println("Paid using UPI");
        }
    }
}
```

### ❌ Issues:

* Every time you add a new payment method, you modify the `pay()` method.
* Violates **Open/Closed Principle** (OCP) – class should be open for extension, closed for modification.
* Hard to test individual payment types.
* Tight coupling between payment types and `PaymentService`.

---

## ✅ Solution: Strategy Pattern

> Strategy Pattern lets you define a family of algorithms (payment methods), encapsulate each one in a separate class, and make them interchangeable.

---

## 💡 Step-by-Step Implementation (Java Example)

### 1. Create Strategy Interface

```java
public interface PaymentStrategy {
    void pay(int amount);
}
```

### 2. Implement Strategies

```java
public class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}

public class PayPalPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}

public class UpiPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using UPI.");
    }
}
```

### 3. Create Context Class

```java
public class PaymentContext {
    private PaymentStrategy strategy;

    // Inject strategy at runtime
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void payAmount(int amount) {
        strategy.pay(amount);
    }
}
```

### 4. Usage

```java
public class Main {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext();

        context.setPaymentStrategy(new CreditCardPayment());
        context.payAmount(100);

        context.setPaymentStrategy(new PayPalPayment());
        context.payAmount(200);

        context.setPaymentStrategy(new UpiPayment());
        context.payAmount(300);
    }
}
```

### ✅ Output:

```
Paid 100 using Credit Card.
Paid 200 using PayPal.
Paid 300 using UPI.
```

---

## ✅ Benefits of Strategy Pattern

* Open for extension, closed for modification.
* Easily add new strategies without touching existing code.
* Promotes separation of concerns and better testability.

---

## ✅ When to Use Strategy Pattern?

* When you have many related classes that differ only in their behavior.
* When you need to select a behavior/algorithm at runtime.
* When you want to avoid using lots of conditional (`if/else` or `switch`) logic.

---
Great question!

### ✅ Constructor Injection with **Interfaces**

Constructor injection works **perfectly with interfaces** – and this is actually one of the **best use cases** of it in object-oriented programming.

---

## 🎯 Goal:

We depend on **abstractions (interfaces)**, not concrete classes.
This makes our code more **flexible**, **testable**, and **loosely coupled**.

---

### 🧠 Example: Notification System

#### Step 1: Create an Interface

```java
public interface NotificationService {
    void sendMessage(String message);
}
```

#### Step 2: Create Implementations

```java
public class EmailService implements NotificationService {
    public void sendMessage(String message) {
        System.out.println("Sending Email: " + message);
    }
}

public class SMSService implements NotificationService {
    public void sendMessage(String message) {
        System.out.println("Sending SMS: " + message);
    }
}
```

#### Step 3: Inject Interface in Constructor

```java
public class UserController {
    private final NotificationService notificationService;

    // Constructor Injection of interface
    public UserController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void notifyUser() {
        notificationService.sendMessage("Welcome User!");
    }
}
```

#### Step 4: Usage – Inject Any Implementation

```java
public class Main {
    public static void main(String[] args) {
        NotificationService emailService = new EmailService(); // or new SMSService()
        UserController controller = new UserController(emailService); // Inject interface
        controller.notifyUser();
    }
}
```

---

### ✅ Output (if using EmailService):

```
Sending Email: Welcome User!
```

---

### 💡 Key Benefits

| Benefit                   | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| **Polymorphism**          | You can switch behavior by changing the implementation.                 |
| **Loose Coupling**        | `UserController` doesn't care about how messages are sent.              |
| **Testability**           | You can inject a mock/fake `NotificationService` for unit testing.      |
| **Open/Closed Principle** | Add new types of `NotificationService` without modifying existing code. |

---

### ✅ In Spring Framework (Real-World)

```java
@Component
public class UserController {
    private final NotificationService notificationService;

    @Autowired
    public UserController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
}
```

Spring will automatically inject the correct implementation of `NotificationService` based on your configuration.

---

Would you like an example showing **multiple implementations** and how Spring decides which one to inject (using `@Qualifier`)?

