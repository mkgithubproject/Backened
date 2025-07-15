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
if array is sorted
hint:1 So, we essentially need to find three numbers x, y, and z such that they add up to the given value. 
If we fix one of the numbers say x, we are left with the two-sum problem at hand!

hint 2: For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, 
which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?

hint 3: The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?
```
```
```

