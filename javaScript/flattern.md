Flattening an **object** or **array** in JavaScript can be done both **recursively** and **non-recursively (iteratively)**. Let's break it down into two parts:

---

## ✅ 1. Flatten an **Array**

### 🔁 A. Using **Recursion**

```js
function flattenArrayRecursive(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArrayRecursive(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Example
console.log(flattenArrayRecursive([1, [2, [3, 4]], 5]));
// Output: [1, 2, 3, 4, 5]
```

---

### 🔁 B. Without Recursion (Using Stack)

```js
function flattenArrayIterative(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      stack.push(...item); // spread nested items into the stack
    } else {
      result.push(item);
    }
  }

  return result.reverse(); // reverse because we used pop()
}

// Example
console.log(flattenArrayIterative([1, [2, [3, 4]], 5]));
// Output: [1, 2, 3, 4, 5]
```

---

## ✅ 2. Flatten an **Object**

We’ll flatten an object with nested properties like this:

```js
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};
```

Expected output:

```js
{
  'a': 1,
  'b.c': 2,
  'b.d.e': 3
}
```

---

### 🔁 A. Using **Recursion**

```js
function flattenObjectRecursive(obj, parent = '', result = {}) {
  for (let key in obj) {
    const propName = parent ? `${parent}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObjectRecursive(obj[key], propName, result);
    } else {
      result[propName] = obj[key];
    }
  }
  return result;
}

// Example
console.log(flattenObjectRecursive({
  a: 1,
  b: { c: 2, d: { e: 3 } }
}));
// Output: { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
```

---

### 🔁 B. Without Recursion (Using Stack)

```js
function flattenObjectIterative(obj) {
  const result = {};
  const stack = [{ current: obj, path: '' }];

  while (stack.length > 0) {
    const { current, path } = stack.pop();

    for (let key in current) {
      const value = current[key];
      const newPath = path ? `${path}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        stack.push({ current: value, path: newPath });
      } else {
        result[newPath] = value;
      }
    }
  }

  return result;
}

// Example
console.log(flattenObjectIterative({
  a: 1,
  b: { c: 2, d: { e: 3 } }
}));
// Output: { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
```

---

## 🧠 Bonus: Flattening Arrays Inside Objects

If you want to flatten objects that might also contain arrays, you can expand the logic to check for both arrays and objects depending on the use case.

---

Let me know if you want:

* Flattening with array indices like `b.d[0].x`
* Unflattening logic (reversing the process)
* TypeScript version

Would you like a PDF cheat sheet for these too?
