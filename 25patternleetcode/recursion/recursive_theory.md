Recursion is a **programming technique** where a method calls **itself** to solve a problem.

---

## 🔁 What is Recursion?

A function is said to be **recursive** if it calls itself, either **directly or indirectly**, and solves a **smaller version** of the same problem.

Every recursive function must have:

1. ✅ **Base case** – stops the recursion.
2. 🔁 **Recursive case** – the function keeps calling itself with modified input.

---

## 🔸 Structure of Recursion

```java
void recursiveFunction(parameters) {
    if (base case) {
        // stop and return
    } else {
        // modify input and call itself
        recursiveFunction(modified parameters);
    }
}
```

---

## 🔰 Example 1: Factorial of a Number (Basic Recursion)

Factorial: `n! = n * (n-1) * (n-2) * ... * 1`

```java
public class RecursionExample {

    // Recursive method to find factorial
    static int factorial(int n) {
        if (n == 0 || n == 1) { // base case
            return 1;
        } else {
            return n * factorial(n - 1); // recursive case
        }
    }

    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("Factorial of 5: " + result); // Output: 120
    }
}
```

---

## 🔰 Example 2: Fibonacci Series (Multiple Recursive Calls)

Fibonacci: `0 1 1 2 3 5 8 13 ...`

```java
public class FibonacciRecursion {

    static int fibonacci(int n) {
        if (n == 0) return 0;      // base case 1
        if (n == 1) return 1;      // base case 2
        return fibonacci(n - 1) + fibonacci(n - 2); // recursive case
    }

    public static void main(String[] args) {
        int n = 7;
        System.out.println("Fibonacci of " + n + ": " + fibonacci(n)); // Output: 13
    }
}
```

---

## 🔰 Example 3: Print Numbers from N to 1 (Descending)

```java
public class PrintDescending {

    static void printDescending(int n) {
        if (n == 0) return; // base case
        System.out.println(n);
        printDescending(n - 1); // recursive call
    }

    public static void main(String[] args) {
        printDescending(5); // Output: 5 4 3 2 1
    }
}
```

---

## 🔰 Example 4: Sum of Digits

```java
public class SumOfDigits {

    static int sumDigits(int n) {
        if (n == 0) return 0; // base case
        return (n % 10) + sumDigits(n / 10); // recursive call
    }

    public static void main(String[] args) {
        System.out.println("Sum: " + sumDigits(1234)); // Output: 10
    }
}
```

---

## 🔁 Types of Recursion in Java (with Examples)

### 1. **Direct Recursion**

A function calls itself directly.

```java
static void directRecursion(int n) {
    if (n == 0) return;
    System.out.println(n);
    directRecursion(n - 1); // calls itself
}
```

### 2. **Indirect Recursion**

A function calls another function, which in turn calls the first function again.

```java
static void functionA(int n) {
    if (n <= 0) return;
    System.out.println("A: " + n);
    functionB(n - 1);
}

static void functionB(int n) {
    if (n <= 0) return;
    System.out.println("B: " + n);
    functionA(n - 1);
}
```

### 3. **Tail Recursion**

The recursive call is the **last** thing executed in the function.

```java
static void tailRec(int n) {
    if (n == 0) return;
    System.out.println(n);
    tailRec(n - 1); // last action
}
```

### 4. **Non-Tail Recursion**

Some operations happen **after** the recursive call.

```java
static void nonTailRec(int n) {
    if (n == 0) return;
    nonTailRec(n - 1); // not the last statement
    System.out.println(n);
}
```

### 5. **Head Recursion**

Recursive call is made **before** any processing.

```java
static void headRec(int n) {
    if (n == 0) return;
    headRec(n - 1); // called first
    System.out.println(n);
}
```

---

## 🔰 Example 5: Tail Recursion (Optimized)

```java
public class TailRecursion {

    static void tailPrint(int n) {
        if (n == 0) return;
        System.out.println(n);
        tailPrint(n - 1); // last action → tail recursion
    }

    public static void main(String[] args) {
        tailPrint(5); // Output: 5 4 3 2 1
    }
}
```

---

## 🔥 Recursion vs Iteration

| Feature    | Recursion                        | Iteration               |
| ---------- | -------------------------------- | ----------------------- |
| Simplicity | Cleaner code                     | Sometimes longer        |
| Memory     | Uses **call stack**              | Uses **loop variables** |
| Speed      | Slower due to overhead           | Usually faster          |
| Use case   | Tree traversal, divide & conquer | Loops, counting         |

---

## 🧠 How to Think Recursively

1. **Identify the base case**.
2. **Think of the smallest input**.
3. **Solve the problem for smaller input (n - 1)**.
4. **Build solution using that smaller answer**.

---

Would you like **recursion exercises with solutions**, or how recursion works behind the scenes (like stack trace)?
