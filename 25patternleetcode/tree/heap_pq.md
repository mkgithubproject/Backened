Let's make sure you **never forget** Heap and Priority Queue (PQ) in DSA. We'll use **visuals, stories, real-life metaphors**, and **code examples**.
By the end, you’ll know:

* ✅ What is a Heap?
* ✅ How does Priority Queue work?
* ✅ How are they related?
* ✅ Insertion & Deletion (with diagrams!)
* ✅ Real problems solved using heaps.

---

## 🔶 1. Imagine a Magic Queue...

You go to the hospital. People are not treated **first-come-first-serve**. Instead:

* A person with a **heart attack** (priority 10) is treated before a **headache** (priority 2).
* This is a **Priority Queue (PQ)** – things are served based on **priority**.

---

## 🔶 2. Priority Queue uses a **Heap**

A **Heap** is the **engine** that powers a Priority Queue.

* A **Heap** is a **complete binary tree**:

  * Completely filled from top to bottom, left to right.
* And follows the **Heap Property**:

  * In **Min-Heap**: Parent ≤ Children → smallest at top.
  * In **Max-Heap**: Parent ≥ Children → largest at top.

> 💡 Think of Heap as a **pyramid of values** with strict order.

---

## 🔶 3. Visual of a Min-Heap

```
       1
     /   \
    3     5
   / \   / \
  4   8 6   9
```

* Every parent is smaller than its children.
* So, 1 is the **highest priority**.

---

## 🔶 4. Implementing Heap in Code (Array)

Why array? Because you can **map the tree to an array**:

```
Index:  0  1  2  3  4  5  6
Array: [1, 3, 5, 4, 8, 6, 9]
```

Formula:

* **Parent(i)** = `floor((i-1)/2)`
* **Left(i)** = `2i + 1`
* **Right(i)** = `2i + 2`

---

## 🔶 5. INSERT in Min Heap (Visual + Explanation)

Let’s insert `2` into this heap:

Before:

```
       1
     /   \
    3     5
   / \   / \
  4  8  6  9
```

Insert 2 at the bottom:

```
       1
     /   \
    3     5
   / \   / \
  4  8  6  9
 /
2
```

**Now, heapify up (bubble-up)**:

* 2 < 4 → swap
* 2 < 3 → swap
  Now:

```
       1
     /   \
    2     5
   / \   / \
  3  8  6  9
 /
4
```

---

## 🔶 6. DELETE (Pop Min)

Pop the root `1`:

1. Replace root with the last element `4`
2. Heapify Down:

Before:

```
       4
     /   \
    2     5
   / \   / \
  3  8  6  9
```

* 4 > 2 → swap
* 4 > 3 → no need

Result:

```
       2
     /   \
    4     5
   / \   / \
  3  8  6  9
```

---

## 🔶 7. Priority Queue Real Use-Cases

* 🏥 Hospital system (high priority = critical patient)
* 📱 Task scheduling in OS (shortest job first = min heap)
* 📶 Network packet prioritization
* 📊 Top K problems (like Top K frequent numbers)

---

## 🔶 8. Java Priority Queue Code (Min Heap)

```java
import java.util.*;

public class MinHeapExample {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        minHeap.add(5);
        minHeap.add(1);
        minHeap.add(9);
        minHeap.add(2);

        while (!minHeap.isEmpty()) {
            System.out.println(minHeap.poll());  // 1, 2, 5, 9
        }
    }
}
```

### Want Max-Heap?

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
```

---

## 🔶 9. Java Heap Implementation (Min-Heap): Insertion & Deletion

```java
class MinHeap {
    private int[] heap;
    private int size;
    private int capacity;

    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }

    private int parent(int i) { return (i - 1) / 2; }
    private int left(int i) { return 2 * i + 1; }
    private int right(int i) { return 2 * i + 2; }

    public void insert(int value) {
        if (size == capacity) throw new IllegalStateException("Heap is full");
        heap[size] = value;
        int current = size;
        size++;

        while (current > 0 && heap[current] < heap[parent(current)]) {
            swap(current, parent(current));
            current = parent(current);
        }
    }

    public int removeMin() {
        if (size == 0) throw new IllegalStateException("Heap is empty");
        int min = heap[0];
        heap[0] = heap[--size];
        heapify(0);
        return min;
    }

    private void heapify(int i) {
        int smallest = i;
        int l = left(i);
        int r = right(i);

        if (l < size && heap[l] < heap[smallest]) smallest = l;
        if (r < size && heap[r] < heap[smallest]) smallest = r;

        if (smallest != i) {
            swap(i, smallest);
            heapify(smallest);
        }
    }

    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}

// Example usage:
class HeapTest {
    public static void main(String[] args) {
        MinHeap heap = new MinHeap(10);
        heap.insert(4);
        heap.insert(2);
        heap.insert(7);
        heap.insert(1);

        System.out.println(heap.removeMin());  // 1
        System.out.println(heap.removeMin());  // 2
    }
}
```

---

## 🔶 10. Interview Problems Solved with Heap

### ✅ 1. **Kth Largest Element in Array**

→ Use Min-Heap of size K.

### ✅ 2. **Merge K Sorted Lists**

→ Use Min-Heap to always pick smallest element from K lists.

### ✅ 3. **Top K Frequent Elements**

→ Use Max-Heap based on frequency.

---

## 🔶 11. Golden Summary (NEVER FORGET)

| Concept        | Meaning                                                               |
| -------------- | --------------------------------------------------------------------- |
| Heap           | Complete binary tree with min/max at top                              |
| Min-Heap       | Parent ≤ Children                                                     |
| Max-Heap       | Parent ≥ Children                                                     |
| Priority Queue | Queue where high-priority items come out first (uses heap)            |
| Use Cases      | Task scheduling, top K, Dijkstra’s algo, streaming data               |
| Java Structure | `PriorityQueue<Integer> pq = new PriorityQueue<>();` (Min by default) |

---

Want animated **GIFs or interactive heap visualizer** next? Or want to try some real problems step by step with me?
