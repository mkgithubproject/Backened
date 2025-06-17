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

      
