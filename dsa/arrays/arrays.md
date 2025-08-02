### 1. Find Missing and Repeating element
nput: arr[] = [3, 1, 3]
Output: [3, 2]
Explanation: 3 is occurs twice and 2 is missing.
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

Given an array of stock prices, where the `i-th` element represents the price of the stock on day `i`, find the **maximum profit** you can achieve from **one** buy and **one** sell operation.\
. trick , mujhe aaj bechna h max profit kamana h to time machine do mai pichhe jake minum pr buy kr lunga jake then aaj sell kr dunga, means \
minimum ko maintain krke rakho

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
### agar current price kam till min so far thne kharidta rahunga agar ni to aaj sell krke dekhte h agar profir max profit se jada h to update kr do

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
### 4. 🥉 Find the Third Largest Element in an Array
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

### 5. Convert array into Zig-Zag fashion
Input: N = 7, arr[] = [4, 3, 7, 8, 6, 2, 1]\
 Output: [3, 7, 4, 8, 2, 6, 1]\
 Explanation:  The given array is in zig-zag pattern as we can see 3 < 7 > 4 < 8 > 2 < 6 >1 
  ```
  
class Solution {
    public static void zigZag(int[] arr) {
        // code here
        boolean lessThanFlag = true;
        // approach arr[i-1] < arr[i] > arr[i+1].
        for(int i=0;i<arr.length-1;i++){
            if(lessThanFlag){
                if(arr[i]> arr[i+1]){
                    // swap
                    int temp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = temp;
                }
            }else{ // lessThanFlag false 
                if(arr[i] < arr[i+1]){
                    // swap
                    int temp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = temp;
                }
            }
            lessThanFlag = !lessThanFlag;
        }
    }
}

  ```
  #### Notes:
  
