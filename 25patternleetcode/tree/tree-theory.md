Here’s a **complete guide** to the **Tree data structure in DSA**, covering **theory, concepts, and Java examples**:
Here's a 👣 **Step-by-Step Learning Roadmap for Trees in DSA** — designed to take you from **beginner** to **advanced**, with Java and DSA interview prep in mind:

---

## 👣 Tree Learning Roadmap in DSA

### ✅ **Step 1: Understand Basic Tree Concepts**

* What is a Tree?
* Terminology: Root, Node, Child, Parent, Leaf, Height, Depth
* Visual representation of trees

📘 Resource: *Section 1 in your notes*

---

### ✅ **Step 2: Learn Types of Trees**

* General Tree
* Binary Tree and its subtypes:

  * Full Binary Tree
  * Complete Binary Tree
  * Perfect Binary Tree
  * Balanced Binary Tree
  * Binary Search Tree (BST)

📘 Resource: *Section 2 in your notes (with examples)*

---

### ✅ **Step 3: Tree Traversals**

* **Binary Tree Traversals**:

  * Inorder
  * Preorder
  * Postorder
  * Level-order (BFS)
* **General Tree Traversals** (N-ary trees):

  * Preorder, Postorder, Level-order

💡 Master recursive and iterative traversal

📘 Resource: *Sections 3 & 4 in your notes*

---

### ✅ **Step 4: Binary Search Tree (BST) Operations**

* Insert
* Search
* Delete (handle all 3 cases)
* Find min/max
* BST Properties

📘 Resource: *Sections 4 & 6 in your notes*

---

### ✅ **Step 5: Tree Problems and Patterns**

* Height of Tree
* Lowest Common Ancestor (LCA)
* Diameter of Tree
* Mirror of a Tree
* Print all paths
* Path sum problems
* Count leaf/internal nodes

📘 Resource: *Section 5 + practice problems*

---

### ✅ **Step 6: Advanced Tree Types**

* AVL Tree (Self-balancing BST)
* Red-Black Tree
* Segment Tree (Range Queries)
* Trie (Prefix Tree)
* Binary Heap (Min/Max Heap)
* N-ary Trees

📘 Resource: *Section 7*

---

### ✅ **Step 7: Applications of Trees**

* Heaps → Priority Queues
* Tries → Spell Checker, Autocomplete
* Segment Trees → Range Queries in CP
* BSTs → Searching & Sorting
* Expression Trees → Compilers

---

### ✅ **Step 8: Practice Practice Practice**

* LeetCode/Easy:

  * 104\. Maximum Depth of Binary Tree
  * 101. Symmetric Tree
* LeetCode/Medium:

  * 236\. Lowest Common Ancestor
  * 230. Kth Smallest Element in BST
* LeetCode/Hard:

  * 124\. Binary Tree Maximum Path Sum
  * 297. Serialize and Deserialize Binary Tree

---

Would you like me to **add this roadmap** directly to your tree notes? Or generate a **printable PDF version** too?


---

## 🌳 1. What is a Tree?

A **tree** is a non-linear, hierarchical data structure consisting of **nodes**. It starts with a **root node**, and each node may have child nodes.

### Key Terminology:

| Term    | Description                                      |
| ------- | ------------------------------------------------ |
| Root    | Top-most node of a tree.                         |
| Node    | Element in a tree.                               |
| Parent  | A node that has children.                        |
| Child   | A node that descends from another.               |
| Leaf    | A node with no children.                         |
| Edge    | Connection between two nodes.                    |
| Height  | Number of edges from a node to the deepest leaf. |
| Depth   | Number of edges from the root to a node.         |
| Subtree | Tree formed by a node and its descendants.       |

---

## 🌱 2. Types of Trees

### a. **Binary Tree**

Each node has **at most 2 children**.

```
       1
     /   \
    2     3
   / \
  4   5
```

