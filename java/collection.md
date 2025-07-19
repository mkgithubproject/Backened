Here is a **complete guide to Collections in Java** — including theory, syntax, and examples in a clear and easy-to-understand format.

---

# 📚 Java Collections Framework (JCF)

The **Java Collections Framework** is a **set of classes and interfaces** that implement commonly reusable data structures such as **List, Set, Map**, etc.

---

## 🔶 Why Use Collections?

* Dynamic in size (unlike arrays)
* Built-in sorting and searching
* Ready-to-use data structures
* Easy manipulation of data (add, remove, update)

---

## 🧩 Core Interfaces in Java Collections

| Interface | Description                            |
| --------- | -------------------------------------- |
| `List`    | Ordered collection, allows duplicates. |
| `Set`     | No duplicates allowed.                 |
| `Queue`   | FIFO (First-In-First-Out) structure.   |
| `Map`     | Stores key-value pairs.                |

---

## 1️⃣ `List` Interface

### ✅ Implementations: `ArrayList`, `LinkedList`

### 📌 Syntax:

```java
import java.util.*;

List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Apple");  // Duplicates allowed
System.out.println(list);
```

### 🧪 Output:

```
[Apple, Banana, Apple]
```

---

## 2️⃣ `Set` Interface

### ✅ Implementations: `HashSet`, `LinkedHashSet`, `TreeSet`

### 📌 Syntax:

```java
import java.util.*;

Set<String> set = new HashSet<>();
set.add("Dog");
set.add("Cat");
set.add("Dog"); // Duplicate, will not be added
System.out.println(set);
```

### 🧪 Output:

```
[Dog, Cat]  // Order may vary
```

---

## 3️⃣ `Map` Interface

### ✅ Implementations: `HashMap`, `TreeMap`, `LinkedHashMap`

### 📌 Syntax:

```java
import java.util.*;

Map<Integer, String> map = new HashMap<>();
map.put(1, "One");
map.put(2, "Two");
map.put(1, "Updated One"); // Key is updated
System.out.println(map);
```

### 🧪 Output:

```
{1=Updated One, 2=Two}
```

---

## 4️⃣ `Queue` Interface

### ✅ Implementations: `LinkedList`, `PriorityQueue`

### 📌 Syntax:

```java
import java.util.*;

Queue<String> queue = new LinkedList<>();
queue.add("Task1");
queue.add("Task2");
System.out.println(queue.poll());  // removes and returns the head
System.out.println(queue);
```

### 🧪 Output:

```
Task1
[Task2]
```

---

## 🎯 Utility Class: `Collections`

`Collections` is a helper class for performing operations like **sorting**, **shuffling**, **min**, **max**, etc.

### 📌 Syntax:

```java
import java.util.*;

List<Integer> numbers = Arrays.asList(3, 1, 2);
Collections.sort(numbers);  // Sorts the list
System.out.println(numbers);
```

### 🧪 Output:

```
[1, 2, 3]
```

---

## 📌 Real-World Example

```java
import java.util.*;

public class GroceryList {
    public static void main(String[] args) {
        List<String> groceries = new ArrayList<>();
        groceries.add("Milk");
        groceries.add("Eggs");
        groceries.add("Bread");
        groceries.add("Eggs"); // Duplicate allowed

        Set<String> uniqueGroceries = new HashSet<>(groceries); // Remove duplicates

        System.out.println("Full List: " + groceries);
        System.out.println("Unique Items: " + uniqueGroceries);

        Map<String, Integer> stock = new HashMap<>();
        stock.put("Milk", 10);
        stock.put("Eggs", 30);
        stock.put("Bread", 5);

        System.out.println("Stock of Eggs: " + stock.get("Eggs"));
    }
}
```

---

## 🧠 Summary Table

| Interface | Allows Duplicates | Ordered          | Key/Value |
| --------- | ----------------- | ---------------- | --------- |
| List      | ✅ Yes             | ✅ Yes            | ❌ No      |
| Set       | ❌ No              | ❌ No (`HashSet`) | ❌ No      |
| Map       | ✅ (values only)   | ❌                | ✅ Yes     |
| Queue     | ✅ Yes             | ✅ FIFO           | ❌ No      |

---

If you'd like this in a **Canva-style note** format (as you asked earlier), let me know and I’ll prepare it accordingly.
