Here's a **complete breakdown of all Graph Data Structure (DSA) concepts**, including definitions, diagrams, theory, and Java code examples.

---

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

### ✅ Adjacency List

Better for sparse graphs. Uses `List<List<Integer>>`.

```java
List<List<Integer>> adjList = new ArrayList<>();
for (int i = 0; i < V; i++) adjList.add(new ArrayList<>());
adjList.get(0).add(1); // edge 0-1
adjList.get(1).add(0); // undirected
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

---

If you'd like **PDF notes**, **dry run diagrams**, or **Java practice questions** on any specific graph algorithm, let me know — I’ll generate those for you!

