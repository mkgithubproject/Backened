### 🔄 `useEffect` in React — Simplified Explanation

`useEffect` is a **React Hook** that allows you to **run side effects** in your functional components.

---

### ✅ What is a "Side Effect"?

A **side effect** is any operation that affects something outside the component:

* Fetching data from an API
* Subscribing to events (like WebSockets)
* Setting timers (`setTimeout`, `setInterval`)
* Manipulating the DOM directly
* Updating the title of the page

---

### 📦 Basic Syntax:

```jsx
import { useEffect } from "react";

useEffect(() => {
  // Code to run after render
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

---

### 🧠 How it Works Behind the Scenes

* **Runs after the component renders**.
* The second argument, `[dependencies]`, tells React **when to run** the effect:

  * `[]`: Run **only once** (on mount).
  * `[value]`: Run when `value` changes.
  * No second argument: Run **after every render**.

---

### 🔍 Example 1: Run once on mount (like `componentDidMount`)

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

---

### 🔍 Example 2: Run when state changes

```jsx
useEffect(() => {
  console.log("Count changed to", count);
}, [count]);
```

---

### 🔍 Example 3: API call on component mount

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); // Empty array = run once

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

### 🧹 Cleanup (like `componentWillUnmount`)

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup
  };
}, []);
```

---

### 🔁 Summary Table

| Dependency Array       | When it Runs                          |
| ---------------------- | ------------------------------------- |
| `[]`                   | Once after first render (mount)       |
| `[a, b]`               | Every time `a` or `b` changes         |
| Not provided           | Every render                          |
| With `return () => {}` | On cleanup (before re-run or unmount) |

---
import React, { useState, useEffect } from 'react';

function LoadingSpinner() {
  return <p>⏳ Loading users...</p>;
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
        
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />; // ✅ Returning another component here
  }

  return (
    <div>
      <h2>👥 User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
### custome hook , behind the scene