The idea is that for each triplet, the middle element should be greater than its adjacent neighbours. So, for each triplet:\
First check the left neighbour with the middle element. If middle is smaller, swap the elements.\
Then check the middle with right neighbour. If middle is smaller, swap the elements.\
Repeat the process till complete array is traversed.
```
```
### 6. Pair Sum in a Sorted and Rotated Array
nput: arr[] = [11, 15, 6, 8, 9, 10], target = 16\
Output: true\
Explanation: There is a pair (6, 10) with sum 16.
  ```
class Solution {
    static boolean pairInSortedRotated(int arr[], int target) {
        // Your code here
        // find pivot element
        int pivot = -1;
        for(int i =0 ;i <arr.length-1 ; i++){
            if(arr[i+1] < arr[i]){
                pivot = i;
                break;
            }
        }
        int startPointer = 0;
        int endPointer = arr.length-1;
        if(pivot!=-1){
            startPointer = pivot+1;
            endPointer = pivot;
        }
        while(startPointer!=endPointer){
            if(arr[startPointer]+arr[endPointer] == target){
                return true;
            }else if(arr[startPointer]+arr[endPointer] > target){
                // reduce end pointer
                endPointer = (endPointer-1+arr.length)%arr.length;
            }else{
                startPointer = (startPointer+1)%arr.length;
            }
        }
        return false;
        
    }
}
  ```
  #### Notes:
  
 First find the largest element in an array which is the pivot point. The element just after the largest element is the smallest element. Once   we have the indices of the largest and the smallest elements, we use two pointer technique to find the pair.\
 1. Set the left pointer(l) to the smallest value and the right pointer(r) to the highest value.\
 2. To handle the circular nature of the rotated array, we will use the modulo operation with the array size.(n/arraySize => (0 - arraySize-1 remainder )\

### Method :2 [Naive Approach] Using Hashing - O(n) Time and O(n) Space
```
// Java code to check whether any pair exists
// whose sum is equal to the given target value

import java.util.HashSet;
class GfG {
    static boolean pairInSortedRotated(int[] arr, int target){
        HashSet<Integer> set = new HashSet<>();
        for (int i = 0; i < arr.length; i++) {

            // Calculate the complement that added to
            // arr[i], equals the target
            int complement = target - arr[i];

            // Check if the complement exists in the set
            if (set.contains(complement)) {
                return true;
            }

            // Add the current element to the set
            set.add(arr[i]);
        }
        
        // If no pair is found
        return false;
    }

    public static void main(String[] args) {
        int[] arr = {11, 15, 6, 8, 9, 10};
        int target = 16;

        if (pairInSortedRotated(arr, target))
            System.out.println("true");
        else
            System.out.println("false");
    }
}
```
```
```

### 7. Sort an array of 0s, 1s and 2s 
Input: arr[] = {0, 1, 2, 0, 1, 2}\
Output: {0, 0, 1, 1, 2, 2}\
Explanation: {0, 0, 1, 1, 2, 2} has all 0s first, then all 1s and all 2s in last.
  ```
  class Solution {
    public static void sort012(int arr[], int n) {
        int i = 0;
        int nz = 0;           // Next position for 0
        int nt = n - 1;       // Next position for 2

        while (i <= nt) {
            if (arr[i] == 0) {
                // Swap current element with position of nz
                int temp = arr[nz];
                arr[nz] = arr[i];
                arr[i] = temp;
                i++;
                nz++;
            } else if (arr[i] == 2) {
                // Swap current element with position of nt
                int temp = arr[nt];
                arr[nt] = arr[i];
                arr[i] = temp;
                nt--;
                // i is not incremented here because swapped value needs to be checked
            } else {
                // If the element is 1, move forward
                i++;
            }
        }
    }
}
```
### 8. Rotate an Array by d - Counterclockwise or Left:
Input: arr[] = {1, 2, 3, 4, 5, 6}, d = 2\
Output: {3, 4, 5, 6, 1, 2}\
Explanation: After first left rotation, arr[] becomes {2, 3, 4, 5, 6, 1} \
and after the second rotation, arr[] becomes {3, 4, 5, 6, 1, 2}\
 m1: [Naive Approach] Rotate one by one - O(n * d) Time and O(1) Space\
 m2: [Better Approach] Using Temporary Array - O(n) Time and O(n) Space\
 m3:[Expected Approach 1] Using Juggling Algorithm - O(n) Time and O(1) Space\
 m4:[Expected Approach 2] Using Reversal Algorithm - O(n) Time and O(1) Space\
       Reverse the subarray containing the first d elements of the array.\
       Reverse the subarray containing the last (n - d) elements of the array.\
       Finally, reverse all the elements of the array.\
 code:
 ```
class Solution {
    // Function to rotate an array by d elements in counter-clockwise direction.
    static void rotateArr(int arr[], int d) {
        d = d%arr.length;
        reverseArray(arr,0, d-1);
        reverseArray(arr,d, arr.length-1);
        reverseArray(arr,0, arr.length-1);
    }
    
    static void reverseArray(int arr[] , int startingIndex, int endIndex){
        while(startingIndex < endIndex){
            int temp = arr[startingIndex];
            arr[startingIndex] = arr[endIndex];
            arr[endIndex] = temp;
            startingIndex++;
            endIndex--;
        }
    }
}
 ```
edge case: for d = d%arr.length \
int[] arr = {10, 20, 30, 40, 50};
int d = 7; // Greater than arr.length (which is 5)
Since rotating an array of length 5 by 7 positions counter-clockwise is the same as rotating by 2 (because 7 % 5 = 2), 
```
```
### 9. Majority Element
Input: arr[] = [1, 1, 2, 1, 3, 5, 1]\
Output: 1\
Explanation: Element 1 appears 4 times. Since ⌊7/2⌋ = 3, and 4 > 3, it is the majority eleme
  m1: Naive Approach] Using Two Nested Loops - O(n^2) Time and O(1) Space\
  m2: [Better Approach 1] Using Sorting - O(n log n) Time and O(1) Space
  ```
class Solution {
    static int majorityElement(int arr[]) {
        // code here
        Arrays.sort(arr);
        int count = 1;
        if(arr.length ==1){
            return arr[0];
        }
        for(int i = 1 ;i < arr.length ;i++){
            if(arr[i] ==  arr[i-1]){
                count++;
                if(count > arr.length/2){
                return arr[i];
            }
            }else{
                count =1;
            }
            
            
        }
        return -1;
    }
}
or
class Solution {
    static int majorityElement(int arr[]) {
        int n = arr.length;
        Arrays.sort(arr);
        // Potential majority element
        int candidate = arr[n/2];  
    
        int count = 0;
        for (int num : arr) {
            if (num == candidate) {
                count++;
            }
        }
    
        if (count > n/2) {
            return candidate;
        }
        // No majority element
        return -1; 
    }
}
```
m3: [Better Approach 2] Using Hashing - O(n) Time and O(n) Space
```
 static int majorityElement(int[] arr) {
        int n = arr.length;
        Map<Integer, Integer> countMap = new HashMap<>();

        // Traverse the array and count occurrences using the hash map
        for (int num : arr) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
          
            // Check if current element count exceeds n / 2
            if (countMap.get(num) > n / 2) {
                return num;
            }
        }

        // If no majority element is found, return -1
        return -1;
    }
```
m4: [Expected Approach] Using Moore's Voting Algorithm- O(n) Time and O(1) Space\
If an element occurs more than half the time (n/2) in an array, it will "survive" all pairwise eliminations against other elements.\
### How It Works (In Simple Words):
  ## Candidate Selection (Voting Phase):

      Initialize a candidate and a count.

      For each element:

          If count == 0, set candidate = element.

          If element == candidate, increment count.

          Else, decrement count.

  ## Validation (Optional):

        Count how many times the candidate appears.

        If it appears more than n/2, it's the majority element.
