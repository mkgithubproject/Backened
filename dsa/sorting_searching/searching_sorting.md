### Binary Search
```
class Solution {
    public int search(int[] arr, int target) {
        int start = 0;
        int end = arr.length-1;
        while(start<=end){
            int mid = start+(end - start)/2;
            if(arr[mid]== target){
                return mid;
            }else if(arr[mid]>target){
                end = mid-1;
            }else{
                start = mid+1;
            }
        }
        return -1;
    }
}
```
###  Kth Largest Element in an Array
2. Min-Heap (Efficient for Large Arrays)\
Use a min-heap of size k.\
Iterate through elements:\
Add element to heap.\
If heap size > k, remove the smallest.\
Top of heap will be the k-th largest.\
Time complexity: O(n log k)\
Space complexity: O(k)\
maintaine k size heap k
```
import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll(); // remove smallest
            }
        }
        return minHeap.peek();
    }
}
```

###
