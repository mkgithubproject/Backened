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
### 11. Stock Buy and Sell - Max one Transaction Allowed
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
}
```
### 





 







      
