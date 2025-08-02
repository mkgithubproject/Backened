## 📘 OOPs in Java – Complete Notes with Real-World Examples

---

### 🌀 What is OOP (Object-Oriented Programming)?

Object-Oriented Programming (OOP) is a programming paradigm where everything is modeled as an object — that contains **data (fields)** and **behavior (methods)**.

---

## 🚀 4 Pillars of OOP in Java

---

### 1. 🛡️ Encapsulation(also known as data-hiding)
declare varaiable as private and provide getter and setter public for modifying and view the value.\
so i can have control over who can see and who can not , whoc can update who can not \

**Definition:**
Encapsulation is the process of binding data and methods together and restricting direct access to some components.

#### ✅ Real-Life Analogy: ATM Machine

* You insert a card and interact via buttons.
* Internal logic like authentication, balance check, is **hidden**.

#### 🧑‍💻 Java Example:

```java
class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if(amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if(amount > 0 && amount <= balance) balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

---

### 2. 🧰 data Abstraction

**Definition:**
Abstraction hides complex implementation details and only exposes necessary parts.\
example car break padal example\
it can be acheived throgh abstract clases and interface.\
advatage: increase security and confidentiality.

#### ✅ Real-Life Analogy: Driving a Car

* You just turn the key and press the pedals.
* You don’t know how fuel ignition or braking works internally.

#### 🧑‍💻 Java Example:

```java
abstract class Vehicle {
    abstract void start();
    abstract void stop();
}

class Car extends Vehicle {
    public void start() {
        System.out.println("Car started");
    }

    public void stop() {
        System.out.println("Car stopped");
    }
}
```

---

### 3. 🧬 Inheritance

**Definition:**
Inheritance lets a class (child) inherit fields and methods from another class (parent).

#### ✅ Real-Life Analogy: Employee → Manager

* A Manager **is an** Employee + extra responsibilities.

#### 🧑‍💻 Java Example:

```java
class Employee {
    String name;
    double salary;

    void work() {
        System.out.println(name + " is working");
    }
}

class Manager extends Employee {
    void manage() {
        System.out.println(name + " is managing");
    }
}
```

---

### 4. 🔁 Polymorphism

**Definition:**
Polymorphism means many forms. It allows one interface to be used for different data types or classes.

#### ✅ Real-Life Analogy: Remote Button

* Same button can work for TV, AC, or Speaker based on context.

#### 🧑‍💻 Java Example:

```java
class Animal {
    void sound() {
        System.out.println("Some generic sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Bark");
    }
}

class Cat extends Animal {
    void sound() {
        System.out.println("Meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a;

        a = new Dog(); a.sound(); // Bark
        a = new Cat(); a.sound(); // Meow
    }
}
```

---

## 📊 Quick Summary Table

| Pillar        | Concept        | Keyword    | Real-World Example          | Java Feature                  |
| ------------- | -------------- | ---------- | --------------------------- | ----------------------------- |
| Encapsulation | Data hiding    | `private`  | ATM Machine                 | `private` + getters/setters   |
| Abstraction   | Hiding details | `abstract` | Driving a Car               | Abstract Class / Interface    |
| Inheritance   | Reusability    | `extends`  | Manager is an Employee      | `extends` keyword             |
| Polymorphism  | Many Forms     | `override` | Same button, different jobs | Method Overriding/Overloading |

---

Let me know if you want to extend this with:

* Diagrams
* Interview questions
* Practice problems
* Cheat sheet
* PDF download