```
// Java program to find Majority
// element in an array

class GfG {
    static int majorityElement(int[] arr) {
        int n = arr.length;
        int candidate = -1;
        int count = 0;

        // Find a candidate
        for (int num : arr) {
            if (count == 0) {
                candidate = num;
                count = 1;
            } else if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }

        // Validate the candidate
        count = 0;
        for (int num : arr) {
            if (num == candidate) {
                count++;
            }
        }
	
      	// If count is greater than n / 2, return the candidate; otherwise, return -1
        if (count > n / 2) {
            return candidate;
        } else {
            return -1;
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 1, 2, 1, 3, 5, 1};
        System.out.println(majorityElement(arr));
    }
}
```

### 10. Maximum Subarray Sum - Kadane's Algorithm
nput: arr[] = [2, 3, -8, 7, -1, 2, 3]\
Output: 11\
Explanation: The subarray [7, -1, 2, 3] has the largest sum 11.\
  Method1: [Naive Approach] By iterating over all subarrays - O(n^2) Time and O(1) Space\
  Method2 : [Expected Approach] Using Kadane's Algorithm - O(n) Time and O(1) Space
  #### Kadane says: “As long as the path is helping me grow, I’ll keep going.If not, I’ll start again from the current position.”
  ```
	class Solution {
    int maxSubarraySum(int[] arr) {
        // Your code here
        int maxSum = Integer.MIN_VALUE;
        int sum = 0;
        for(int i = 0 ; i< arr.length; i++){
            sum = Math.max(arr[i], sum + arr[i]);
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum;
    }
}
```
#### Modified Kadane’s Algorithm with Start & End Index Tracking
```
class Solution {
    int maxSubarraySum(int[] arr) {
        int maxSum = Integer.MIN_VALUE;
        int sum = 0;
        int start = 0, end = 0, tempStart = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > sum + arr[i]) {
                sum = arr[i];
                tempStart = i;  // New potential start of subarray
            } else {
                sum += arr[i];
            }

            if (sum > maxSum) {
                maxSum = sum;
                start = tempStart;  // Confirmed start of max subarray
                end = i;            // Current index is the end
            }
        }

        System.out.println("Maximum Subarray Sum: " + maxSum);
        System.out.println("Start Index: " + start);
        System.out.println("End Index: " + end);

        return maxSum;
    }
}
```
### 11. Stock Buy and Sell - Multiple Transaction Allowed
Input: prices[] = {100, 180, 260, 310, 40, 535, 695}\
Output: 865\
Explanation: Buy the stock on day 0 and sell it on day 3 => 310 - 100 = 210\
                       Buy the stock on day 4 and sell it on day 6 => 695 - 40 = 655\
                       Maximum Profit  = 210 + 655 = 865
