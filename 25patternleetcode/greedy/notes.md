Greedy algorithms are a popular approach in **Data Structures and Algorithms (DSA)** for solving optimization problems. Let’s go step by step with theory, examples, and some common patterns used in greedy problems.

---

## 🧠 **What is a Greedy Algorithm?**

A **Greedy Algorithm** builds up a solution piece by piece, **always choosing the next piece that offers the most immediate benefit** (locally optimal), hoping this leads to a globally optimal solution.

> It does not revise its decisions even if the choice leads to a worse outcome later.

---

## ✅ **When to Use Greedy Algorithms**

Use Greedy when:

* You can make a **locally optimal choice** and it leads to a **globally optimal solution**.
* The problem **has the greedy-choice property and optimal substructure**.

---

## 🧪 Properties

1. **Greedy Choice Property**: A global optimal can be arrived at by choosing a local optimum.
2. **Optimal Substructure**: Optimal solution of the problem contains optimal solutions to subproblems.

---

## 🧾 **Classic Examples of Greedy Algorithms**

| Problem                            | Description                                   | Greedy Strategy                                        |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| **Activity Selection**             | Maximize number of non-overlapping activities | Always choose the activity that finishes earliest      |
| **Fractional Knapsack**            | Maximize value with weight capacity           | Choose item with highest value/weight ratio            |
| **Huffman Coding**                 | Minimum prefix code tree                      | Merge two least frequent characters repeatedly         |
| **Job Sequencing with Deadlines**  | Maximize profit with deadlines                | Sort jobs by profit, assign latest possible slot       |
| **Minimum Number of Coins**        | Fewest coins to make a value                  | Always pick the largest coin value <= remaining        |
| **Prim’s and Kruskal’s Algorithm** | Find Minimum Spanning Tree                    | Pick edge with lowest weight that doesn’t form a cycle |

---

## 💡 Example 1: Activity Selection Problem

```java
import java.util.*;

class Activity {
    int start, end;
    Activity(int s, int e) {
        start = s;
        end = e;
    }
}

public class GreedyActivitySelection {
    public static void main(String[] args) {
        Activity[] activities = {
            new Activity(1, 3),
            new Activity(2, 5),
            new Activity(4, 7),
            new Activity(6, 9),
            new Activity(8, 10)
        };

        Arrays.sort(activities, Comparator.comparingInt(a -> a.end)); // sort by end time

        int count = 1;
        int lastEnd = activities[0].end;
        System.out.println("Selected activity: (" + activities[0].start + ", " + activities[0].end + ")");

        for (int i = 1; i < activities.length; i++) {
            if (activities[i].start >= lastEnd) {
                count++;
                lastEnd = activities[i].end;
                System.out.println("Selected activity: (" + activities[i].start + ", " + activities[i].end + ")");
            }
        }

        System.out.println("Total activities selected: " + count);
    }
}
```

---

## 🧩 Common Greedy Algorithm Patterns

### 1. **Sorting-Based Decisions**

* Sort data based on a key (end time, value/weight ratio, frequency).
* Make a greedy choice from sorted data.

### 2. **Interval Scheduling**

* Choose earliest finishing job, or earliest starting, etc.

### 3. **Greedy on Graphs**

* MST (Prim’s, Kruskal’s), Dijkstra’s algorithm.

### 4. **Greedy with Heaps**

* Useful for frequency-based greedy (e.g. rearranging characters, Huffman).

---

## ⚠️ Greedy ≠ Always Correct

Greedy is fast but may **not always give optimal** solutions unless:

* You prove **greedy choice + optimal substructure** hold.

For example:

* ❌ **0/1 Knapsack** cannot be solved greedily.
* ✅ **Fractional Knapsack** can be solved greedily.

---

## 📚 Practice Problems (on LeetCode / GeeksforGeeks)

1. **Jump Game** – Leetcode #55
2. **Gas Station** – Leetcode #134
3. **Candy Distribution** – Leetcode #135
4. **Minimum Number of Arrows to Burst Balloons**
5. **Merge Intervals**
6. **Greedy Florist** – HackerRank