```java
class Node {
    int data;
    Node left, right;
    Node(int value) {
        data = value;
        left = right = null;
    }
}

public class BinaryTreeExample {
    public static void main(String[] args) {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);

        System.out.println("Root: " + root.data);
        System.out.println("Left Child of Root: " + root.left.data);
        System.out.println("Right Child of Root: " + root.right.data);
    }
}
```

### b. **Full Binary Tree**

Every node has **0 or 2 children**.

```
       1
     /   \
    2     3
         / \
        4   5
```

### c. **Perfect Binary Tree**

All **internal nodes have 2 children**, and all **leaves are at the same level**.

```
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
```

### d. **Complete Binary Tree**

All levels are filled except possibly the last, and the last level has all keys as left as possible.

```
        1
      /   \
     2     3
    / \   /
   4   5 6
```

### e. **Balanced Binary Tree**

The height of the left and right subtrees of every node differ by at most 1.

```
       1
     /   \
    2     3
   / 
  4
```

### f. **Binary Search Tree (BST)**

Left < Root < Right

```
       8
     /   \
    3     10
   / \      \
  1   6      14
     / \    /
    4   7  13
```

---

## 📘 3. Binary Tree Traversals (Very Important)

### a. **Inorder (Left → Root → Right)** — *Depth-First Search (DFS) Traversal*

```java
void inorder(Node root) {
    if (root != null) {
        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }
}
```

### b. **Preorder (Root → Left → Right)**

```java
void preorder(Node root) {
    if (root != null) {
        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }
}
```

### c. **Postorder (Left → Right → Root)**

```java
void postorder(Node root) {
    if (root != null) {
        postorder(root.left);
        postorder(root.right);
        System.out.print(root.data + " ");
    }
}
```

### d. **Level Order (BFS)**

```java
void levelOrder(Node root) {
    if (root == null) return;
    Queue<Node> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        Node node = q.poll();
        System.out.print(node.data + " ");
        if (node.left != null) q.add(node.left);
        if (node.right != null) q.add(node.right);
    }
}
```

---

## 🌲 General Tree Traversals (Non-Binary Trees)

In a **general tree**, a node can have any number of children. So traversals need to iterate over all children dynamically.

### a. **Preorder Traversal (Root → Children)**

```java
void preorder(TreeNode root) {
    if (root == null) return;
    System.out.print(root.data + " ");
    for (TreeNode child : root.children) {
        preorder(child);
    }
}
```

### b. **Postorder Traversal (Children → Root)**

```java
void postorder(TreeNode root) {
    if (root == null) return;
    for (TreeNode child : root.children) {
        postorder(child);
    }
    System.out.print(root.data + " ");
}
```

### c. **Level Order Traversal (Breadth-First Search)**

```java
void levelOrder(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        System.out.print(current.data + " ");
        queue.addAll(current.children);
    }
}
```

> **Note**: `TreeNode` here has a structure like:

```java
class TreeNode {
    int data;
    List<TreeNode> children;

    TreeNode(int val) {
        data = val;
        children = new ArrayList<>();
    }
}
```

---

## 🔎 4. Binary Search Tree (BST)

A **BST** is a binary tree in which for each node:

* Left subtree nodes < root
* Right subtree nodes > root

### Insert in BST:

```java
Node insert(Node root, int value) {
    if (root == null) return new Node(value);
    if (value < root.data)
        root.left = insert(root.left, value);
    else
        root.right = insert(root.right, value);
    return root;
}
```

### Search in BST:

```java
boolean search(Node root, int key) {
    if (root == null) return false;
    if (root.data == key) return true;
    return key < root.data ? search(root.left, key) : search(root.right, key);
}
```

---

## 🧮 5. Tree Height

```java
int height(Node root) {
    if (root == null) return 0;
    return 1 + Math.max(height(root.left), height(root.right));
}
```

---

## ❌ 6. Deletion in BST

3 cases:

* Node is a **leaf**
* Node has **one child**
* Node has **two children** → Replace with inorder successor.

