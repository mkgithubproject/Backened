
Sure! Let’s break down **Backtracking** in a clear, beginner-friendly way, with step-by-step theory and **Java** examples.

---

## ✅ What is Backtracking?

Backtracking is a **brute-force search algorithm** that tries out all possible solutions and **undoes (backtracks)** a choice if it doesn’t lead to a solution.

> It is used in problems where:

* You need to find all solutions (or one valid solution)
* Each step has multiple choices
* Some choices lead to dead ends

---

## ✅ Steps of Backtracking

1. Choose a possible option.
2. Recur with that choice.
3. If the choice leads to a solution, return.
4. If it doesn’t, undo (backtrack) the choice and try another.

---

## 🔁 Backtracking Flow (Pseudocode)

```java
void backtrack(state) {
    if (goalReached(state)) {
        saveOrPrintSolution(state);
        return;
    }

    for (choice in allPossibleChoices) {
        if (isValid(choice, state)) {
            makeChoice(state, choice);
            backtrack(state);
            undoChoice(state, choice); // backtrack
        }
    }
}
```

---

## 🧠 Common Problems Using Backtracking

| Problem             | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| N-Queens            | Place N queens on an NxN board such that no two queens attack each other |
| Sudoku Solver       | Fill a Sudoku grid so every row, column, and block has digits 1-9        |
| Subsets / Power Set | Generate all subsets of a given set                                      |
| Permutations        | All arrangements of a string or numbers                                  |
| Rat in a Maze       | Find all paths from top-left to bottom-right in a maze                   |

---

## 🔷 Example 1: Generate All Subsets (Power Set)

### Problem:

Given an array `nums`, return all possible subsets.

### Input:

```
nums = [1, 2]
```

### Output:

```
[[]
[1]
[1, 2]
[2]]
```

### Code:

```java
import java.util.*;

public class SubsetsBacktracking {
    public static void main(String[] args) {
        int[] nums = {1, 2};
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);

        System.out.println("All subsets:");
        for (List<Integer> subset : result) {
            System.out.println(subset);
        }
    }

    // Recursive backtracking function
    static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current)); // Add the current subset to the result

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);                     // Choose
            backtrack(nums, i + 1, current, result);  // Explore
            current.remove(current.size() - 1);       // Backtrack (un-choose)
        }
    }
}
```
Let's **dry run** the `SubsetsBacktracking` code step by step for the input:

```java
int[] nums = {1, 2};
```

---

## 🔍 GOAL:

Generate **all subsets (the power set)** of `{1, 2}` using backtracking.

---

### ✅ FUNCTION SIGNATURE:

```java
backtrack(nums, start, currentSubset, resultList)
```

* `nums`: input array → `{1, 2}`
* `start`: current index in array to consider
* `current`: current subset being built
* `result`: list of all subsets found so far

---

## 🔁 DRY RUN

### Initial call:

```java
backtrack({1, 2}, 0, [], result)
```

### Step-by-step recursion:

#### 1️⃣ Call: `backtrack(nums, 0, [], result)`

* Add `[]` to result
* Loop from i = 0 to 1

##### ➤ i = 0:

* Choose `1` → current = `[1]`
* Call: `backtrack(nums, 1, [1], result)`

---

#### 2️⃣ Call: `backtrack(nums, 1, [1], result)`

* Add `[1]` to result
* Loop from i = 1 to 1

##### ➤ i = 1:

* Choose `2` → current = `[1, 2]`
* Call: `backtrack(nums, 2, [1, 2], result)`

---

#### 3️⃣ Call: `backtrack(nums, 2, [1, 2], result)`

* Add `[1, 2]` to result
* `start = 2` equals `nums.length` → return

⏪ Backtrack: remove `2` → current = `[1]`

---

⏪ Backtrack again: remove `1` → current = `[]`

##### ➤ Now back to 1st call, i = 1:

* Choose `2` → current = `[2]`
* Call: `backtrack(nums, 2, [2], result)`

---

#### 4️⃣ Call: `backtrack(nums, 2, [2], result)`

* Add `[2]` to result
* `start = 2` → return

