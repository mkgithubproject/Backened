Let's cover **Binary Search Tree (BST)** in **Java** from **theory to implementation**, including:

---

### ✅ Topics We'll Cover:

1. **What is a Binary Search Tree?**
2. **Properties of BST**
3. **Basic Operations**

   * Insert
   * Search
   * Delete
4. **Tree Traversals**

   * Inorder (LNR)
   * Preorder (NLR)
   * Postorder (LRN)
   * Level Order (BFS)
5. **Take Input & Print Tree**
6. **Min/Max Node**
7. **Height of Tree**
8. **Check if Valid BST**
9. **Sample Driver Code**

---

## 🧠 1. What is a Binary Search Tree?

A **Binary Search Tree (BST)** is a binary tree where:

* The **left subtree** contains only nodes with **values less than** the parent node.
* The **right subtree** contains only nodes with **values greater than** the parent node.
* No duplicate nodes (optional rule).

---

## ✅ 2. Properties of BST

| Property          | Description                                  |
| ----------------- | -------------------------------------------- |
| Time Complexity   | Avg: O(log n), Worst: O(n) (for skewed tree) |
| Space Complexity  | O(n) for storing n nodes                     |
| Inorder Traversal | Returns sorted order                         |

---

## 🛠 3. Node & BST Class

```java
// Node Class
class Node {
    int data;
    Node left, right;

    public Node(int data) {
        this.data = data;
        left = right = null;
    }
}
```

---

## 📦 4. BST Operations

```java
class BST {
    Node root;

    // Insert Node
    Node insert(Node root, int data) {
        if (root == null) return new Node(data);

        if (data < root.data)
            root.left = insert(root.left, data);
        else if (data > root.data)
            root.right = insert(root.right, data);

        return root;
    }

    // Search Node
    boolean search(Node root, int key) {
        if (root == null) return false;
        if (root.data == key) return true;

        return key < root.data ? search(root.left, key) : search(root.right, key);
    }

    // Min Value
    Node minValueNode(Node root) {
        Node current = root;
        while (current != null && current.left != null)
            current = current.left;
        return current;
    }

    // Delete Node
    Node delete(Node root, int key) {
        if (root == null) return null;

        if (key < root.data)
            root.left = delete(root.left, key);
        else if (key > root.data)
            root.right = delete(root.right, key);
        else {
            // Case 1: No child
            if (root.left == null && root.right == null) return null;

            // Case 2: One child
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            // Case 3: Two children
            Node minRight = minValueNode(root.right);
            root.data = minRight.data;
            root.right = delete(root.right, minRight.data);
        }

        return root;
    }
}
```

---

## 🌳 5. Tree Traversals

```java
// Inorder (LNR)
void inorder(Node root) {
    if (root != null) {
        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }
}

// Preorder (NLR)
void preorder(Node root) {
    if (root != null) {
        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }
}

// Postorder (LRN)
void postorder(Node root) {
    if (root != null) {
        postorder(root.left);
        postorder(root.right);
        System.out.print(root.data + " ");
    }
}

// Level Order (BFS)
void levelOrder(Node root) {
    if (root == null) return;
    Queue<Node> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        Node temp = q.poll();
        System.out.print(temp.data + " ");
        if (temp.left != null) q.add(temp.left);
        if (temp.right != null) q.add(temp.right);
    }
}
```

---

## 🧮 6. Tree Height

```java
int height(Node root) {
    if (root == null) return 0;
    return 1 + Math.max(height(root.left), height(root.right));
}
```

---

## ✅ 7. Validate BST

```java
boolean isValidBST(Node root) {
    return isValidBSTUtil(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

boolean isValidBSTUtil(Node node, long min, long max) {
    if (node == null) return true;
    if (node.data <= min || node.data >= max) return false;

    return isValidBSTUtil(node.left, min, node.data) &&
           isValidBSTUtil(node.right, node.data, max);
}
```

---

## 🧪 8. Driver Code with Input

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BST tree = new BST();
        Node root = null;

        System.out.println("Enter numbers to insert into BST (-1 to stop):");
        while (true) {
            int val = sc.nextInt();
            if (val == -1) break;
            root = tree.insert(root, val);
        }

        System.out.print("Inorder: ");
        tree.inorder(root);
        System.out.println();

        System.out.print("Preorder: ");
        tree.preorder(root);
        System.out.println();

        System.out.print("Postorder: ");
        tree.postorder(root);
        System.out.println();

        System.out.print("Level Order: ");
        tree.levelOrder(root);
        System.out.println();

        System.out.println("Height of Tree: " + tree.height(root));
        System.out.println("Is Valid BST: " + tree.isValidBST(root));

        System.out.print("Search for element: ");
        int searchKey = sc.nextInt();
        System.out.println(tree.search(root, searchKey) ? "Found" : "Not Found");

        System.out.print("Enter element to delete: ");
        int del = sc.nextInt();
        root = tree.delete(root, del);
        System.out.print("Inorder after deletion: ");
        tree.inorder(root);
    }
}
```

---

## 📚 Summary

| Operation  | Code Method    | Time Complexity |
| ---------- | -------------- | --------------- |
| Insert     | `insert()`     | O(log n) avg    |
| Search     | `search()`     | O(log n) avg    |
| Delete     | `delete()`     | O(log n) avg    |
| Inorder    | `inorder()`    | O(n)            |
| Height     | `height()`     | O(n)            |
| Validation | `isValidBST()` | O(n)            |

---

