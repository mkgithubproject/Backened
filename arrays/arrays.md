### 1. Find Missing and Repeating element
  ```
class Solution {
    ArrayList<Integer> findTwoElement(int arr[]) {
        ArrayList<Integer> twoElem  = new ArrayList<Integer>();
        for(int i =0 ; i < arr.length; i++){
            int value = Math.abs(arr[i]);
            if(arr[value -1 ] > 0){
                arr[value -1] = -arr[value -1];
            }else{
                 // ✅ repeated number found 
                twoElem.add(value);
            }
        }
        // ✅ traverse again and check if you fine any positive number 
        // ✅ it means , we had no such element who can make it nergative
        // ✅ means index+1 element was missing
        for(int i =0; i< arr.length ;i++){
            if(arr[i]>0){
                twoElem.add(i+1);
                break;
            }
        }
        return twoElem;
    }
}
  ```
  #### Notes:
  we're using the sign of the numbers in the array to track whether a number has been seen before. This avoids needing extra space.\
  ✅ This works because:
  The array has values from 1 to N, so we use value - 1 as the index.\
  The first time we see a value, we make the corresponding index negative.\
  If we see it again, the number is already negative → it's duplicate.

  ### solution two single array iteration , more optimized
  ```
  // User function Template for Java

class Solution {
    // Function to find two elements in array
    ArrayList<Integer> findTwoElement(int arr[]) {
        // code here
        ArrayList<Integer> twoElem  = new ArrayList<Integer>();
        int givenArraySum = 0;
        int repeatedValue = -1;
        for(int i =0 ; i < arr.length; i++){
            int value = Math.abs(arr[i]);
            if(arr[value -1 ] > 0){
                arr[value -1] = -arr[value -1];
            }else{
                // repeated number found 
                repeatedValue = value;
            }
            givenArraySum +=value;
            
        }
        int actualSumOfnNaturalNumbers = (arr.length*(1+arr.length))/2;
        givenArraySum = givenArraySum - repeatedValue;
        int missingNumber = Math.abs(actualSumOfnNaturalNumbers-givenArraySum);
        twoElem.add(repeatedValue);
        twoElem.add(missingNumber);
        return twoElem;
    }
}
```



### 2. 📈 Stock Buy and Sell – Max One Transaction Allowed

## 📝 Problem Statement

Given an array of stock prices, where the `i-th` element represents the price of the stock on day `i`, find the **maximum profit** you can achieve from **one** buy and **one** sell operation.

- You **must** buy before you sell.
- If no profit is possible, return `0`.

---

## 🧠 Approach

To solve this problem in **O(n)** time and **O(1)** space:

1. Track the **minimum price** seen so far while iterating.
2. Calculate the **potential profit** at each step.
3. Update the **maximum profit** if the current profit is greater.

---

## ✅ Java Implementation

```java
import java.util.*;

public class StockProfit {
    public static int maxProfit(int[] prices) {
        if (prices == null || prices.length < 2) return 0;

        int minPrice = prices[0];         // 🟡 Minimum price seen so far
        int maxProfit = 0;                // 🔵 Maximum profit so far

        for (int i = 1; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];     // 🔽 Found a new lower buying price
            } else {
                int profit = prices[i] - minPrice;   // 💰 Potential profit
                if (profit > maxProfit) {
                    maxProfit = profit;   // 🆙 Update max profit if better
                }
            }
        }

        return maxProfit;
    }

    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};
        System.out.println("Maximum Profit: " + maxProfit(prices));
    }
}
```

---

## 🧪 Example

```
Input:  [7, 1, 5, 3, 6, 4]
Output: 5

Explanation:
Buy on day 2 (price = 1)
Sell on day 5 (price = 6)
Profit = 6 - 1 = 5
```

---

## ⏱ Time & Space Complexity

| Metric           | Value   |
|------------------|---------|
| Time Complexity  | O(n)    |
| Space Complexity | O(1)    |

---

## 📌 Edge Cases

- All prices decreasing → Profit = 0
- Only one day → Profit = 0
- Null or empty array → Profit = 0

---

## 💡 Notes

- This problem is a classic example of a **greedy algorithm**.
- Keep track of **buying low** and **selling high**.
- Efficient solution avoids nested loops (which would be O(n²)).


```
```
### 3. 🧹 Remove Duplicates from Sorted Array (Java)

