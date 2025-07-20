Sure! Here's a **complete theory on Linked List in Java**, including its **types, structure, operations**, and **code examples**. This is perfect for understanding from scratch, with explanations and comments.

---

## 🔗 What is a Linked List?

A **Linked List** is a linear data structure where elements (called **nodes**) are stored in **non-contiguous memory locations**, and each node points to the next one.

Unlike arrays, linked lists:

* **Don't require pre-defined size**.
* **Allow efficient insertions/deletions**.

---

## 🧱 Structure of a Node

Each **Node** in a singly linked list contains:

1. **Data** – The value it holds.
2. **Next** – A reference to the next node.

```java
class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}
```

---

## 🧭 Types of Linked Lists

| Type                     | Description                                       |
| ------------------------ | ------------------------------------------------- |
| **Singly Linked List**   | Each node points to the next node.                |
| **Doubly Linked List**   | Each node points to both next and previous nodes. |
| **Circular Linked List** | The last node points back to the first node.      |

---

## ✅ Basic Operations (Singly Linked List)

### 1. **Insert at the Beginning**

```java
void insertAtBeginning(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
}
```

### 2. **Insert at the End**

```java
void insertAtEnd(int data) {
    Node newNode = new Node(data);
    if (head == null) {
        head = newNode;
        return;
    }
    Node temp = head;
    while (temp.next != null) {
        temp = temp.next;
    }
    temp.next = newNode;
}
```

### 3. **Delete by Value**

```java
void deleteByValue(int value) {
    if (head == null) return;

    if (head.data == value) {
        head = head.next;
        return;
    }

    Node temp = head;
    while (temp.next != null && temp.next.data != value) {
        temp = temp.next;
    }

    if (temp.next != null) {
        temp.next = temp.next.next;
    }
}
```

### 4. **Traverse/Print**

```java
void printList() {
    Node temp = head;
    while (temp != null) {
        System.out.print(temp.data + " -> ");
        temp = temp.next;
    }
    System.out.println("null");
}
```

---

## 🔄 Example Program (Singly Linked List)

```java
public class LinkedListExample {
    Node head;

    class Node {
        int data;
        Node next;

        Node(int d) {
            data = d;
            next = null;
        }
    }

    // Insert at end
    void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) temp = temp.next;
        temp.next = newNode;
    }

    // Print list
    void print() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }

    // Delete a node
    void delete(int key) {
        if (head == null) return;
        if (head.data == key) {
            head = head.next;
            return;
        }
        Node temp = head;
        while (temp.next != null && temp.next.data != key) {
            temp = temp.next;
        }
        if (temp.next != null) temp.next = temp.next.next;
    }

    public static void main(String[] args) {
        LinkedListExample list = new LinkedListExample();
        list.insert(10);
        list.insert(20);
        list.insert(30);
        list.print();  // 10 -> 20 -> 30 -> null

        list.delete(20);
        list.print();  // 10 -> 30 -> null
    }
}
```

---

## 🔁 Doubly Linked List Basics

Each node contains:

* `data`
* `next` (points to next)
* `prev` (points to previous)

```java
class DNode {
    int data;
    DNode next, prev;

    DNode(int data) {
        this.data = data;
        next = prev = null;
    }
}
```

### Example: Insert at Front in Doubly Linked List

```java
class DoublyLinkedList {
    DNode head;

    void insertFront(int data) {
        DNode newNode = new DNode(data);
        newNode.next = head;
        if (head != null) head.prev = newNode;
        head = newNode;
    }

    void printList() {
        DNode temp = head;
        while (temp != null) {
            System.out.print(temp.data + " <-> ");
            temp = temp.next;
        }
        System.out.println("null");
    }
}
```

---

## 🔄 Circular Linked List

In a **circular linked list**, the `next` of the last node points back to the head.

### Example: Circular Singly Linked List

```java
class CircularLinkedList {
    Node last = null;

    class Node {
        int data;
        Node next;
        Node(int data) {
            this.data = data;
        }
    }

    void addToEmpty(int data) {
        if (last != null) return;
        Node newNode = new Node(data);
        last = newNode;
        last.next = last;
    }

    void addEnd(int data) {
        if (last == null) {
            addToEmpty(data);
            return;
        }
        Node newNode = new Node(data);
        newNode.next = last.next;
        last.next = newNode;
        last = newNode;
    }

    void print() {
        if (last == null) return;
        Node temp = last.next;
        do {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        } while (temp != last.next);
        System.out.println("(back to start)");
    }
}
```

---

## 📊 Comparison with Arrays

| Feature           | Array          | Linked List         |
| ----------------- | -------------- | ------------------- |
| Memory Allocation | Contiguous     | Non-contiguous      |
| Size              | Fixed          | Dynamic             |
| Insertion         | Costly (shift) | Easy (O(1) at head) |
| Deletion          | Costly (shift) | Easy                |
| Random Access     | O(1)           | O(n)                |

---

## 📌 Use Cases of Linked List

* Browser history (back/forward)
* Undo features in editors
* Memory management (allocators)
* Graph representations (adjacency list)

---

Let me know if you'd like real-world coding problems using linked lists or interview-based questions.