```
// local minima / maxima
class Solution {
    public int maximumProfit(int prices[]) {
        int localMinima = prices[0];
        int localMaxima = prices[0];
        int totalProfit = 0;

        for (int i = 1; i < prices.length; i++) {
            if (prices[i] >= localMaxima) {
                localMaxima = prices[i];
            } else {
                totalProfit += (localMaxima - localMinima);
                localMinima = prices[i];
                localMaxima = prices[i];
            }
        }

        totalProfit += (localMaxima - localMinima);
        return totalProfit;
    }
}

```
```
class GfG {
  
    // Function to calculate the maximum profit
    static int maximumProfit(int[] prices) {
        int n = prices.length;
        int lMin = prices[0];  // Local Minima
        int lMax = prices[0];  // Local Maxima
        int res = 0;

        int i = 0;
        while (i < n - 1) {
          
            // Find local minima
            while (i < n - 1 && prices[i] >= prices[i + 1]) { i++; }
            lMin = prices[i];
           
            // Local Maxima
            while (i < n - 1 && prices[i] <= prices[i + 1]) { i++; }
            lMax = prices[i];
          
            // Add current profit
            res += (lMax - lMin);
        }
      
        return res;
    }

    public static void main(String[] args) {
        int[] prices = {100, 180, 260, 310, 40, 535, 695};
        System.out.println(maximumProfit(prices));
    }
}
```
To maximize profit in this problem when multiple transactions are allowed:\

You should buy at every local minima and sell at every local maxima.\

A simpler logic: Add all increments (i.e., whenever price[i] > price[i-1], add the difference).

```
class Solution {
    public int maximumProfit(int prices[]) {
        int totalProfit = 0;
        
        for(int i = 1; i < prices.length; i++) {
            if(prices[i] > prices[i - 1]) {
                totalProfit += prices[i] - prices[i - 1];
            }
        }
        
        return totalProfit;
    }
}
```
### 12.  Next Permutation
Let's try some examples to see if we can recognize some patterns. \
[1, 2, 3, 4, 5]: next is [1, 2, 3, 5, 4] \
Observation: 4 moves and 5 comes in place of it\
[1, 2, 3, 5, 4]: next is [1, 2, 4, 3, 5]\
Observation: 3 moves, 4 comes in place of it. 3 comes before 5 (mainly 3 and 5 are in sorted order)\
[1, 2, 3, 6, 5, 4]: next is [1, 2, 4, 3, 5, 6] \
Observation: 3 moves, 4 comes in place of it. [3, 5 and 6 are placed in sorted order]\
[3, 2, 1]: next is [1, 2, 3]\
Observation: All elements are reverse sorted. Result is whole array sorted.\
```
class Solution {
    void nextPermutation(int[] arr) {
        int n = arr.length;
        int i = n - 2;

        // Step 1: Find first decreasing element from the end
        while (i >= 0 && arr[i] >= arr[i + 1]) {
            i--;
        }

        // Step 2: If found, find the next greater element on the right
        if (i >= 0) {
            int j = n - 1;
            while (arr[j] <= arr[i]) {
                j--;
            }
            // Swap arr[i] and arr[j]
            swap(arr, i, j);
        }

        // Step 3: Reverse the right part (from i+1 to end)
        reverse(arr, i + 1, n - 1);
    }

    // Helper method to swap two elements in the array
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Helper method to reverse a part of the array
    private void reverse(int[] arr, int start, int end) {
        while (start < end) {
            swap(arr, start, end);
            start++;
            end--;
        }
    }
}
```
### 13  find path using recursion
```
let obj = {a:{b:{c:12, j:false},k:null}};

function getPath(obj, keysPath){
    if(keysPath.length == 1){
        return obj[keysPath]
    }
    if(keysPath.length ==0){
        return 'undefined'
    }
    let splittedKeyPath = keysPath.split('.')
    let myResult = obj[splittedKeyPath[0]];

    let recursiveResult = getPath(myResult , keysPath.slice(2))
    return recursiveResult;
}

console.log(getPath(obj,'a.b.c'))
```
### 14. Product of Array Except Self
Example 1:\
Input: nums = [1,2,3,4]\
Output: [24,12,8,6]\
Example 2:\
Input: nums = [-1,1,0,-3,3]\
Output: [0,0,9,0,0]
```
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int totalProduct = 1;
        int zeroCount = 0;

        for (int num : nums) {
            if (num == 0) {
                zeroCount++;
                continue;
            }
            totalProduct *= num;
        }

        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            if (zeroCount > 1) {
                res[i] = 0;
            } else if (zeroCount == 1) {
                res[i] = nums[i] == 0 ? totalProduct : 0;
            } else {
                res[i] = totalProduct / nums[i];
            }
        }

        return res;
    }

}
```

### 14. Move Zeroes
Example 1:\
Input: nums = [0,1,0,3,12]\
Output: [1,3,12,0,0]

```
class Solution {
    public void shift(int start, int end, int[] nums) {
        for (int i = start; i < end; i++) {
            nums[i] = nums[i + 1];
        }
    }

