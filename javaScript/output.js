let employee = {
    ename: "Jack",
    b:{
        c:1
    },
    salary: 50000
}

console.log("Employee=> ", employee);
// This creates a new object at the top level.

// Primitive properties (ename, salary) are copied by value.

// Object properties (b) are copied by reference (shallow copy).
let newEmployee = {...employee}   // shallow copy of nested propert by reference , 
//both object will have different refe but b will have same ref

console.log(newEmployee == employee)
console.log("New Employee=> ", newEmployee , );

console.log("---------After modification----------");
newEmployee.ename= "Beck";
console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);

// if i do let newEmployee = employee // shallow copy 





| Case                                | New Object?        | Top-level props | Nested objects   |
| ----------------------------------- | ------------------ | --------------- | ---------------- |
| `let newEmployee = employee`        | ❌ No (same object) | Shared          | Shared           |
| `let newEmployee = { ...employee }` | ✅ Yes (new object) | Copied          | Shared (shallow) |


deep copy let deepEmployee = JSON.parse(JSON.stringify(employee));

