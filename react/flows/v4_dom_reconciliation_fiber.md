
# React: Reconciliation, Virtual DOM, and Fiber

---

## 1. Virtual DOM (VDOM)

* **Definition**: A lightweight JavaScript object representing the actual DOM structure.
* **Purpose**: Avoids expensive direct DOM operations by working with a virtual copy first.
* **Process**: Components return JSX → compiled into **VDOM nodes**.

### Example JSX

```jsx
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  );
}
```

### VDOM Representation

```json
{
  type: "div",
  props: {},
  children: [
    { type: "h1", props: {}, children: ["Hello"] },
    { type: "p", props: {}, children: ["World"] }
  ]
}
```

---

## 2. Reconciliation

* **Definition**: Comparing the *previous VDOM tree* with the *new VDOM tree*.
* **Goal**: Find minimal updates to apply in the real DOM.
* **Steps**:

  1. React stores the old VDOM.
  2. Renders a new VDOM.
  3. Compares old vs new → finds differences.
  4. Updates only what changed in the real DOM.

### Example Change

Before:

```jsx
<h1>Hello</h1>
```

After:

```jsx
<h1>Hi</h1>
```

* **Old VDOM**: `{ type: "h1", children: ["Hello"] }`
* **New VDOM**: `{ type: "h1", children: ["Hi"] }`

👉 React updates only the text node (not the entire `<h1>`).

---

## 3. Fiber

* **Definition**: An internal React data structure introduced in React 16.
* **Purpose**:

  * Breaks rendering work into *small units* (fibers).
  * Enables pausing, resuming, prioritizing, or aborting work.
* **Reason**: Improves responsiveness by supporting concurrent rendering.

### Fiber Node Contains

* `type` → component type
* `child` → first child fiber
* `sibling` → next sibling fiber
* `return` → parent fiber
* `stateNode` → reference to actual DOM node or component instance

### Example JSX

```jsx
<div>
  <h1>Hello</h1>
  <p>World</p>
</div>
```

### Fiber Tree Structure

```
Fiber(div)
 ├─ child → Fiber(h1)
 │      └─ sibling → Fiber(p)
```

Each fiber knows:

* Its **parent** (`return`)
* Its **first child** (`child`)
* Its **next sibling** (`sibling`)

This enables efficient tree traversal without recursion.

---

## 4. Putting It All Together

1. **Render Phase** → React builds a new **VDOM tree**.
2. **Fiber Structure** → Each VDOM node gets a **Fiber node**.
3. **Reconciliation** → React compares old vs new Fiber trees.
4. **Commit Phase** → Applies minimal updates to the real DOM.

---

## ⚡ Quick Summary

* **Virtual DOM (VDOM)** → JS representation of UI.
* **Reconciliation** → Diffing old vs new VDOM → minimal DOM updates.
* **Fiber** → Internal linked structure for scheduling & optimizing rendering.


# React: Reconciliation, Virtual DOM, and Fiber (Simplified with Fiber Tree Example)

---

## Example Scenario

* **First render:** `<h1>Hello</h1>`
* **Second render:** `<h1>Hello Mr.</h1>`

---

## 1. Who Creates VDOM?

* **React** creates VDOM whenever your component returns JSX.
* JSX → `React.createElement()` → **new VDOM object** every render.
* You don’t manage old VDOM; React does internally.

---

## 2. Where is Previous DOM?

* Each **Fiber node** has a pointer called `alternate` to the old Fiber.
* React uses this to compare new Fiber vs old Fiber.
* This is how React knows what changed without keeping a separate copy of old DOM.

---

## 3. First Render (Hello)

JSX: `<h1>Hello</h1>`

Fiber Tree (Linked List Style):

```
Fiber(App)
  ↓ child
Fiber(h1) ──> stateNode -> <h1>Hello</h1>
```

* `stateNode` points to the actual DOM node.
* Commit Phase: React inserts `<h1>Hello</h1>` into DOM.

---

## 4. Second Render (Hello Mr.)

JSX: `<h1>Hello Mr.</h1>`

New Fiber Tree (Work-in-Progress):

```
New Fiber(App)
  ↓ child
New Fiber(h1: "Hello Mr.")
          │
          └── alternate → Old Fiber(h1: "Hello")
```

