Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It is used when a problem has:

1. **Overlapping subproblems**
2. **Optimal substructure**

Let’s go step by step through **all major DP concepts** with **Java examples**, including **backtracking approach**, **DP optimization**, **tree recursion structure**, and **time/space complexity**.

---

## 🧠 1. What is Dynamic Programming?

Dynamic Programming is a technique to avoid redundant calculations by storing the results of subproblems. It can be implemented using:

* **Memoization** (Top-down)
* **Tabulation** (Bottom-up)

---

## 🧱 2. Key Concepts in DP

| Concept                     | Description                                                                   |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Overlapping Subproblems** | The same subproblems are solved multiple times.                               |
| **Optimal Substructure**    | The solution of the main problem depends on the solutions of its subproblems. |
| **Memoization**             | Caching the results of expensive function calls (Top-Down).                   |
| **Tabulation**              | Building up solutions from the base case (Bottom-Up).                         |
| **State**                   | Represents the subproblem or decision at a point.                             |
| **Transition**              | How to build the next state from previous ones.                               |

---

## 🟩 3. Fibonacci – Basic Example

### 🔁 Backtracking Tree (Recursion)

```
          fib(5)
         /      \
    fib(4)      fib(3)
   /     \      /    \
fib(3) fib(2) fib(2) fib(1)
...
```

Time Complexity: O(2^n)
Space Complexity: O(n) (due to call stack)

### ➤ Memoization (Top-Down)

```java
import java.util.*;

public class FibonacciMemo {
    static Map<Integer, Integer> memo = new HashMap<>();

    static int fib(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        int result = fib(n - 1) + fib(n - 2);
        memo.put(n, result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println(fib(10));  // Output: 55
    }
}
```

Time: O(n) | Space: O(n)

### ➤ Tabulation (Bottom-Up)

```java
public class FibonacciTab {
    public static int fib(int n) {
        if (n <= 1) return n;
        int[] dp = new int[n + 1];
        dp[0] = 0; dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println(fib(10));  // Output: 55
    }
}
```

Time: O(n) | Space: O(n)

---

## 🪜 4. Climbing Stairs (1D DP)

### 🔁 Backtracking Tree

```
climb(4)
├── climb(3)
│   ├── climb(2)
│   └── climb(1)
└── climb(2)
    ├── climb(1)
    └── climb(0)
```

Time: O(2^n) | Space: O(n)

### ➤ DP Tabulation

```java
public class ClimbStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1; dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(5));  // Output: 8
    }
}
```

Time: O(n) | Space: O(n)

---

## 🎒 5. 0/1 Knapsack (Classic DP)

### ➤ DP Tabulation

```java
public class Knapsack {
    public static int knapsack(int[] wt, int[] val, int W) {
        int n = wt.length;
        int[][] dp = new int[n+1][W+1];

        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (wt[i-1] <= w) {
                    dp[i][w] = Math.max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }

        return dp[n][W];
    }

    public static void main(String[] args) {
        int[] wt = {1, 3, 4, 5};
        int[] val = {1, 4, 5, 7};
        int W = 7;
        System.out.println(knapsack(wt, val, W));  // Output: 9
    }
}
```

Time: O(n*W) | Space: O(n*W)

---

## 📏 6. Longest Common Subsequence (2D DP)

### ➤ DP Tabulation

```java
public class LCS {
    public static int lcs(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        int[][] dp = new int[n+1][m+1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1))
                    dp[i][j] = 1 + dp[i-1][j-1];
                else
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }

        return dp[n][m];
    }

    public static void main(String[] args) {
        System.out.println(lcs("abcde", "ace"));  // Output: 3
    }
}
```

Time: O(n*m) | Space: O(n*m)

---

## 🌐 7. Grid Unique Paths (2D DP)

### ➤ DP Tabulation

```java
public class GridUniquePaths {
    public static int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];

        for (int i = 0; i < m; i++) dp[i][0] = 1;
        for (int j = 0; j < n; j++) dp[0][j] = 1;

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }

        return dp[m-1][n-1];
    }

    public static void main(String[] args) {
        System.out.println(uniquePaths(3, 3));  // Output: 6
    }
}
```

Time: O(m*n) | Space: O(m*n)

---

## 🧰 8. Tips to Solve DP Problems

1. **Identify the state** (what uniquely identifies a subproblem?)
2. **Define recurrence relation** (transition)
3. **Decide memoization or tabulation**
4. **Handle base cases**
5. **Optimize space if possible**

