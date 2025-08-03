## 📌 1. What is a Graph?

A **graph** is a non-linear data structure consisting of:

* **Nodes (Vertices)** – e.g., cities, people.
* **Edges** – connections between the nodes (can be directed or undirected).

### Types:

| Type             | Description                   |
| ---------------- | ----------------------------- |
| **Directed**     | Edges have a direction (→)    |
| **Undirected**   | Edges are bidirectional (↔)   |
| **Weighted**     | Edges carry a cost/weight     |
| **Unweighted**   | Edges have no weights         |
| **Cyclic**       | Contains cycles               |
| **Acyclic**      | No cycles                     |
| **Connected**    | Path exists between all nodes |
| **Disconnected** | Some nodes are not connected  |

### Visual:

```
Graph G:
Vertices: A, B, C, D
Edges: A-B, A-C, B-D

       A
      / \
     B   C
     |
     D
```

---

## 📌 2. Graph Representation

### ✅ Adjacency Matrix

2D array (V x V), good for dense graphs.

```java
int[][] adjMatrix = new int[V][V];
// Add edge A-B
adjMatrix[0][1] = 1;
adjMatrix[1][0] = 1; // undirected
```

### 🔷 Example with 2D Array in Java (Undirected Graph)

Graph:

* 0 — 1
* 0 — 2
* 1 — 2
* 2 — 3

Visual:

```
    0
   / \
  1---2
       \
        3
```

Adjacency Matrix:

```
    0 1 2 3
  ----------
0|  0 1 1 0
1|  1 0 1 0
2|  1 1 0 1
3|  0 0 1 0
```

```java
public class AdjacencyMatrixExample {
    public static void main(String[] args) {
        int V = 4; // number of vertices
        int[][] adjMatrix = new int[V][V];

        // Adding undirected edges
        addEdge(adjMatrix, 0, 1);
        addEdge(adjMatrix, 0, 2);
        addEdge(adjMatrix, 1, 2);
        addEdge(adjMatrix, 2, 3);

        // Print the matrix
        printMatrix(adjMatrix);
    }

    static void addEdge(int[][] matrix, int u, int v) {
        matrix[u][v] = 1;
        matrix[v][u] = 1; // for undirected graph
    }

    static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}
```

### ✅ Adjacency List

Better for sparse graphs. Uses `List<List<Integer>>`.

```java
List<List<Integer>> adjList = new ArrayList<>();
for (int i = 0; i < V; i++) adjList.add(new ArrayList<>());
adjList.get(0).add(1); // edge 0-1
adjList.get(1).add(0); // undirected
```

### 🔷 Example with Adjacency List in Java (Undirected Graph)

Graph:

* 0 — 1
* 0 — 2
* 1 — 2
* 2 — 3

Visual:

```
    0
   / \
  1---2
       \
        3
```

Adjacency List:

```
0 → 1, 2
1 → 0, 2
2 → 0, 1, 3
3 → 2
```

```java
import java.util.*;

public class AdjacencyListExample {
    public static void main(String[] args) {
        int V = 4;
        List<List<Integer>> adjList = new ArrayList<>();

        for (int i = 0; i < V; i++) {
            adjList.add(new ArrayList<>());
        }

        addEdge(adjList, 0, 1);
        addEdge(adjList, 0, 2);
        addEdge(adjList, 1, 2);
        addEdge(adjList, 2, 3);

        printGraph(adjList);
    }

    static void addEdge(List<List<Integer>> adjList, int u, int v) {
        adjList.get(u).add(v);
        adjList.get(v).add(u); // undirected
    }

    static void printGraph(List<List<Integer>> adjList) {
        for (int i = 0; i < adjList.size(); i++) {
            System.out.print(i + " → ");
            for (int neighbor : adjList.get(i)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
}
```

---

## 📌 3. Graph Traversal

### 🔷 BFS (Breadth-First Search)

* Level-by-level
* Uses **Queue**