## 📝 Problem Statement

Given a **sorted array**, remove the duplicates **in-place** such that each element appears only once and return the new length.

Do **not** allocate extra space for another array; you must do this by **modifying the input array** in-place with O(1) extra memory.

---

## ✅ Approach

### Key Observations:

* The array is **sorted**, so duplicates will be **adjacent**.
* You can iterate through the array and shift non-duplicate values forward.

---

## ✅ Java Implementation

```java
class Solution {
    // Function to remove duplicates from the given sorted array
    public int removeDuplicates(int[] arr) {
        // Edge case: empty array
        if (arr == null || arr.length == 0) return 0;

        int index = 0; // Index to place unique elements

        // Traverse till the second last element
        for (int i = 0; i < arr.length - 1; i++) {
            // If current and next element are different, keep it
            if (arr[i] != arr[i + 1]) {
                arr[index++] = arr[i];
            }
        }

        // Always include the last element
        arr[index++] = arr[arr.length - 1];

        return index; // Length of array with unique elements
    }
}
```

---

## 🧺 Example

```java
int[] arr = {1, 1, 2, 2, 3};
Solution sol = new Solution();
int len = sol.removeDuplicates(arr);

System.out.print("Unique elements: ");
for (int i = 0; i < len; i++) {
    System.out.print(arr[i] + " ");
}
// Output: Unique elements: 1 2 3
```

---

## 🔍 Time and Space Complexity

* **Time Complexity**: O(n) – where `n` is the number of elements in the array.
* **Space Complexity**: O(1) – in-place modification, no extra space used.

---

## ⚠️ Edge Cases

* Empty array: `[]` → Return 0
* All unique: `[1, 2, 3]` → Return length 3
* All duplicates: `[1, 1, 1, 1]` → Return 1

---

## ✅ Summary

This solution efficiently removes duplicates **in-place**, and ensures we only retain unique values while preserving order. It handles edge cases like empty input and returns the correct length of the unique array portion.

---
```
```
### 3. 🥉 Find the Third Largest Element in an Array
/*
 * 🥉 Find the Third Largest Element in an Array
 *
 * ✅ Problem Statement:
 * Given an array of integers, return the third largest **distinct** element.
 * If the third largest doesn't exist, return -1.
 *
 * ✅ Key Observations:
 * - Track three distinct max values: first, second, third.
 * - Skip duplicates to ensure distinct elements.
 * - Maintain values in a single pass.
 *
 * ✅ Time Complexity: O(n)
 * ✅ Space Complexity: O(1)
 */

class Solution {
    int thirdLargest(int arr[]) {
        // Handle edge case: less than 3 elements
        if (arr.length < 3) return -1;

        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        int third = Integer.MIN_VALUE;

        for (int i = 0; i < arr.length; i++) {
            // Skip duplicates
            if (arr[i] == first || arr[i] == second || arr[i] == third) continue;

            if (arr[i] > first) {
                third = second;
                second = first;
                first = arr[i];
            } else if (arr[i] > second) {
                third = second;
                second = arr[i];
            } else if (arr[i] > third) {
                third = arr[i];
            }
        }

        return third == Integer.MIN_VALUE ? -1 : third;
    }

    // Test it with an example
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] arr = {70, 60, 60, 50, 50, 40};
        System.out.println("Third largest element is: " + sol.thirdLargest(arr));
        // Expected output: 50
    }
}
```
class Solution {
    int thirdLargest(int arr[]) {
        // Your code here
      int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE, 
      third = Integer.MIN_VALUE;
      
      for(int i = 0; i< arr.length;i++){
          if(arr[i] > first){
              third = second;
              second = first;
              first = arr[i];
          }else if(arr[i] > second ){
              third = second;
              second = arr[i];
          }else if(arr[i] >third){
              third = arr[i];
          }
      }
      // in case of duplicate 
    //   for (int i = 0; i < arr.length; i++) {
    //         if (arr[i] > first) {
    //             third = second;
    //             second = first;
    //             first = arr[i];
    //         } else if (arr[i] > second && arr[i] != first) {
    //             third = second;
    //             second = arr[i];
    //         } else if (arr[i] > third && arr[i] != second && arr[i] != first) {
    //             third = arr[i];
    //         }
    //     }
      return third;

    }
}
```



      
