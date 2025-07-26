### React Router DOM — Complete Guide

`react-router-dom` is the **standard routing library** for React web applications. It allows you to create **single-page applications (SPAs)** with **dynamic routing**.

---

## 📦 Installation

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

---

## 🛠 Basic Setup Example (React Router v6+)

```jsx
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 🧭 Components

### ✅ `<BrowserRouter>`

Wraps your application to enable routing with clean URLs (e.g., `/about`).

### ✅ `<Routes>` & `<Route>`

Used to define routing paths and the components that should be rendered.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### ✅ `<Link>` & `<NavLink>`

For navigating without refreshing the page.

```jsx
<Link to="/about">Go to About</Link>
```

`<NavLink>` is like `<Link>` but adds styling automatically for active links.

---

## 🔄 Programmatic Navigation — `useNavigate`

```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // do login logic
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 🧵 Dynamic Routes & Params — `useParams`

```jsx
<Route path="/users/:id" element={<UserDetail />} />
```

```jsx
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}
```

---

## 🛡 Protected Routes (Private Routes)

```jsx
function PrivateRoute({ children }) {
  const isLoggedIn = true; // Replace with auth logic
  return isLoggedIn ? children : <Navigate to="/login" />;
}

<Route path="/dashboard" element={
  <PrivateRoute>
    <Dashboard />
  </PrivateRoute>
} />
```

---

## 📦 Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react';
const About = lazy(() => import('./pages/About'));

<Route path="/about" element={
  <Suspense fallback={<div>Loading...</div>}>
    <About />
  </Suspense>
} />
```

---

## 🧪 Not Found Route

```jsx
<Route path="*" element={<NotFound />} />
```

---

## 📚 Summary of Hooks

| Hook            | Purpose                               |
| --------------- | ------------------------------------- |
| `useNavigate()` | Navigate programmatically             |
| `useParams()`   | Access URL parameters                 |
| `useLocation()` | Access current location/path info     |
| `useMatch()`    | Match current route against a pattern |
| `useRoutes()`   | Hook-based route declaration          |

---

Would you like:

* A small working project with navigation?
* A protected route demo?
* Nested routes explained?
  Let me know and I’ll guide you step-by-step.
