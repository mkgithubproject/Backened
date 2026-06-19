In **Express**, an error middleware is identified by its **function signature**.

### ✅ Error middleware

It **must have 4 parameters**:

```ts
(err, req, res, next) => {
    // Handle error
}
```

Example:

```ts
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});
```

Express recognizes this as an **error-handling middleware** because it has **4 arguments**, even if you don't use all of them.

---

### ✅ Normal middleware

It has **3 parameters**:

```ts
(req, res, next) => {
    // Do something
    next();
}
```

Example:

```ts
app.use((req, res, next) => {
    console.log(req.path);
    next();
});
```

---

### How Express decides?

Express checks the **number of parameters (`function.length`)**.

```ts
function normal(req, res, next) {}
console.log(normal.length); // 3

function error(err, req, res, next) {}
console.log(error.length); // 4
```

Only middleware with **4 parameters** is treated as an error middleware.

---

### Example flow

```ts
app.use((req, res, next) => {
    console.log("Middleware 1");
    next();
});

app.use((req, res, next) => {
    next(new Error("Boom"));
});

app.use((req, res, next) => {
    console.log("Middleware 2"); // ❌ Skipped
    next();
});

app.use((err, req, res, next) => {
    console.log("Error middleware");
    res.status(500).send(err.message);
});
```

Output:

```text
Middleware 1
Error middleware
```

`Middleware 2` is skipped because `next(err)` was called.

### In your code

```ts
app.use(function (err, req, res, next) {
    ...
});
```

This is an **error middleware** because it has **4 parameters** (`err`, `req`, `res`, `next`). Express will execute it **only when an error is passed to `next(err)` or an exception is propagated**, not during normal request processing.
