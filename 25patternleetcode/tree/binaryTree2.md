Here's a **complete guide to Binary Tree in Java** — with clear **concepts, examples**, how to **take input**, and how to **print the tree**.

---

## 🧠 Binary Tree Concepts

A **Binary Tree** is a tree data structure where each node has at most **two children**, referred to as the **left** and **right** child.

### 💡 Key Terminologies:

* **Root** – top node of the tree
* **Leaf Node** – a node with no children
* **Subtree** – any node with its children is a subtree
* **Depth** – number of edges from the root to the node
* **Height** – number of edges from the node to the deepest leaf

---

## 🌳 Binary Tree Node Structure in Java

```java
class TreeNode {
    int data;
    TreeNode left;
    TreeNode right;

    TreeNode(int data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
```

---

## 📥 Input Binary Tree from User (Level Order - BFS)

```java
import java.util.*;

public class BinaryTreeInput {
    
    public static TreeNode takeInputLevelOrder() {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter root node: ");
        int rootData = sc.nextInt();
        if (rootData == -1) return null;

        TreeNode root = new TreeNode(rootData);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();

            System.out.print("Enter left child of " + current.data + ": ");
            int leftData = sc.nextInt();
            if (leftData != -1) {
                current.left = new TreeNode(leftData);
                queue.add(current.left);
            }

            System.out.print("Enter right child of " + current.data + ": ");
            int rightData = sc.nextInt();
            if (rightData != -1) {
                current.right = new TreeNode(rightData);
                queue.add(current.right);
            }
        }

        return root;
    }
}
```

Input Format:

* Enter `-1` if the node is `null`

---

## 🖨️ Print Binary Tree (Level Order)

```java
public static void printLevelOrder(TreeNode root) {
    if (root == null) return;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        System.out.print(current.data + ": ");

        if (current.left != null) {
            System.out.print("L" + current.left.data + " ");
            queue.add(current.left);
        }
        if (current.right != null) {
            System.out.print("R" + current.right.data + " ");
            queue.add(current.right);
        }

        System.out.println();
    }
}
```

---

## 🔁 Binary Tree Traversals

### 1. Preorder (Root → Left → Right)

```java
public static void preorder(TreeNode root) {
    if (root == null) return;
    System.out.print(root.data + " ");
    preorder(root.left);
    preorder(root.right);
}
```

### 2. Inorder (Left → Root → Right)

```java
public static void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.data + " ");
    inorder(root.right);
}
```

### 3. Postorder (Left → Right → Root)

```java
public static void postorder(TreeNode root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.data + " ");
}
```

### 4. Level Order (Breadth-First Search)

```java
public static void levelOrder(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        TreeNode curr = queue.poll();
        System.out.print(curr.data + " ");
        if (curr.left != null) queue.add(curr.left);
        if (curr.right != null) queue.add(curr.right);
    }
}
```

---

## 📌 Other Important Topics in Binary Trees

| Topic                        | Description                             |
| ---------------------------- | --------------------------------------- |
| Height of Tree               | Max depth from root                     |
| Count Nodes                  | Total number of nodes                   |
| Sum of Nodes                 | Sum of all node values                  |
| Diameter                     | Longest path between any two nodes      |
| Is Balanced                  | Check height difference of subtrees ≤ 1 |
| Mirror Tree                  | Flip the left and right children        |
| Lowest Common Ancestor       | First common parent of two nodes        |
| Check Identical Trees        | Whether two trees are same              |
| Tree from Inorder & Preorder | Construct tree using traversals         |

---

## 📦 Example Usage

```java
public class BinaryTreeExample {
    public static void main(String[] args) {
        TreeNode root = BinaryTreeInput.takeInputLevelOrder();

        System.out.println("\nLevel Order Print:");
        printLevelOrder(root);

        System.out.print("\nPreorder: ");
        preorder(root);

        System.out.print("\nInorder: ");
        inorder(root);

        System.out.print("\nPostorder: ");
        postorder(root);
    }
}
```

---

## ✅ Sample Input/Output

### Input:

```
Enter root node: 1
Enter left child of 1: 2
Enter right child of 1: 3
Enter left child of 2: 4
Enter right child of 2: 5
Enter left child of 3: -1
Enter right child of 3: 6
```

### Output:

```
Level Order Print:
1: L2 R3
2: L4 R5
3: R6
4:
5:
6:

Preorder: 1 2 4 5 3 6
Inorder: 4 2 5 1 3 6
Postorder: 4 5 2 6 3 1
```

---

Here's how to **take input for a binary tree using DFS (Depth-First Search)** style — specifically using **preorder traversal** logic — and I’ll update your document accordingly.

---

### ✅ DFS-Based Binary Tree Input (Preorder Style)

In DFS input (recursive style), we input the **root**, then **left subtree**, then **right subtree** — similar to **preorder traversal**.

### 📥 Code: DFS Input Using Recursion

```java
import java.util.*;

public class BinaryTreeDFSInput {

    static Scanner sc = new Scanner(System.in);

    public static TreeNode takeInputDFS() {
        System.out.print("Enter node data (-1 for null): ");
        int data = sc.nextInt();
        if (data == -1) return null;

        TreeNode node = new TreeNode(data);
        node.left = takeInputDFS();   // Recursively build left subtree
        node.right = takeInputDFS();  // Recursively build right subtree
        return node;
    }
}
```

### 🧠 How This Works:

* Ask user for a value.
* If `-1`, return `null` (represents no node).
* Otherwise, create a node and recursively build the **left subtree** and then the **right subtree**.

---

### 🧪 Sample Input (DFS):

Input this when prompted:

```
1 2 4 -1 -1 5 -1 -1 3 -1 6 -1 -1
```

This represents:

```
        1
       / \
      2   3
     / \   \
    4   5   6
```

### 📤 Output Traversal for Verification:

Great follow-up!

---

## 🌲 Height of a Binary Tree

The **height** of a binary tree is defined as the **number of edges** on the **longest path from the root node to any leaf node**.

> ⚠️ Note: Some definitions count **nodes** instead of **edges** — so depending on your use case:

* **Height by edges** (common in competitive programming) = longest path in edges
* **Height by nodes** = longest path in nodes

We’ll assume **height by edges** here.

---

### ✅ Example:

```
        1
       / \
      2   3
     /
    4
```

* Longest path from root to a leaf: `1 → 2 → 4`
* Number of **edges** = 2
* ➤ So, **height = 2**

---

## 📘 Java Code: Height of Binary Tree

```java
public static int height(TreeNode root) {
    if (root == null) return -1; // return 0 if counting height by nodes

    int leftHeight = height(root.left);
    int rightHeight = height(root.right);

    return 1 + Math.max(leftHeight, rightHeight);
}
```

---

### 🔍 Explanation:

* For each node, recursively compute the height of left and right subtrees.
* The height of the tree is `1 + max(leftHeight, rightHeight)`.

---

### 📤 Sample Usage:

```java
System.out.println("Height of the tree: " + height(root));
```

---

### 🔄 Time Complexity:

* **O(n)** — visits every node once

---




