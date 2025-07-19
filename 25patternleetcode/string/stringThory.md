# 📘 Java String Deep Dive: String Pool, Immutability, Memory Usage

---

## 🔹 0. What is a String in Java?

A `String` in Java is a **sequence of characters**. It is one of the most commonly used classes in Java and is part of `java.lang` package.

### ✅ Key Characteristics:

* Strings are **objects** in Java (instances of `String` class).
* They are **immutable** — cannot be changed after creation.
* Created either using **string literals** or **`new` keyword**.

### 📌 Declaration:

```java
String str1 = "Hello";              // Using string literal (recommended)
String str2 = new String("World");  // Using new keyword
```

---

## 🔹 1. What is the **String Pool**?

The **String Pool** is a **special area in heap memory** where **Java stores string literals** to **reuse them** and **save memory**.

### 📌 How it works:

```java
String a = "Java";
String b = "Java";

System.out.println(a == b); // true — both point to the same pool object
```

* If a string literal already exists in the pool, the same reference is returned.
* If not, it’s added to the pool.

---

## 🔹 2. Why Strings are **Immutable**

Strings in Java **cannot be changed** once created.

### ✅ Key reasons:

| Reason                | Explanation                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| 🔐 **Security**       | Strings are used in class loading, file access, URLs — immutability avoids tampering |
| 💰 **String Pooling** | Shared strings must not change, so all references stay consistent                    |
| 💻 **Thread-safe**    | No synchronization needed — safe to use across threads                               |
| 🧠 **Caching**        | Hash code is cached — changes would break `HashMap`, `Set`, etc.                     |

### 🔒 Immutable Example:

```java
String s = "Hello";
s.concat(" World");
System.out.println(s); // "Hello" — unchanged

s = s.concat(" World"); // assign new object
System.out.println(s); // "Hello World"
```

---

## 🔹 3. Memory: Literal vs `new String()`

### ✅ Using Literal

```java
String a = "Java";
String b = "Java";
```

* Stored in **String Pool**.
* One object shared across variables.
* Efficient in **memory & performance**.

---

### ❌ Using `new String()`

```java
String a = new String("Java");
String b = new String("Java");
```

* `"Java"` goes to **String Pool**.
* `new String()` creates a **separate object** in heap **outside** the pool.
* Uses **more memory**, **not shared**.

---

### ✅ Using `intern()`:

```java
String a = new String("Java");
String b = a.intern(); // b refers to the pooled object

String c = "Java";
System.out.println(b == c); // true
```

---

## 🔹 4. Visual Summary

### 🔸 Using Literal:

```
Heap (String Pool):
    "Java"  ← a, b, c → all point to this
```

### 🔸 Using `new String()`:

```
Heap:
    [Object 1] = new String("Java") ← a
    [Object 2] = new String("Java") ← b

Heap (String Pool):
    "Java" ← exists but unused by a/b
```

---

## 🔹 5. Performance Tips

| Tip                                    | Why                           |
| -------------------------------------- | ----------------------------- |
| ✅ Use **string literals**              | Reuses memory, faster         |
| ❌ Avoid `new String("...")`            | Creates unnecessary objects   |
| ✅ Use `intern()`                       | Manually put string in pool   |
| ✅ Use `StringBuilder` / `StringBuffer` | For mutable string operations |

---

## 🔚 Summary

* Strings are **immutable** for **security, performance, thread safety**.
* String literals are **pooled and reused**, making them efficient.
* `new String()` creates **new heap objects** — avoid unless needed.
* Use `intern()` to reduce memory when working with dynamic strings.

---

## 🔹 6. Common String Methods in Java

| Method                   | Description                              | Example                         |
| ------------------------ | ---------------------------------------- | ------------------------------- |
| `length()`               | Returns length of the string             | `str.length()`                  |
| `charAt(int index)`      | Character at index                       | `str.charAt(0)`                 |
| `substring(start, end)`  | Returns substring                        | `str.substring(0, 4)`           |
| `toUpperCase()`          | Converts to uppercase                    | `str.toUpperCase()`             |
| `toLowerCase()`          | Converts to lowercase                    | `str.toLowerCase()`             |
| `contains("txt")`        | Checks if string contains given text     | `str.contains("lo")`            |
| `equals(str2)`           | Compares content (case-sensitive)        | `"abc".equals("abc")`           |
| `equalsIgnoreCase(str2)` | Case-insensitive comparison              | `"abc".equalsIgnoreCase("ABC")` |
| `startsWith("abc")`      | Checks if string starts with given text  | `str.startsWith("He")`          |
| `endsWith("xyz")`        | Checks if string ends with given text    | `str.endsWith("ld")`            |
| `indexOf("a")`           | First index of character or substring    | `"apple".indexOf("p")`          |
| `lastIndexOf("p")`       | Last index                               | `"apple".lastIndexOf("p")`      |
| `trim()`                 | Removes leading and trailing whitespaces | `" hello ".trim()`              |
| `replace("a", "b")`      | Replaces characters                      | `"apple".replace("a", "A")`     |
| `split(" ")`             | Splits string into array                 | `"a b c".split(" ")`            |

---
