### 3 Sum - Find All Triplets with Zero Sum , Ensure all returned triplets are unique and sorted.
## [Naive Approach] Using Three Nested Loops - O(n^3) Time and O(1) Space
```
// Java program to find triplet having sum zero using 
// three nested loops

import java.util.ArrayList;
import java.util.List;

class GfG {
    static ArrayList<ArrayList<Integer>> findTriplets(int[] arr) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        int n = arr.length;

        // Generating all triplets
        for (int i = 0; i < n - 2; i++) {
            for (int j = i + 1; j < n - 1; j++) {
                for (int k = j + 1; k < n; k++) {
                  
                    // If the sum of triplet equals to zero
                    // then add it's indexes to the result
                    if (arr[i] + arr[j] + arr[k] == 0) {
                        ArrayList<Integer> triplet = new ArrayList<>();
                        triplet.add(i);
                        triplet.add(j);
                        triplet.add(k);
                        res.add(triplet);
                    }
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {0, -1, 2, -3, 1};
        ArrayList<ArrayList<Integer>> res = findTriplets(arr);
        for (List<Integer> triplet : res) 
            System.out.println(triplet.get(0) + " " + triplet.get(1)
                               				  + " " + triplet.get(2));
    }
}
```
```
if array is sorted O(n2)
hint:1 So, we essentially need to find three numbers x, y, and z such that they add up to the given value. 
If we fix one of the numbers say x, we are left with the two-sum problem at hand!

hint 2: For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, 
which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?

hint 3: The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?
```
```
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Set<List<Integer>> result = new HashSet<>();
        List<List<Integer>> result = new ArrayList<>();
        int target = 0;
        Arrays.sort(nums);
        HashSet<Long> set = new HashSet<Long>(); // for removing duplicates triplet
        for(int i= 0;  i<nums.length ; i++){ // i<n-2 or i<n no problem
           int newTarg = target - nums[i];
           int start = i+1;
           int end = nums.length - 1;
           while(start<end){
            if(nums[start]+nums[end]> newTarg){
                end--;
            }else if(nums[start]+nums[end] < newTarg){
                start++;
            }else{
                long hash = getHash(nums[i],nums[start],nums[end]);
                if(set.contains(hash) == false){
                  List<Integer> triplet = new ArrayList<Integer>(Arrays.asList(nums[i],nums[start],nums[end]));
                  result.add(triplet);
                  set.add(hash);
                }
                
                start++;
                end--;
            }
           }
        }
        return result;
    }

    public Long getHash(int a, int b, int c) {
        long hash = a;
        hash *= 100000000;
        hash += b;
        hash *= 100000000;
        hash += c;
        return hash;
    }

}
```
## or
```
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Set<List<Integer>> result = new HashSet<>();
        List<List<Integer>> result = new ArrayList<>();
        int target = 0;
        Arrays.sort(nums);
        HashSet<List<Integer>> set = new HashSet<>(); // for removing duplicates triplet
        for (int i = 0; i < nums.length; i++) { // i<n-2 or i<n no problem
            int newTarg = target - nums[i];
            int start = i + 1;
            int end = nums.length - 1;
            while (start < end) {
                if (nums[start] + nums[end] > newTarg) {
                    end--;
                } else if (nums[start] + nums[end] < newTarg) {
                    start++;
                } else {
                    // long hash = getHash(nums[i],nums[start],nums[end]);
                    List<Integer> triplet = new ArrayList<Integer>(Arrays.asList(nums[i], nums[start], nums[end]));

                    if (set.contains(triplet) == false) {
                        result.add(triplet);
                        set.add(triplet);
                    }

                    start++;
                    end--;
                }
            }
        }
        return result;
    }

}
```
```
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        HashSet<List<Integer>> res=new HashSet<List<Integer>>();
res is a Set of lists.\
Each List<Integer> is a triplet (e.g., [a, b, c]) that sums to 0.\
A Set automatically removes duplicates, which is useful here.\
So it must return a List<List<Integer>>, not a Set.\
Does two things:
Copies all elements from the Set res into a new List.\
Returns a List<List<Integer>>, which matches the method return type.\
        Arrays.sort(nums);
        for(int i=0;i<nums.length-2;i++){
            int j=i+1;
            int k=nums.length-1;
            while(j<k){
                int sum=nums[j]+nums[k];
                if(sum==-nums[i]){
                  res.add(Arrays.asList(nums[i],nums[j],nums[k]));
                  j++;
                  k--;
                }else if(sum>-nums[i]){
                    k--;
                }else{
                    j++;
                }
            }
        }
        return new ArrayList<>(res);
        
    }
}
```

### 2. Container With Most Water
## brute force [Naive Approach] Finding all possible boundaries - O(n^2) Time and O(1) Space
## just like , a , b ,c, d, e ( a-b , ac, a-d , a-e boundaris which ever has max water)
```
// Java Program to find the maximum amount of water
// by iterating over all possible boundaries

import java.util.*;
class GfG {
    static int maxWater(int[] arr) {
        int n = arr.length;
        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
              
                // Calculate the amount of water
                int amount = Math.min(arr[i], arr[j]) * (j - i);
              
                // Keep track of maximum amount of water
                res = Math.max(amount, res);
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 8, 6, 4, 6, 5, 5};
        System.out.println(maxWater(arr));
    }
}
```
## [Expected Approach] Using Two Pointers - O(n) Time and O(1) Space
## note compare a-e (if a smaller than e then dont need to check for a-b, a-c, a-d because height will be same and width is decreasing so volume is decreasing)
```
class Solution {
    public int maxArea(int[] height) {
        int res = 0;
        int start = 0;
        int end = height.length -1;
        while(start< end){
            int h = Math.min(height[start], height[end]);
            int width = end-start;
            res = Math.max(res, h*width);
            if(height[start] < height[end]){
                start++;
            }else{
                end--;
            }
        }
        return res;
    }
    
}
```

### 3. Longest Consecutive Sequence
## using sorting
## using hashmap
```
class Solution {
    public int longestConsecutive(int[] nums) {
        HashSet<Integer> set = new HashSet<Integer>();
        // add all the unique element in hash
        for(int val : nums){
            set.add(val);
        }

        int longest =0;
        for(int num : set){
            // Only try to build sequence from start of sequence
            if(!set.contains(num-1)){
              int currentNum = num;
              int count =1;
              while(set.contains(currentNum+1)){
                 count++;
                 currentNum++;
              }
              longest = Math.max(longest, count);
            }
        }
        return longest;

    }
}
```