```java
void bfs(int start, List<List<Integer>> graph, boolean[] visited) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(start);
    visited[start] = true;

    while (!q.isEmpty()) {
        int node = q.poll();
        System.out.print(node + " ");
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                q.offer(neighbor);
                visited[neighbor] = true;
            }
        }
    }
}
```

### 🔷 DFS (Depth-First Search)

* Goes deep before backtracking
* Uses **Recursion** or **Stack**

```java
void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}
```

---

## 📌 4. Cycle Detection

### In **Undirected Graph**

Use DFS and track parent node.

```java
boolean hasCycle(int node, int parent, boolean[] visited, List<List<Integer>> graph) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            if (hasCycle(neighbor, node, visited, graph)) return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}
```

### In **Directed Graph**

Use DFS with visited and recursion stack.

```java
boolean isCyclic(int node, boolean[] visited, boolean[] stack, List<List<Integer>> graph) {
    visited[node] = true;
    stack[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor] && isCyclic(neighbor, visited, stack, graph)) return true;
        else if (stack[neighbor]) return true;
    }
    stack[node] = false;
    return false;
}
```

---

## 📌 5. Topological Sort (Directed Acyclic Graph)

### Using DFS

```java
void topoSort(int node, boolean[] visited, Stack<Integer> stack, List<List<Integer>> graph) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor])
            topoSort(neighbor, visited, stack, graph);
    }
    stack.push(node);
}
```

---

## 📌 6. Connected Components

For undirected graphs:

```java
int count = 0;
for (int i = 0; i < V; i++) {
    if (!visited[i]) {
        dfs(i, graph, visited);
        count++;
    }
}
System.out.println("Connected components: " + count);
```

---

## 📌 7. Shortest Path Algorithms

### ✅ Dijkstra’s (weighted, positive edges)

```java
class Pair {
    int node, dist;
    Pair(int node, int dist) { this.node = node; this.dist = dist; }
}
```

Use a priority queue and update distances.

### ✅ Bellman-Ford (handles negative weights)

* Relax all edges V-1 times.
* Detects negative cycles.

### ✅ Floyd-Warshall (All-pairs shortest path)

```java
for (int k = 0; k < V; k++)
  for (int i = 0; i < V; i++)
    for (int j = 0; j < V; j++)
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
```

---

## 📌 8. Minimum Spanning Tree (MST)

### ✅ Prim’s Algorithm

* Greedy, uses min heap

### ✅ Kruskal’s Algorithm

* Sort edges, use Union-Find to avoid cycles

---

## 📌 9. Bipartite Graph Check

Using BFS/DFS and coloring:

```java
boolean isBipartite(List<List<Integer>> graph, int V) {
    int[] color = new int[V];
    Arrays.fill(color, -1);

    for (int i = 0; i < V; i++) {
        if (color[i] == -1) {
            Queue<Integer> q = new LinkedList<>();
            q.offer(i);
            color[i] = 0;

            while (!q.isEmpty()) {
                int node = q.poll();
                for (int neighbor : graph.get(node)) {
                    if (color[neighbor] == -1) {
                        color[neighbor] = 1 - color[node];
                        q.offer(neighbor);
                    } else if (color[neighbor] == color[node]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
```

---

## 📌 10. Advanced Concepts

| Concept                       | Description                                |
| ----------------------------- | ------------------------------------------ |
| **Union-Find (Disjoint Set)** | Used in Kruskal’s, cycle detection         |
| **Bridges in Graph**          | Edge removal increases components          |
| **Articulation Points**       | Node removal increases components          |
| **Tarjan's Algorithm**        | For SCCs, articulation points              |
| **Kosaraju’s Algorithm**      | Finds Strongly Connected Components (SCCs) |

---

## 📌 11. Graph Problems Practice (with tags)

| Problem                                   | Type                 |
| ----------------------------------------- | -------------------- |
| Detect cycle in directed/undirected graph | DFS                  |
| Number of provinces (LeetCode 547)        | Connected components |
| Course Schedule (LeetCode 207)            | Topo sort            |
| Dijkstra’s shortest path                  | Greedy               |
| Minimum Cost to Connect All Cities        | MST                  |
