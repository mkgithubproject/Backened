### 1 Reverse String
Input: s = ["h","e","l","l","o"]\
Output: ["o","l","l","e","h"]\
recursion
```
class Solution {
    public void reverseString(char[] s) {
        reverseString(s,0,s.length-1);
        
    }
     public void reverseString(char[] s,int start,int end) {
        if(start>=end){
            return;
        }
        reverseString(s,start+1,end-1);
         char ch=s[end];
         s[end]=s[start];
         s[start]=ch;
         
        
    }
}
```
```
class Solution {
    public void reverseString(char[] s) {
        int start =0;
        int end = s.length-1;
        while(start< end){
             char ch = s[end];
            s[end] = s[start];
            s[start] = ch;
            start++;
            end--;
        }
    }
}
```
### 2 Find All Anagrams in a String
1. Brute Force Approach (Generate All Substrings)\
📦 Time Complexity:\
Sorting a string of length k takes O(k log k)\
There are n - k + 1 substrings\
```
public List<Integer> findAnagramsBrute(String s, String p) {
    List<Integer> result = new ArrayList<>();
    int n = s.length(), k = p.length();
    char[] pArr = p.toCharArray();
    Arrays.sort(pArr);
    String sortedP = new String(pArr);

    for (int i = 0; i <= n - k; i++) {
        String sub = s.substring(i, i + k);
        char[] subArr = sub.toCharArray();
        Arrays.sort(subArr);
        if (sortedP.equals(new String(subArr))) {
            result.add(i);
        }
    }
    return result;
}

```
