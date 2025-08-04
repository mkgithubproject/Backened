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
## m-2 using hashing and sliding window
```
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        /*
        cbaebabacd, pahle c se subtring nikalnege , jaise hi p ke size se badi hoti phir hum 
        next char yani b se start krenge,
        */
        Map<Character, Integer> pMap = new HashMap<>();
        Map<Character, Integer> wMap = new HashMap<>();
        List<Integer> res = new ArrayList();
        for (int i = 0; i < p.length(); i++) {
            pMap.put(p.charAt(i), pMap.getOrDefault(p.charAt(i), 0) + 1);
        }
        int left = 0;
        int right = 0;
        int windowSize = p.length();
        while (right < s.length()) {
            // add the current ele to  wmap
            char ch = s.charAt(right);
            wMap.put(ch, wMap.getOrDefault(ch, 0) + 1);
            // right is been greter than windowsize meas 
            if (right - left + 1 > windowSize) {
                char leftChar = s.charAt(left);
                wMap.put(leftChar, wMap.get(leftChar) - 1);
                if (wMap.get(leftChar) == 0) {
                    wMap.remove(leftChar);
                }
                left++;
            }
            // here why we chgecking it a last first shrinking window( if i check first then -> c,b,a, add to resullt , now add e
            // c,b,a,e , >4 baeb didi not check for bae so we will loos some results.
            if (right - left + 1 == windowSize) {
                // cehck both are same map
                if (wMap.equals(pMap)) {
                    res.add(left);
                }
            }
            right++;
        }
        return res;

    }
}
```

### 3 Minimum Window Substring (done in patterns question)

### 4  Longest Repeating Character Replacement
```
import java.util.*;

class Solution {
    public int characterReplacement(String s, int k) {
        Map<Character, Integer> freqMap = new HashMap<>();
        int left = 0;
        int maxFreq = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            freqMap.put(ch, freqMap.getOrDefault(ch, 0) + 1);

            // Update the maxFreq of any single character in the window
            maxFreq = Math.max(maxFreq, freqMap.get(ch));

            // If we need to replace more than k characters, shrink window
            if ((right - left + 1) - maxFreq > k) {
                char leftChar = s.charAt(left);
                freqMap.put(leftChar, freqMap.get(leftChar) - 1);
                if (freqMap.get(leftChar) == 0) {
                    freqMap.remove(leftChar);
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}

```

### Group Anagrams
```
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars); // sort the characters
            String key = new String(chars); // use sorted string as key

            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }

            map.get(key).add(str);
        }

        return new ArrayList<>(map.values());
    }
}

```

### Roman to Integer
```
class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1);
        map.put('V', 5);
        map.put('X', 10);
        map.put('L', 50);
        map.put('C', 100);
        map.put('D', 500);
        map.put('M', 1000);

        int total = 0;

        for (int i = 0; i < s.length(); i++) {
            int curr = map.get(s.charAt(i));

            if (i < s.length() - 1 && curr < map.get(s.charAt(i + 1))) {
                total -= curr; // subtract if smaller than the next character
            } else {
                total += curr;
            }
        }

        return total;
    }
}

```
