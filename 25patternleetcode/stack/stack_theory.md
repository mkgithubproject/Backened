
Here is the complete theory of **Stack in Java (Data Structures and Algorithms)** with detailed explanations:

---

# 📚 Stack in Java — Complete Theory (DSA)

## ✅ What is a Stack?

A **Stack** is a **linear data structure** that follows the **LIFO (Last In, First Out)** principle.

* The last element added to the stack is the first one to be removed.

Think of it like a stack of plates:
You add plates to the top and also remove them from the top.

---

## 🧠 Key Concepts

| Operation   | Description                  | Time Complexity |
| ----------- | ---------------------------- | --------------- |
| `push()`    | Insert an element at the top | O(1)            |
| `pop()`     | Remove and return the top    | O(1)            |
| `peek()`    | Return the top (no remove)   | O(1)            |
| `isEmpty()` | Check if stack is empty      | O(1)            |
| `size()`    | Get number of elements       | O(1)            |

---

## 🛠️ Stack Implementation Options in Java

1. **Using Java’s built-in `Stack` class** (from `java.util`)
2. **Using `LinkedList` or `Deque`**
3. **Custom implementation using arrays or linked lists**

---

## ✅ 1. Using Java’s Built-in Stack Class

```java
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top element: " + stack.peek());  // 30
        System.out.println("Removed element: " + stack.pop()); // 30
        System.out.println("Is empty? " + stack.isEmpty()); // false
    }
}
```

---

## ✅ 2. Custom Stack using Array

```java
class StackArray {
    int[] arr;
    int top;
    int capacity;

    StackArray(int size) {
        arr = new int[size];
        top = -1;
        capacity = size;
    }

    void push(int x) {
        if (top == capacity - 1) {
            System.out.println("Stack Overflow");
            return;
        }
        arr[++top] = x;
    }

    int pop() {
        if (top == -1) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (top == -1) return -1;
        return arr[top];
    }

    boolean isEmpty() {
        return top == -1;
    }

    int size() {
        return top + 1;
    }
}
```

---

## ✅ 3. Custom Stack using Linked List

```java
class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class StackLL {
    Node top;

    void push(int x) {
        Node newNode = new Node(x);
        newNode.next = top;
        top = newNode;
    }

    int pop() {
        if (top == null) {
            System.out.println("Stack Underflow");
            return -1;
        }
        int val = top.data;
        top = top.next;
        return val;
    }

    int peek() {
        if (top == null) return -1;
        return top.data;
    }

    boolean isEmpty() {
        return top == null;
    }
}
```

---

## ✅ 4. Stack using Deque (Recommended in Modern Java)

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class StackUsingDeque {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(100);
        stack.push(200);
        stack.push(300);

        System.out.println("Top element: " + stack.peek());   // 300
        System.out.println("Removed element: " + stack.pop()); // 300
        System.out.println("Is empty? " + stack.isEmpty());   // false
    }
}
```

> `ArrayDeque` is faster and more efficient than `Stack` class.

---

## 🔄 What is Deque?

A **Deque** (Double Ended Queue) is a linear data structure that allows insertion and deletion from **both ends** (front and rear).

In Java, `Deque` is an interface implemented by classes like `ArrayDeque` and `LinkedList`.

### ✅ Key Methods in Deque:

* `addFirst(E e)` – Inserts at the front
* `addLast(E e)` – Inserts at the end
* `removeFirst()` – Removes from the front
* `removeLast()` – Removes from the end
* `peekFirst()` – Retrieves front element
* `peekLast()` – Retrieves last element

### 🔹 Example:

```java
import java.util.Deque;
import java.util.ArrayDeque;

public class DequeExample {
    public static void main(String[] args) {
        Deque<String> deque = new ArrayDeque<>();

        deque.addFirst("Front1");
        deque.addLast("Rear1");
        deque.addFirst("Front2");

        System.out.println(deque);  // [Front2, Front1, Rear1]

        System.out.println("First Element: " + deque.peekFirst());  // Front2
        System.out.println("Last Element: " + deque.peekLast());    // Rear1

        deque.removeFirst();
        deque.removeLast();

        System.out.println(deque);  // [Front1]
    }
}
```

> Deques can be used to implement both stacks and queues efficiently.

---

## 🔁 Stack Real-World Use Cases

* Undo operations in editors
* Browser history
* Expression evaluation (infix → postfix)
* Function call/recursion stack
* Balanced parenthesis checking
* Backtracking algorithms (maze solving, path finding)
* Syntax parsing in compilers
* Reversing a string or collection
* Stock span problem

---

## 🧪 Stack Interview Problems

1. Valid Parentheses (Leetcode 20)
2. Next Greater Element
3. Min Stack
4. Evaluate Postfix Expression
5. Largest Rectangle in Histogram

---

## 📝 Summary

| Feature     | Stack                       |
| ----------- | --------------------------- |
| Type        | Linear data structure       |
| Principle   | LIFO (Last In First Out)    |
| Main Ops    | push, pop, peek             |
| Java Class  | `java.util.Stack`, `Deque`  |
| Impl. Types | Array / Linked List / Deque |

---

Would you like practice problems with solutions or visual diagrams for better understanding?