---

Great! Let’s take **visual dry run diagrams** of two classic Greedy problems to understand the **core idea of Greedy Algorithms**.

---

# 🧠 Problem 1: **Activity Selection Problem**

### 🎯 Goal:

Select the **maximum number of activities** that don’t overlap.

### 📘 Input:

Each activity has a `start` and `end` time. Only **one activity at a time** can be performed.

---

### ✅ Greedy Strategy:

* **Sort** all activities by their **end time**.
* Always pick the next activity that starts **after or when** the last selected activity ends.

---

### 🧪 Example:

| Activity | Start | End |
| -------- | ----- | --- |
| A1       | 1     | 3   |
| A2       | 2     | 5   |
| A3       | 4     | 7   |
| A4       | 6     | 9   |
| A5       | 8     | 10  |

---

### ✅ Step 1: Sort by end time

→ Sorted order (same as input here)

```
A1(1-3), A2(2-5), A3(4-7), A4(6-9), A5(8-10)
```

---

### ✅ Step 2: Pick the first activity A1

```
Selected: A1(1-3)
```

---

### ✅ Step 3: Traverse & Select Next Non-Overlapping Activities

| Current Activity | Can Start After Last End? | Add to Result? |
| ---------------- | ------------------------- | -------------- |
| A2 (2-5)         | 2 < 3 ❌                   | No             |
| A3 (4-7)         | 4 ≥ 3 ✅                   | Yes            |
| A4 (6-9)         | 6 < 7 ❌                   | No             |
| A5 (8-10)        | 8 ≥ 7 ✅                   | Yes            |

---

### ✅ Final Selection:

```
A1(1-3) → A3(4-7) → A5(8-10)
```

---

### 📊 Visual Diagram

```plaintext
Timeline:
|----A1----|     |----A3----|     |----A5----|
1         3     4         7     8         10

X--X--X--X--X--X--X--X--X--X--X--X--X--X--X--X
0     2     4     6     8     10

[✓] A1 (1-3)
[✗] A2 (2-5)  — overlaps with A1
[✓] A3 (4-7)
[✗] A4 (6-9)  — overlaps with A3
[✓] A5 (8-10)
```

🟢 Total Selected Activities: **3**

---

# 🧠 Problem 2: **Fractional Knapsack**

### 🎯 Goal:

Maximize total value by putting items (can be split) into a knapsack of given capacity.

---

### ✅ Greedy Strategy:

* Sort items by **value/weight** ratio (highest first).
* Pick full item if fits; otherwise pick fraction.

---

### 🧪 Example:

Knapsack capacity = **50**

| Item | Value | Weight | Ratio (V/W) |
| ---- | ----- | ------ | ----------- |
| I1   | 60    | 10     | 6.0         |
| I2   | 100   | 20     | 5.0         |
| I3   | 120   | 30     | 4.0         |

---

### ✅ Step 1: Sort by Ratio (High → Low)

```
I1 (6.0), I2 (5.0), I3 (4.0)
```

---

### 📊 Dry Run Table:

| Item | Take Full? | Taken Weight | Value Gained |
| ---- | ---------- | ------------ | ------------ |
| I1   | Yes        | 10           | 60           |
| I2   | Yes        | 20           | 100          |
| I3   | 20/30      | 20           | 80           |

Total weight used: 50
Total value: **60 + 100 + 80 = 240**

---

### 📊 Visual Diagram:

```plaintext
Knapsack Capacity: [50 units]

[==I1==] (10 units, value 60)
[======I2======] (20 units, value 100)
[========I3/partial========] (20 units of 30, value 80)

Final Total Value = 240
```

---

Would you like:

* **Heap Insert/Delete visual dry run**
* More **Greedy with graph** examples (like Prim’s/Kruskal’s)
* Or to practice a greedy coding problem together with explanation?

Let me know!