⏪ Backtrack: remove `2` → current = `[]`

---

## ✅ FINAL RESULT LIST:

```
[]
[1]
[1, 2]
[2]
```

---

## 📌 TREE STRUCTURE OF BACKTRACKING PATHS

```
        []
       /  \
     [1]  [2]
     /      \
  [1,2]     X
```

Each node is a recursive call, and each edge is a decision to include or exclude a number.

---

## 📦 Summary:

| Call Stack | Current Subset | Result List So Far      |
| ---------- | -------------- | ----------------------- |
| 0          | `[]`           | `[[]]`                  |
| 1          | `[1]`          | `[[], [1]]`             |
| 2          | `[1,2]`        | `[[], [1], [1,2]]`      |
| 3 (back)   | `[1]`          | —                       |
| 4          | `[2]`          | `[[], [1], [1,2], [2]]` |

Let me know if you want a **dry run tree diagram** or a **visual trace** for deeper understanding.

---

## 🔷 Example 2: String Permutations

### Problem:

Generate all permutations of a given string `"ABC"`.

### Input:

```
str = "ABC"
```

### Output:

```
ABC
ACB
BAC
BCA
CAB
CBA
```

### Code:

```java
public class StringPermutations {
    public static void main(String[] args) {
        String str = "ABC";
        permute("", str);
    }

    // Recursive function to generate permutations
    static void permute(String prefix, String remaining) {
        if (remaining.length() == 0) {
            System.out.println(prefix); // A complete permutation
            return;
        }

        for (int i = 0; i < remaining.length(); i++) {
            String newPrefix = prefix + remaining.charAt(i); // Choose a character
            String newRemaining = remaining.substring(0, i) + remaining.substring(i + 1); // Remove it from remaining
            permute(newPrefix, newRemaining); // Explore
        }
    }
}
```

---

## 🔷 Example 3: N-Queens (Simplified for N = 4)

### Problem:

Place 4 queens on a 4x4 board so that no two queens attack each other.

### Output:

```
Q . . . 
. . Q . 
. . . . 
. Q . . 
```

(Each "Q" is a queen, and no two queens are in the same row, column, or diagonal.)

### Code:

```java
public class NQueens {
    static int N = 4;

    public static void main(String[] args) {
        int[][] board = new int[N][N];
        solve(board, 0);
    }

    // Recursive function to solve N-Queens problem
    static boolean solve(int[][] board, int row) {
        if (row == N) {
            printBoard(board); // If all rows are filled, print the board
            System.out.println();
            return true; // Return false here to find all solutions
        }

        for (int col = 0; col < N; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 1; // Place queen
                if (solve(board, row + 1)) return true; // Recur
                board[row][col] = 0; // Backtrack
            }
        }

        return false;
    }

    // Check if placing a queen is safe
    static boolean isSafe(int[][] board, int row, int col) {
        for (int i = 0; i < row; i++) // Check column
            if (board[i][col] == 1) return false;

        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) // Check upper-left diagonal
            if (board[i][j] == 1) return false;

        for (int i = row, j = col; i >= 0 && j < N; i--, j++) // Check upper-right diagonal
            if (board[i][j] == 1) return false;

        return true;
    }

    // Utility function to print the board
    static void printBoard(int[][] board) {
        for (int[] row : board) {
            for (int val : row) {
                System.out.print((val == 1 ? "Q " : ". "));
            }
            System.out.println();
        }
    }
}
```

---

## ✅ Summary

| Concept          | Explanation                                               |
| ---------------- | --------------------------------------------------------- |
| **Backtracking** | Try → Recurse → Backtrack if failed                       |
| **Key Idea**     | Choose, Explore, Un-choose                                |
| **Used in**      | Subsets, Permutations, N-Queens, Sudoku                   |
| **Java Tip**     | Use recursion + `List`, `Array`, `Set` for tracking state |

---

Would you like me to:

* Continue with Sudoku Solver or Rat in Maze?
* Create practice questions with solutions?
* Provide notes in markdown or PDF format?

Let me know how you want to continue learning backtracking.
