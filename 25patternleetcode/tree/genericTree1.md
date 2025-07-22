A **Generic Tree** is a tree data structure in which each node can have **any number of children** (unlike a binary tree, where each node has at most 2 children).

Let’s go step by step to understand how to:

1. **Define a Generic Tree Node**
2. **Take Input (Recursive / Level-wise)**
3. **Print the Tree (Recursive)**

---

### ✅ 1. Define a Generic Tree Node Class

```java
import java.util.ArrayList;

class TreeNode<T> {
    T data;
    ArrayList<TreeNode<T>> children;

    TreeNode(T data) {
        this.data = data;
        children = new ArrayList<>();
    }
}
```

- `T` is the generic type (could be Integer, String, etc.)
- `children` is a dynamic list storing references to all child nodes.

---

### ✅ 2. Take Input (Recursive Approach)

```java
import java.util.Scanner;

public class GenericTreeInput {

    public static TreeNode<Integer> takeInput(Scanner sc) {
        System.out.print("Enter node data: ");
        int data = sc.nextInt();
        TreeNode<Integer> node = new TreeNode<>(data);

        System.out.print("Enter number of children for " + data + ": ");
        int numChildren = sc.nextInt();

        for (int i = 0; i < numChildren; i++) {
            TreeNode<Integer> child = takeInput(sc); // Recursively take input
            node.children.add(child);
        }

        return node;
    }
}
```

---

### ✅ 2. Take Input (Level-wise Approach)

```java
import java.util.*;

public class GenericTreeLevelWiseInput {

    public static TreeNode<Integer> takeInputLevelWise(Scanner sc) {
        System.out.print("Enter root node data: ");
        int rootData = sc.nextInt();
        TreeNode<Integer> root = new TreeNode<>(rootData);

        Queue<TreeNode<Integer>> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            TreeNode<Integer> currentNode = queue.poll();
            System.out.print("Enter number of children for " + currentNode.data + ": ");
            int numChildren = sc.nextInt();

            for (int i = 0; i < numChildren; i++) {
                System.out.print("Enter data for child " + (i + 1) + " of " + currentNode.data + ": ");
                int childData = sc.nextInt();
                TreeNode<Integer> child = new TreeNode<>(childData);
                currentNode.children.add(child);
                queue.add(child);
            }
        }

        return root;
    }
}
```

---

### ✅ 3. Print the Tree (Recursive)

```java
public class GenericTreePrint {

    public static void printTree(TreeNode<Integer> root) {
        if (root == null) return;

        // Print current node and its children
        System.out.print(root.data + ": ");
        for (TreeNode<Integer> child : root.children) {
            System.out.print(child.data + " ");
        }
        System.out.println();

        // Recursively print each subtree
        for (TreeNode<Integer> child : root.children) {
            printTree(child);
        }
    }
}
```

---

### ✅ 4. Main Method to Run It All

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Option 1: Recursive Input
        // TreeNode<Integer> root = GenericTreeInput.takeInput(sc);

        // Option 2: Level-wise Input
        TreeNode<Integer> root = GenericTreeLevelWiseInput.takeInputLevelWise(sc);

        System.out.println("\nTree Structure:");
        GenericTreePrint.printTree(root);

        sc.close();
    }
}
```

---

### 📌 Sample Input / Output (Recursive or Level-wise)

**Input:**
```
Enter root node data: 1
Enter number of children for 1: 2
Enter data for child 1 of 1: 2
Enter data for child 2 of 1: 3
Enter number of children for 2: 0
Enter number of children for 3: 1
Enter data for child 1 of 3: 4
Enter number of children for 4: 0
```

**Output:**
```
Tree Structure:
1: 2 3 
2: 
3: 4 
4:
```

---
