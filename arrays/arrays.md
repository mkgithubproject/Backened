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


### 2. dfghcgvhn
      