---

## 📚 9. Common DP Problems to Practice

| Problem                             | Type             |
| ----------------------------------- | ---------------- |
| Fibonacci                           | 1D DP            |
| Climbing Stairs                     | 1D DP            |
| House Robber                        | 1D DP            |
| LCS (Longest Common Subsequence)    | 2D DP            |
| Edit Distance                       | 2D DP            |
| Knapsack                            | DP with capacity |
| Subset Sum / Partition Equal Subset | DP with Boolean  |
| Coin Change                         | DP with Min/Max  |
| Palindrome Partitioning             | DP on String     |

---

Absolutely! Let's **clearly understand the difference** between:

> 🔁 **Memoization (Top-Down)** vs 📥 **Tabulation (Bottom-Up)**

These are two ways to apply **Dynamic Programming** — same goal, different direction.

---

## 🔁 Memoization (Top-Down)

> You start from the **main problem** and **recursively** break it into subproblems, **caching** answers as you go.

### 🔹 Characteristics:

* Uses **recursion**
* Uses a **cache** (HashMap or array)
* Starts **from the top** (e.g., `fib(n)` → `fib(n-1)` → `fib(n-2)`...)

---

### ✅ Fibonacci Example – Top-Down (Memoization)

```java
import java.util.*;

public class FibonacciMemo {
    static Map<Integer, Integer> memo = new HashMap<>();

    static int fib(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n); // cached
        int result = fib(n - 1) + fib(n - 2);         // recursive
        memo.put(n, result);                          // store result
        return result;
    }

    public static void main(String[] args) {
        System.out.println(fib(5));  // Output: 5
    }
}
```

---

### 🧠 How it works (calls flow):

```
fib(5)
├─ fib(4)
│  ├─ fib(3)
│  │  ├─ fib(2)
│  │  ├─ fib(1)
│  ├─ fib(2) [already computed]
├─ fib(3) [already computed]
```

* Calls go **deep recursively**
* Subresults are **memoized**
* Avoids redundant calls

---

### ⏱ Time: O(n) | 📦 Space: O(n)

* `n` unique values are computed once
* Call stack depth = O(n)

---

## 📥 Tabulation (Bottom-Up)

> You start from the **smallest subproblems**, and **build up** the answer in a table (usually an array).

### 🔹 Characteristics:

* Uses **loops** (not recursion)
* Uses a **DP array** to store results
* Solves problems in **order from smallest to largest**

---

### ✅ Fibonacci Example – Bottom-Up (Tabulation)

```java
public class FibonacciTab {
    public static int fib(int n) {
        if (n <= 1) return n;

        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2]; // build up
        }

        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println(fib(5));  // Output: 5
    }
}
```

---

### 🧠 How it works (values built step by step):

```
dp[0] = 0
dp[1] = 1
dp[2] = dp[1] + dp[0] = 1
dp[3] = dp[2] + dp[1] = 2
dp[4] = dp[3] + dp[2] = 3
dp[5] = dp[4] + dp[3] = 5
```

---

### ⏱ Time: O(n) | 📦 Space: O(n)

* Just one loop, no recursion
* Can reduce space to O(1) if only last 2 values needed

---

## 🆚 Summary Table

| Feature             | Memoization (Top-Down)      | Tabulation (Bottom-Up)     |
| ------------------- | --------------------------- | -------------------------- |
| Approach            | Recursive (Top-Down)        | Iterative (Bottom-Up)      |
| Subproblem Order    | On-demand                   | Precomputed in order       |
| Caching             | Uses HashMap/Array          | Uses Array                 |
| Call Stack Usage    | Yes (recursion)             | No recursion               |
| Easier to write     | For recursive problems      | May need to figure order   |
| Space Optimization  | Harder (uses stack + cache) | Easier (just reduce array) |
| Speed (in practice) | Slightly slower             | Usually faster             |

---

## 🧪 When to Use What?

| If problem is...                       | Use...      |
| -------------------------------------- | ----------- |
| Naturally recursive (tree/DFS-like)    | Memoization |
| Can define exact order of computation  | Tabulation  |
| You want to reduce call stack overhead | Tabulation  |

---

Would you like me to:

* Insert this comparison + diagrams into your DP document?
* Add an optimized **O(1) space** version of Fibonacci (bottom-up)?
* Continue to the next topic (like `ClimbStairs` memoization vs tabulation)?

Let me know!