    public void moveZeroes(int[] nums) {
        // two pointer 
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            if (nums[left] == 0) {
                // shift all the elemnt to the left
                shift(left, right, nums);
                nums[right] = 0; // place zero at the end
                right--;
            } else {
                left++;
            }
        }
    }
}```
## m-2
```
class Solution {
    public void moveZeroes(int[] nums) {
        int count=0;
        for(int i=0;i<nums.length;i++){
            if(nums[i]!=0){
                nums[count++]=nums[i];
            }
        }
        for(int i=count;i<nums.length;i++){
            nums[i]=0;
        }
        
    }
}```

### 15 Next Permutation
Here’s a clear explanation and implementation of **Leetcode 31. Next Permutation** in Java.

---

## ✅ Problem Statement:

Given an array of integers `nums`, **find the next lexicographically greater permutation** of numbers.

If such an arrangement is not possible, rearrange it as the **lowest possible order** (i.e., sorted in ascending order).

You must do this **in-place** (modify the array directly, no extra memory).

---

## 🚀 Example:

### Input:

```
nums = [1, 2, 3]
```

### Output:

```
[1, 3, 2]
```

---

### Input:

```
nums = [3, 2, 1]
```

### Output:

```
[1, 2, 3]
```

---

## 🔍 Key Intuition:

* We need to find the **next permutation** which is **just larger** than the current one.

---

## 🔧 Steps:

1. **Find the first decreasing element from the right** (i.e., `i` such that `nums[i] < nums[i+1]`).

   * This is the "breaking point".

2. **Find the next larger number to the right of `nums[i]`**, say `nums[j]`, and **swap** them.

3. **Reverse** the subarray after index `i` to get the smallest order.

---

### ⚠️ Edge Case:

* If the entire array is non-increasing (e.g., `[5,4,3,2,1]`), then it's the **last** permutation → return the **first** by reversing the array.

---

## ✅ Java Code:

```java
public void nextPermutation(int[] nums) {
    int n = nums.length;
    int i = n - 2;

    // Step 1: Find first decreasing element from right
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        // Step 2: Find next greater element to the right
        int j = n - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }
        // Swap nums[i] and nums[j]
        swap(nums, i, j);
    }

    // Step 3: Reverse the right part
    reverse(nums, i + 1, n - 1);
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

private void reverse(int[] nums, int start, int end) {
    while (start < end) {
        swap(nums, start, end);
        start++;
        end--;
    }
}
```

---

## 📊 Dry Run Example:

### Input:

```
nums = [1, 3, 2]
```

1. Find `i` where `nums[i] < nums[i + 1]`:
   `i = 0` because `1 < 3`

2. Find `j` where `nums[j] > nums[i]`:
   `j = 2` because `2 > 1`

3. Swap `nums[i]` and `nums[j]`:
   `[2, 3, 1]`

4. Reverse from `i+1` to end:
   Result: `[2, 1, 3]` ✅

---

### 16 . Minimum Size Subarray Sum (using prefix sum)
Input: target = 7, nums = [2,3,1,2,4,3]\
Output: 2\
Explanation: The subarray [4,3] has the minimal length under the problem constraint.\

[Naive Approach] Using Two Nested Loops - O(n^2) Time and O(1) Space\
take starting element and then try to pick from j =i and check given sum equal to target , update legth break ,\
[Better Approach] - Prefix Sum and Binary Search - O(n Log n) Time and O(n) Space\
```
class Solution {
    // public int minSubArrayLen(int target, int[] nums) {
    //     /*
    //     subArraySum(i,j) = ps(j) -ps(i-1);
    //     example: a = [1,2,3,5]
    //     ps = [1,3,6,11] // this is sorted array can apply binary search
    //     subArraySum(1,3) = 11-1 = 10 ( calculed in O(1) time)
    //     target = ps(j) -ps(i-1);
    //     ps(i-1); = ps(j) - k // 

    //     */
    //      int[] prefixSum = int[nums.length];
    //      prefixSum[0] = nums[0];
    //      for(int i = 1; i<nums.length;i++){
    //         prefixSum[i] = prefixSum[i-1]+nums[i];
    //      }
    // }

    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int[] prefixSum = new int[n];
        prefixSum[0] = nums[0];

