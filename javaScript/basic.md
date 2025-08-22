# 🚀 JavaScript Array Methods with Examples

## 1. `map()`

👉 Creates a new array by applying a function to each element.

```js
const numbers = [1, 2, 3, 4];

// Multiply each number by 2
const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8]
```

---

## 2. `filter()`

👉 Creates a new array with elements that pass a condition.

```js
const numbers = [1, 2, 3, 4, 5, 6];

// Keep even numbers
const evens = numbers.filter(num => num % 2 === 0);

console.log(evens); // [2, 4, 6]
```

---

## 3. `reduce()`

👉 Reduces array to a single value (sum, product, object, etc.).

```js
const numbers = [1, 2, 3, 4, 5];

// Sum of all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(sum); // 15
```

Count frequency of elements:

```js
const fruits = ["apple", "banana", "apple", "orange", "banana"];

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(count);
// { apple: 2, banana: 2, orange: 1 }
```

---

## 4. `forEach()`

👉 Runs a function for each element (does not return a new array).

```js
const numbers = [1, 2, 3];

numbers.forEach(num => console.log(num * 2));

// Output: 2, 4, 6
```

---

## 5. `find()`

👉 Returns the **first element** that satisfies a condition.

```js
const numbers = [10, 20, 30, 40];

// Find first number greater than 25
const result = numbers.find(num => num > 25);

console.log(result); // 30
```

---

## 6. `some()`

👉 Returns `true` if **at least one** element passes the test.

```js
const numbers = [1, 3, 5, 8];

// Check if any number is even
const hasEven = numbers.some(num => num % 2 === 0);

console.log(hasEven); // true
```

---

## 7. `every()`

👉 Returns `true` if **all elements** pass the test.

```js
const numbers = [2, 4, 6];

// Check if all are even
const allEven = numbers.every(num => num % 2 === 0);

console.log(allEven); // true
```

---

## 8. `sort()`

👉 Sorts array **(mutates original)**.

```js
const numbers = [4, 2, 8, 1];

// Ascending order
numbers.sort((a, b) => a - b);

console.log(numbers); // [1, 2, 4, 8]
```

---

## 9. `includes()`

👉 Checks if array contains a value.

```js
const fruits = ["apple", "banana", "orange"];

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape"));  // false
```

---

## 10. `flat()`

👉 Flattens nested arrays.

```js
const arr = [1, [2, [3, 4]]];

console.log(arr.flat());     // [1, 2, [3, 4]]
console.log(arr.flat(2));    // [1, 2, 3, 4]
```

