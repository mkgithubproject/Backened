### ✅ What is a Reducer?

In programming (especially with **React** and **Redux**), a **reducer** is a **pure function** that takes two arguments:

* **current state**
* **action**

…and returns a **new state** based on the action.

### 🧠 Reducer Signature:

```js
const reducer = (state, action) => {
  // return newState
};
```

---

### 🎯 Why Do We Need a Reducer?

Reducers are especially useful when:

1. **Complex State Logic**: Managing state transitions that depend on previous state or require multiple sub-values.
2. **Predictability**: Reducers are pure functions, so given the same inputs, they always produce the same output — this makes debugging easier.
3. **Scalability**: As your app grows, organizing state updates through actions and reducers makes it easier to manage.
4. **Separation of Concerns**: You separate how the UI looks from how the data is updated.
5. **Used in Redux**: Reducers are core to Redux's architecture and are often adopted for consistency in larger apps.

---

### 🎯 Reducer in React

In React, we can use the `useReducer` hook instead of `useState` for complex state logic.

---

### ⚙️ Counter App Using `useReducer`

Here's a complete **React Counter App** using `useReducer`:

#### ✅ Step-by-Step:

```jsx
import React, { useReducer } from 'react';

// Step 1: Define the reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

// Step 2: Define the component
function CounterApp() {
  // Step 3: Initialize useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>➕ Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>➖ Decrement</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>🔄 Reset</button>
    </div>
  );
}

export default CounterApp;
```

---

### 🔍 Explanation:

| Part             | Description                                  |
| ---------------- | -------------------------------------------- |
| `useReducer()`   | React hook to manage state via reducer logic |
| `counterReducer` | Pure function handling all actions           |
| `dispatch()`     | Function to send actions to reducer          |
| `state`          | Current state value (`{ count: number }`)    |

---

### 🧪 Output Example

```
Counter: 0
[➕ Increment] [➖ Decrement] [🔄 Reset]
```

Clicking buttons updates the count accordingly.

---

Would you like this integrated into a **Create React App** boilerplate or in **CodeSandbox**?