        // Step 1: Build prefix sum array
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }

        int minLen = Integer.MAX_VALUE;

        // Step 2: For each j, find the longest i-1 such that:
        // prefixSum[i-1] <= prefixSum[j] - target
        for (int j = 0; j < n; j++) {
            if (prefixSum[j] >= target) {
                int required = prefixSum[j] - target;
                int i = lowerBound(prefixSum, required);
                if (i != -1) {
                    minLen = Math.min(minLen, j - i);
                } else {
                    // No smaller prefix found, subarray starts from 0
                    minLen = Math.min(minLen, j + 1);
                }
            }
        }

        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }

    // Binary search: find largest i where prefixSum[i] <= target
    private int lowerBound(int[] prefixSum, int target) {
        int left = 0, right = prefixSum.length - 1;
        int ans = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (prefixSum[mid] <= target) {
                ans = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return ans;
    }

}
```

[Expected Approach] - Using Two Pointers - O(n) Time and O(1) Space (sliding window)\
Perfect! Let's now solve **Leetcode 209. Minimum Size Subarray Sum** using the **Expected Approach** — the optimal **Two Pointers / Sliding Window** method.

---

### ✅ Approach: Two Pointers (Sliding Window)

This is the **most efficient solution**:

* **Time Complexity:** O(n) ✅
* **Space Complexity:** O(1) ✅

---

### 🧠 Core Idea

We use two pointers `start` and `end` to maintain a **sliding window**.

* We expand the window to the right (`end++`) and keep adding to `sum`.
* As soon as `sum >= target`, we try to **shrink the window from the left (`start++`)** to find the **minimum length** that still satisfies the condition.

---

### 📘 Example

```text
Input: nums = [2,3,1,2,4,3], target = 7
Expected Output: 2 (subarray [4,3] or [3,4])
```

```java
public class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;

        int left = 0;                // Start of sliding window
        int sum = 0;                 // Current sum of the window
        int minLength = Integer.MAX_VALUE;

        // Move right pointer through the array
        for (int right = 0; right < n; right++) {
            sum += nums[right];     // Expand the window by adding nums[right]

            // Shrink window while sum >= target
            while (sum >= target) {
                // Update minLength if this window is smaller
                minLength = Math.min(minLength, right - left + 1);

                // Shrink the window from the left
                sum -= nums[left];
                left++;
            }
        }

        // If no valid window was found, return 0
        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}
```

---

### 🔍 Dry Run for Input `[2,3,1,2,4,3]`, target = 7

| Step | left | right | sum | window     | minLength |
| ---- | ---- | ----- | --- | ---------- | --------- |
| 1    | 0    | 0     | 2   | \[2]       | ∞         |
| 2    | 0    | 1     | 5   | \[2,3]     | ∞         |
| 3    | 0    | 2     | 6   | \[2,3,1]   | ∞         |
| 4    | 0    | 3     | 8   | \[2,3,1,2] | 4         |
| 5    | 1    | 3     | 6   | \[3,1,2]   | 4         |
| 6    | 1    | 4     | 10  | \[3,1,2,4] | 4 → 4     |
| 7    | 2    | 4     | 7   | \[1,2,4]   | 4 → 3     |
| 8    | 3    | 4     | 6   | \[2,4]     | 3         |
| 9    | 3    | 5     | 9   | \[2,4,3]   | 3         |
| 10   | 4    | 5     | 7   | \[4,3]     | ✅ 2       |
| 11   | 5    | 5     | 3   | \[3]       | -         |

Final `minLength = 2`

---

### ✅ Output: `2` ✅

---

### 🧠 Summary

| Metric           | Value                         |
| ---------------- | ----------------------------- |
| Time Complexity  | O(n)                          |
| Space Complexity | O(1)                          |
| Best Approach    | Sliding Window (Two Pointers) |

---

Let me know if you want a **Python version**, or a **visual sliding window animation** too!

### 17 88. Merge Sorted Array 
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\
Output: [1,2,2,3,5,6]\
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].\
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.\
```
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1;

        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p--] = nums1[p1--];
            } else {
                nums1[p--] = nums2[p2--];
            }
        }

        // If nums2 is not fully merged
        while (p2 >= 0) {
            nums1[p--] = nums2[p2--];
        }
    }
}

```










 







      
