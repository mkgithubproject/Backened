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

### quick sort
```
import java.util.*;

class Solution {
    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    public void quickSort(int[] arr, int low, int high) {
        if (low >= high) {
            return;
        }

        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    private int partition(int[] arr, int low, int high) {
        // Random pivot to avoid worst-case O(n^2)
        int randomIndex = (int)(Math.random() * (high));
        swap(arr, low, randomIndex);

        int pivot = arr[low];
        int left = low + 1;
        int right = high;

        while (left <= right) {
            while (left <= right && arr[left] <= pivot) {
                left++;
            }
            while (left <= right && arr[right] > pivot) {
                right--;
            }
            if (left < right) {
                swap(arr, left, right);
                left++;
                right--;
            }
        }

        // Put pivot in the correct position
        swap(arr, low, right);
        return right;
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

```

### selection sort
```
class Solution {
    public int[] sortArray(int[] nums) {
        // selction sort
        for (int i = 0; i < nums.length; i++) {
            int minIndex = i;
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            // swap
            int temp = nums[minIndex];
            nums[minIndex] = nums[i];
            nums[i] = temp;
        }
        return nums;
    }
}
```

### bubble sort
```
public void bubbleSort(int[] arr) {
        // code here
        for(int i =0 ; i< arr.length-1;i++){
            
            for(int j = 0 ; j< arr.length - i -1 ; j++){
                if(arr[j] > arr[j+1]){
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        
    }
```
### insertion sort
```
  // Please change the array in-place
    public void insertionSort(int arr[]) {
        // code here
        for( int i = 1 ; i< arr.length;i++){
            int elem = arr[i];
            // put it into sorted array in correct position
            int j = i-1;
            while(j>=0 && arr[j]>elem){
                arr[j+1] = arr[j]; 
                j--;
            }
            // we have correct position now
            j++;
            arr[j] = elem;
            
        }
    }
```
### merge sort
```
class Solution {

    void mergeSort(int arr[], int l, int r) {
        // code here
        if(l>=r){ // one elment is already sorted
            return;
        }
        int mid  = (l+r)/2;
        mergeSort(arr, l , mid);
        mergeSort(arr, mid+1 , r);
        merge(arr,l , mid ,r);
    }
    void merge(int arr[] , int start , int mid, int end){
        int[] temp = new int[end - start + 1]; // temporary array
        int pointer1 = start;
        int pointer2 = mid+1;
        int index = 0;
        while(pointer1<=mid && pointer2 <=end){
             if (arr[pointer1] <= arr[pointer2]) {
                temp[index++] = arr[pointer1++];
            } else {
                temp[index++] = arr[pointer2++];
            }
        }
        while(pointer1<=mid){
            temp[index++] = arr[pointer1++];
        }
        while(pointer2<=end){
            temp[index++] = arr[pointer2++];
        }
         // copy merged temp back into arr[start..end]
        for (int i = 0; i < temp.length; i++) {
            arr[start + i] = temp[i];
        }
    }
}

```
## m2
```
```
