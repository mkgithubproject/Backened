## Java Arrays Complete Guide

---

### ✅ What is an Array in Java?

An **array** in Java is a **container object** that holds a **fixed number of elements** of the **same data type**.

#### 📌 Key Features:

* **Fixed size**
* **Same data type**
* **Index-based access (0-based)**
* **Stored in contiguous memory**

#### ✅ Syntax:

```java
// Declaration
dataType[] arrayName;

// Creation
arrayName = new dataType[size];

// Declaration + Creation
dataType[] arrayName = new dataType[size];

// Declaration + Creation + Initialization
dataType[] arrayName = {value1, value2, value3};
```

#### ✅ Example:

```java
int[] numbers = {10, 20, 30, 40};
System.out.println(numbers[2]); // Output: 30
```

#### ✅ Looping Through Array:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

for (int num : numbers) {
    System.out.println(num);
}
```

---

### ✅ Array vs ArrayList

| Feature    | Array                     | ArrayList                                      |
| ---------- | ------------------------- | ---------------------------------------------- |
| Size       | Fixed                     | Dynamic                                        |
| Data Type  | Primitives and objects    | Objects only (e.g., Integer)                   |
| Syntax     | `int[] arr = new int[5];` | `ArrayList<Integer> list = new ArrayList<>();` |
| Access     | `arr[i]`                  | `list.get(i)`                                  |
| Add/Remove | Manual                    | `add()`, `remove()` supported                  |
| Length     | `arr.length`              | `list.size()`                                  |

#### ✅ Example:

```java
ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
System.out.println(fruits.get(0));
```

---

### ✅ 2D Arrays

#### 📌 What is a 2D Array?

An array of arrays (matrix form).

#### ✅ Syntax:

```java
int[][] matrix = new int[3][3];
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

#### ✅ Looping:

```java
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
```

---

### ✅ Jagged Arrays

```java
int[][] jagged = new int[3][];
jagged[0] = new int[]{1, 2};
jagged[1] = new int[]{3, 4, 5};
jagged[2] = new int[]{6};
```

---

## ✅ Real-World Problems with 2D Arrays

### 1️⃣ Matrix Addition

```java
int[][] sum = new int[2][2];
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        sum[i][j] = A[i][j] + B[i][j];
    }
}
```

### 2️⃣ Matrix Transpose

```java
int[][] transpose = new int[3][2];
for (int i = 0; i < original.length; i++) {
    for (int j = 0; j < original[0].length; j++) {
        transpose[j][i] = original[i][j];
    }
}
```

### 3️⃣ Matrix Multiplication

```java
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        for (int k = 0; k < 2; k++) {
            result[i][j] += A[i][k] * B[k][j];
        }
    }
}
```

### 4️⃣ Spiral Print

```java
while (top <= bottom && left <= right) {
    // top row
    for (int i = left; i <= right; i++) System.out.print(matrix[top][i] + " ");
    top++;
    // right column
    for (int i = top; i <= bottom; i++) System.out.print(matrix[i][right] + " ");
    right--;
    // bottom row
    for (int i = right; i >= left; i--) System.out.print(matrix[bottom][i] + " ");
    bottom--;
    // left column
    for (int i = bottom; i >= top; i--) System.out.print(matrix[i][left] + " ");
    left++;
}
```

### 5️⃣ Rotate 90° Clockwise

```java
// Transpose
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
}
// Reverse each row
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n / 2; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[i][n - 1 - j];
        matrix[i][n - 1 - j] = temp;
    }
}
```

---

Would you like a printable PDF of this? Or want to go into ArrayList methods in more detail?
