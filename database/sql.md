Here’s a set of **most commonly asked SQL interview questions** for a candidate with **2.5 years of experience**, along with **clear and concise answers**.

---

### ✅ **1. What is the difference between `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, and `FULL OUTER JOIN`?**

| JOIN Type         | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `INNER JOIN`      | Returns records that have matching values in both tables.                   |
| `LEFT JOIN`       | Returns all records from the left table and matched records from the right. |
| `RIGHT JOIN`      | Returns all records from the right table and matched records from the left. |
| `FULL OUTER JOIN` | Returns all records when there is a match in one of the tables.             |

```sql
SELECT *
FROM Employees E
INNER JOIN Departments D ON E.dept_id = D.id;
```

---

### ✅ **2. What is the difference between `WHERE` and `HAVING` clause?**

| Clause   | Used For                                          |
| -------- | ------------------------------------------------- |
| `WHERE`  | Filters rows before grouping (on individual rows) |
| `HAVING` | Filters after `GROUP BY` (on aggregated data)     |

```sql
-- Example
SELECT dept_id, COUNT(*) as emp_count
FROM Employees
GROUP BY dept_id
HAVING COUNT(*) > 5;
```

---

### ✅ **3. What is a subquery and its types?**

A **subquery** is a query within another query.

**Types**:

* **Single Row Subquery**
* **Multiple Row Subquery**
* **Correlated Subquery**

```sql
-- Example: Subquery to get employees with highest salary
SELECT * 
FROM Employees 
WHERE salary = (SELECT MAX(salary) FROM Employees);
```

---

### ✅ **4. What is the difference between `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()`?**

| Function       | Description                                 |
| -------------- | ------------------------------------------- |
| `RANK()`       | Skips the next number in case of tie        |
| `DENSE_RANK()` | Does not skip, gives same rank              |
| `ROW_NUMBER()` | Unique row numbers regardless of duplicates |

```sql
SELECT name, salary, 
  RANK() OVER(ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER(ORDER BY salary DESC) AS dense_rank,
  ROW_NUMBER() OVER(ORDER BY salary DESC) AS row_num
FROM Employees;
```

---

### ✅ **5. How do you find the second highest salary?**

```sql
-- Method 1: Using LIMIT and OFFSET (MySQL/PostgreSQL)
SELECT DISTINCT salary 
FROM Employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET 1;

-- Method 2: Using subquery
SELECT MAX(salary) 
FROM Employees 
WHERE salary < (SELECT MAX(salary) FROM Employees);
```

---

### ✅ **6. What is a CTE (Common Table Expression)?**

A **CTE** is a temporary result set defined using `WITH` that can be referenced in a `SELECT`, `INSERT`, `UPDATE`, or `DELETE`.

```sql
WITH HighPaid AS (
  SELECT * FROM Employees WHERE salary > 80000
)
SELECT * FROM HighPaid WHERE dept_id = 3;
```

---

### ✅ **7. What is a `NULL` value? How to filter `NULL`s?**

`NULL` = Unknown or missing value (not 0 or empty).

* To check: `IS NULL` or `IS NOT NULL`
* To handle: Use `COALESCE()` or `IFNULL()`

```sql
SELECT name, COALESCE(phone, 'N/A') FROM Employees;
```

---

### ✅ **8. Write a query to find duplicate records.**

```sql
SELECT name, COUNT(*) 
FROM Employees
GROUP BY name
HAVING COUNT(*) > 1;
```

---

### ✅ **9. Difference between `DELETE`, `TRUNCATE`, and `DROP`**

| Operation  | Description                                           |
| ---------- | ----------------------------------------------------- |
| `DELETE`   | Deletes specific rows, can use WHERE                  |
| `TRUNCATE` | Deletes all rows, faster, cannot rollback in some DBs |
| `DROP`     | Deletes the table entirely                            |

---

### ✅ **10. Explain normalization.**

Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.

#### 🔹 **1NF (First Normal Form)**

* Each column should contain atomic (indivisible) values.
* No repeating groups.

**Example (Not in 1NF):**

| StudentID | Name | Courses       |
| --------- | ---- | ------------- |
| 1         | Raj  | Math, Science |

**Converted to 1NF:**

| StudentID | Name | Course  |
| --------- | ---- | ------- |
| 1         | Raj  | Math    |
| 1         | Raj  | Science |

---

#### 🔹 **2NF (Second Normal Form)**

* Must be in 1NF.
* No partial dependency (non-key column should not depend on part of a composite key).

**Example:**

| StudentID | Course | Instructor |
| --------- | ------ | ---------- |

If `Instructor` depends only on `Course`, then it's partial dependency.

**Fix:** Separate tables:

* StudentCourses(StudentID, Course)
* CourseInstructor(Course, Instructor)

---

#### 🔹 **3NF (Third Normal Form)**

* Must be in 2NF.
* No transitive dependency (non-key column depends on another non-key column).

**Example:**
\| StudentID | Name | DeptID | DeptName |

Here, `DeptName` depends on `DeptID`, not directly on `StudentID`.

**Fix:**

* Students(StudentID, Name, DeptID)
* Departments(DeptID, DeptName)

---

### ✅ **11. What is indexing?**

Indexing improves query performance by allowing faster data retrieval.

**Types:**

* Single-column
* Composite index
* Unique index
* Full-text index

```sql
CREATE INDEX idx_salary ON Employees(salary);
```

---

### ✅ **12. What is a `VIEW`?**

A **VIEW** is a virtual table based on the result of a query.

```sql
CREATE VIEW HighSalaryEmp AS
SELECT name, salary FROM Employees WHERE salary > 80000;
```

---

Would you like me to create a **PDF-ready interview Q\&A sheet** or **add advanced SQL scenario-based questions** too?
