### 🔹 What are `props` in React?

In **React**, `props` (short for **properties**) are used to pass **data** from a **parent component to a child component**.

Props are **read-only** — the child component **cannot modify** the props it receives.

---

### 🔸 Example: Simple Props Usage

#### ✅ Step 1: Parent Component

```jsx
import React from "react";
import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <Greeting name="Mohit" />
      <Greeting name="Amit" />
    </div>
  );
}

export default App;
```

#### ✅ Step 2: Child Component (Greeting.js)

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
```

🧠 **What’s happening here:**

* `App` is the parent component.
* It uses `<Greeting name="Mohit" />` and `<Greeting name="Amit" />` to pass the `name` prop.
* `Greeting` component receives that prop and uses it inside JSX.

📦 `props` is an object:

```js
// when name="Mohit" is passed
props = { name: "Mohit" }
```

---

### 🔸 Destructuring Props (Cleaner Code)

Instead of using `props.name`, we can destructure it:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

---

### 🔸 Props with Multiple Values

```jsx
function Profile({ name, age, country }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Country: {country}</p>
    </div>
  );
}
```

Used like:

```jsx
<Profile name="Ravi" age={25} country="India" />
```

---

### 🔸 Key Points

* Props are passed like HTML attributes: `<Component propName="value" />`
* Props are **read-only** (immutable).
* You can pass:

  * Strings
  * Numbers
  * Booleans
  * Arrays
  * Objects
  * Functions
  * Even JSX!

---

Would you like a real-world example like a product card using props?