```java
Node delete(Node root, int key) {
    if (root == null) return null;

    if (key < root.data)
        root.left = delete(root.left, key);
    else if (key > root.data)
        root.right = delete(root.right, key);
    else {
        if (root.left == null) return root.right;
        else if (root.right == null) return root.left;

        root.data = minValue(root.right);
        root.right = delete(root.right, root.data);
    }

    return root;
}

int minValue(Node root) {
    int min = root.data;
    while (root.left != null) {
        min = root.left.data;
        root = root.left;
    }
    return min;
}
```

---

## 🧠 7. Advanced Tree Types

| Tree Type          | Description                                    |
| ------------------ | ---------------------------------------------- |
| AVL Tree           | Self-balancing BST.                            |
| Red-Black Tree     | Balanced tree used in maps/sets.               |
| Segment Tree       | Range queries like min, sum.                   |
| Trie (Prefix Tree) | For string/prefix searching.                   |
| N-ary Tree         | Nodes can have more than 2 children.           |
| Heap (Binary Heap) | Complete binary tree, used in priority queues. |

### 📐 Tree Structures

#### AVL Tree

```
       30
      /  \
    20    40
   /         \
 10          50
```

#### Trie (after inserting "cat" and "cap")

```
root
 |
 c
  |
  a
   |\
   t p
```

#### Min Heap (Array Representation)

```
       5
     /   \
    10   15
   / 
  20
```

#### Segment Tree (for \[1, 3, 5, 7])

```
          [0–3]
         /     \
      [0–1]   [2–3]
      /   \    /   \
   [0]   [1] [2]   [3]
```

\| ------------------ | ---------------------------------------------- |
\| AVL Tree           | Self-balancing BST.                            |
\| Red-Black Tree     | Balanced tree used in maps/sets.               |
\| Segment Tree       | Range queries like min, sum.                   |
\| Trie (Prefix Tree) | For string/prefix searching.                   |
\| N-ary Tree         | Nodes can have more than 2 children.           |
\| Heap (Binary Heap) | Complete binary tree, used in priority queues. |

### 🔸 AVL Tree (Self-Balancing BST)

```java
class AVLNode {
    int key, height;
    AVLNode left, right;

    AVLNode(int d) {
        key = d;
        height = 1;
    }
}
```

### 🔸 Trie (Prefix Tree) for Strings

```java
class TrieNode {
    boolean isEnd;
    TrieNode[] children = new TrieNode[26];

    TrieNode() {
        isEnd = false;
    }
}

void insert(TrieNode root, String word) {
    TrieNode node = root;
    for (char c : word.toCharArray()) {
        int index = c - 'a';
        if (node.children[index] == null)
            node.children[index] = new TrieNode();
        node = node.children[index];
    }
    node.isEnd = true;
}
```

### 🔸 Min Heap (Binary Heap)

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.add(10);
minHeap.add(5);
minHeap.add(15);
System.out.println(minHeap.poll()); // 5
```

### 🔸 Segment Tree (Range Sum Query)

```java
int[] seg = new int[4 * n];

void build(int[] arr, int idx, int low, int high) {
    if (low == high) {
        seg[idx] = arr[low];
        return;
    }
    int mid = (low + high) / 2;
    build(arr, 2*idx+1, low, mid);
    build(arr, 2*idx+2, mid+1, high);
    seg[idx] = seg[2*idx+1] + seg[2*idx+2];
}
```

---

## ✅ 8. Sample Program (All operations)

```java
public class BinaryTree {
    static class Node {
        int data;
        Node left, right;

        Node(int value) {
            data = value;
            left = right = null;
        }
    }

    static void inorder(Node root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.data + " ");
            inorder(root.right);
        }
    }

    public static void main(String[] args) {
        Node root = new Node(10);
        root.left = new Node(5);
        root.right = new Node(15);
        root.left.left = new Node(2);
        root.left.right = new Node(7);
        root.right.left = new Node(12);

        System.out.print("Inorder: ");
        inorder(root);
    }
}
```

---