* React compares new Fiber ↔ old Fiber using `alternate`.
* Marks **Update** effect on h1 because text changed.

---

## 5. Commit Phase (Second Render)

* Updates **only the text** in existing `<h1>` DOM node.
* Final DOM:

```html
<h1>Hello Mr.</h1>
```

* No new DOM node created.

---

## 6. Memorize Fiber Process Easily

1. **Every render** → React builds **new Fiber tree** from JSX.
2. **Previous tree** → old Fiber nodes connected via `alternate`.
3. **Reconciliation** → React walks old ↔ new Fiber trees like a **linked list**.
4. **Commit** → React applies minimal changes to real DOM.

---

### Fiber Tree Visualization (Linked List Style)

**Old vs New**

```
Old Fiber Tree               New Fiber Tree
(App)                        (App)
  | child                      | child
  v                            v
(h1: "Hello")   <───alt───>   (h1: "Hello Mr.")
```
Sure! Let’s break down **Fiber in React** in a simple way with an example and explanation.

---

## **1. What is React Fiber?**

React Fiber is **the reconciliation engine** of React. It is the **new architecture** introduced in React 16 to improve rendering performance.
It allows React to:

* **Split work into chunks** (incremental rendering) instead of blocking the main thread.
* **Pause, resume, and prioritize** work (like animations or high-priority updates).
* Efficiently **update the DOM** by comparing the previous and new virtual DOM.

In short, **Fiber makes React asynchronous and efficient**.

---

## **2. Why Fiber?**

Before Fiber:

* React used a synchronous rendering model.
* Rendering large trees **blocked the UI**.
* React couldn’t prioritize updates efficiently.

With Fiber:

* React can pause work and continue later.
* Updates like animations are **smooth**.
* Expensive updates won’t freeze the page.

---

## **3. Fiber Tree**

* Each element in React corresponds to a **Fiber Node**.
* Fiber Nodes form a **linked tree structure**.
* Each Fiber Node contains:

  * `type` → type of element (`div`, `h1`, or Component)
  * `props` → props of the element
  * `stateNode` → reference to the actual DOM node
  * `child` → first child Fiber
  * `sibling` → next sibling Fiber
  * `return` → parent Fiber

**Fiber tree example:**

```
Fiber Root
  └─ App Fiber
       ├─ Header Fiber
       └─ Content Fiber
            ├─ Post Fiber
            └─ Footer Fiber
```

---

## **4. Example**

Let's take a simple React component:

```jsx
function App() {
  return (
    <div>
      <h1>Hello React Fiber!</h1>
      <p>This is a fiber example.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### **What happens behind the scenes:**

1. **JSX → createElement**

   ```js
   const element = React.createElement("div", null,
     React.createElement("h1", null, "Hello React Fiber!"),
     React.createElement("p", null, "This is a fiber example.")
   );
   ```

2. **Fiber Tree Creation**
   React creates a Fiber node for each element:

```
FiberRoot
  └─ div Fiber
       ├─ h1 Fiber
       └─ p Fiber
```

3. **Reconciliation**

   * Fiber compares **previous Fiber tree** with **new Fiber tree**.
   * Only updates the DOM nodes that changed.

4. **Commit Phase**

   * Updates the actual DOM (`stateNode`) efficiently.

---

## **5. Incremental Rendering / Priority**

Suppose we have a slow component:

```jsx
function SlowComponent() {
  for (let i = 0; i < 1000000000; i++) {}
  return <h2>Slow Component</h2>;
}

function App() {
  return (
    <div>
      <h1>Hello Fiber</h1>
      <SlowComponent />
    </div>
  );
}
```

With Fiber:

* React can **pause rendering** `SlowComponent`.
* It can **render high-priority updates** like user input or animations first.
* Once the main thread is free, React resumes the remaining work.

---

## **6. Summary**

| Feature     | React Fiber               |
| ----------- | ------------------------- |
| Rendering   | Incremental (chunked)     |
| Updates     | Prioritized               |
| DOM Updates | Efficient via diffing     |
| Old React   | Synchronous, blocking     |
| Fiber Tree  | Each element = Fiber node |

---

If you want, I can **draw a full Fiber tree diagram with first render vs second render**, showing **how old fibers are reused**—it makes memorizing Fiber super easy.

Do you want me to make that diagram?

