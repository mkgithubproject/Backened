
Absolutely! Let’s learn **Queue in DSA** step-by-step in Java with simple theory, explanation, and code examples for each topic.

---

# 📚 Queue in DSA (Java)

---

## ✅ 1. **What is a Queue?**

A **Queue** is a **linear data structure** that follows the **FIFO (First In, First Out)** principle.

* **First element added → First one removed**
* Like a **queue at a ticket counter**.

### 📌 Common Operations:

| Operation   | Description             |
| ----------- | ----------------------- |
| `enqueue()` | Add an element          |
| `dequeue()` | Remove an element       |
| `peek()`    | View front element      |
| `isEmpty()` | Check if queue is empty |
| `size()`    | Number of elements      |

---

## ✅ 2. **Queue Interface in Java (java.util.Queue)**

Java provides a built-in `Queue` interface with implementing classes like:

* `LinkedList`
* `PriorityQueue`
* `ArrayDeque`

---

## ✅ 3. **Implementing Queue using LinkedList**

```java
import java.util.*;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        // Enqueue
        queue.add("A");
        queue.add("B");
        queue.add("C");

        System.out.println("Queue: " + queue); // [A, B, C]

        // Peek
        System.out.println("Front: " + queue.peek()); // A

        // Dequeue
        System.out.println("Removed: " + queue.poll()); // A
        System.out.println("Queue after dequeue: " + queue); // [B, C]
    }
}
```

---

## ✅ 4. **Queue Using Array (Manual Implementation)**

```java
class ArrayQueue {
    int[] arr;
    int front, rear, capacity;

    ArrayQueue(int size) {
        arr = new int[size];
        capacity = size;
        front = 0;
        rear = 0;
    }

    public void enqueue(int data) {
        if (rear == capacity) {
            System.out.println("Queue is full");
            return;
        }
        arr[rear++] = data;
    }

    public int dequeue() {
        if (front == rear) {
            System.out.println("Queue is empty");
            return -1;
        }
        int result = arr[front];
        // shift elements to left
        for (int i = 0; i < rear - 1; i++) {
            arr[i] = arr[i + 1];
        }
        rear--;
        return result;
    }

    public void display() {
        if (front == rear) {
            System.out.println("Queue is empty");
            return;
        }
        for (int i = front; i < rear; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}
```

### 🧪 Usage:

```java
public class Main {
    public static void main(String[] args) {
        ArrayQueue q = new ArrayQueue(5);
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        q.display(); // 10 20 30

        System.out.println("Dequeued: " + q.dequeue()); // 10
        q.display(); // 20 30
    }
}
```

---

## ✅ 5. **Circular Queue**

* Optimizes space in array-based queue
* Avoids shifting of elements

### 🚀 Code:

```java
class CircularQueue {
    int[] arr;
    int front, rear, size, capacity;

    CircularQueue(int k) {
        capacity = k;
        arr = new int[k];
        front = -1;
        rear = -1;
    }

    public boolean enqueue(int value) {
        if ((rear + 1) % capacity == front) {
            return false; // full
        }
        if (front == -1) front = 0;
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        return true;
    }

    public boolean dequeue() {
        if (front == -1) return false; // empty

        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        return true;
    }

    public int Front() {
        if (front == -1) return -1;
        return arr[front];
    }

    public int Rear() {
        if (rear == -1) return -1;
        return arr[rear];
    }

    public boolean isEmpty() {
        return front == -1;
    }

    public boolean isFull() {
        return (rear + 1) % capacity == front;
    }
}
```

---

## ✅ 6. **Queue using Stack (Interview Question)**

> Implement a queue using 2 stacks.

### 💡 Logic:

* Use two stacks: `in` for enqueue, `out` for dequeue.
* When dequeue, move all elements from `in` to `out` if `out` is empty.

### 📌 Code:

```java
import java.util.Stack;

class MyQueue {
    Stack<Integer> in = new Stack<>();
    Stack<Integer> out = new Stack<>();

    public void enqueue(int x) {
        in.push(x);
    }

    public int dequeue() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) {
                out.push(in.pop());
            }
        }
        return out.isEmpty() ? -1 : out.pop();
    }

    public int peek() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) {
                out.push(in.pop());
            }
        }
        return out.isEmpty() ? -1 : out.peek();
    }

    public boolean isEmpty() {
        return in.isEmpty() && out.isEmpty();
    }
}
```

---

## ✅ 7. **Priority Queue (Min/Max Heap)**

* Elements are ordered based on **priority**
* Java: `PriorityQueue` uses a **min-heap** by default

### Example:

```java
import java.util.PriorityQueue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(); // min heap

        pq.add(30);
        pq.add(10);
        pq.add(20);

        while (!pq.isEmpty()) {
            System.out.println(pq.poll()); // 10 20 30
        }
    }
}
```

For max-heap:

```java
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
```

---

## ✅ 8. **Deque (Double Ended Queue)**

* Add/remove elements from **both ends**

```java
import java.util.*;

public class DequeExample {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();

        dq.addFirst(10);
        dq.addLast(20);
        dq.addFirst(5);
        System.out.println(dq); // [5, 10, 20]

        dq.removeLast();
        System.out.println(dq); // [5, 10]
    }
}
```

---

## ✅ 9. **Real-World Queue Problems**

| Problem                    | Description     |
| -------------------------- | --------------- |
| 🔁 Sliding Window Maximum  | Use deque       |
| 📶 Rotten Oranges (BFS)    | Use queue       |
| 🧮 Generate Binary Numbers | Use queue       |
| 🌉 Bridge Crossing         | Use queue       |
| 🌐 Level Order Traversal   | BFS using queue |

---

## ✅ 10. **Queue Complexity**

| Operation | Time Complexity              |
| --------- | ---------------------------- |
| Enqueue   | O(1) (LinkedList/ArrayDeque) |
| Dequeue   | O(1)                         |
| Peek      | O(1)                         |
| isEmpty   | O(1)                         |

---

Would you like me to continue with **interview problems** or **implement your own custom Queue class** with all features?

Let me know your next goal!
