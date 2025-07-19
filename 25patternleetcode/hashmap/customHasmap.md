Creating a **custom `HashMap` in Java** from scratch is a great way to understand how Java's built-in `HashMap` works internally. Let’s break it down and build a basic version step-by-step.

---

## ✅ HashMap Internal Concepts

Java's `HashMap` works as:

* An **array of buckets**, where each bucket is a **linked list** (or tree after Java 8 for collisions).

* A **key** is hashed using `hashCode()`, and then the index in the array is found using:

  ```java
  index = hashCode % array.length
  ```

* Each bucket holds key-value pairs as **nodes**.

---

## ✅ Step-by-Step Implementation

### 1. Create a class for Key-Value Pair (Node)

```java
class Entry<K, V> {
    K key;
    V value;
    Entry<K, V> next;

    public Entry(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
```

---

### 2. Custom HashMap Class

```java
class CustomHashMap<K, V> {
    private Entry<K, V>[] buckets;
    private int capacity = 16; // default capacity
    private int size = 0;

    @SuppressWarnings("unchecked")
    public CustomHashMap() {
        buckets = new Entry[capacity];
    }

    private int getBucketIndex(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }

    public void put(K key, V value) {
        int index = getBucketIndex(key);
        Entry<K, V> existing = buckets[index];

        // Check for existing key and update
        while (existing != null) {
            if (existing.key.equals(key)) {
                existing.value = value;
                return;
            }
            existing = existing.next;
        }

        // Insert new entry at head of list
        Entry<K, V> newEntry = new Entry<>(key, value);
        newEntry.next = buckets[index];
        buckets[index] = newEntry;
        size++;
    }

    public V get(K key) {
        int index = getBucketIndex(key);
        Entry<K, V> entry = buckets[index];

        while (entry != null) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
            entry = entry.next;
        }

        return null;
    }

    public void remove(K key) {
        int index = getBucketIndex(key);
        Entry<K, V> entry = buckets[index];
        Entry<K, V> prev = null;

        while (entry != null) {
            if (entry.key.equals(key)) {
                if (prev == null) {
                    buckets[index] = entry.next;
                } else {
                    prev.next = entry.next;
                }
                size--;
                return;
            }
            prev = entry;
            entry = entry.next;
        }
    }

    public int size() {
        return size;
    }
}
```

---

### 3. Test the Custom HashMap

```java
public class Main {
    public static void main(String[] args) {
        CustomHashMap<String, Integer> map = new CustomHashMap<>();

        map.put("apple", 100);
        map.put("banana", 200);
        map.put("apple", 150); // override

        System.out.println(map.get("apple"));  // 150
        System.out.println(map.get("banana")); // 200
        System.out.println(map.get("orange")); // null

        map.remove("banana");
        System.out.println(map.get("banana")); // null

        System.out.println("Size: " + map.size()); // 1
    }
}
```

---

## 🧠 Key Concepts Covered

| Concept            | Explained                     |
| ------------------ | ----------------------------- |
| Hashing            | Using `hashCode()` and modulo |
| Collision Handling | Using Linked List chaining    |
| Basic Operations   | `put()`, `get()`, `remove()`  |
| Generics           | Generic Key-Value support     |

---

Would you like:

* Tree-based buckets like Java 8+ `HashMap`?
* Rehashing logic when size exceeds a threshold?
* A Canva file with all code and explanation?

Let me know!
