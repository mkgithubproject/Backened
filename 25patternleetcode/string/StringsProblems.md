## 4. Longest Substring Without Repeating Characters
 ### [Naive Approach] Substrings Starting From Every Index - O(26*n) Time and O(1) Space
 the idea is to find length of longest substring with distinct characters starting from every index and maximum of all such lengths will be our answer. 
 To find the length of the longest substring with distinct characters starting from an index, we create a new visited array of size = 26 to keep  track of included characters in the substring. vis[0] checks for 'a', vis[1] checks for 'b', vis[2] checks for 'c' and so on.\

 
 Input: s = "abcabcbb"( a liya then b liya , c liya ab phir se a a gaya idhr se skip kro isse jada long sequnce sequnce ni banegi a character se ab b se start krnege)
```
// Java program to find the length of the longest
// substring without repeating characters

import java.util.*;

class GfG {

    static int longestUniqueSubstr(String s)
    {
        int n = s.length();
        int res = 0;

        for (int i = 0; i < n; i++) {

            // Initializing all characters as not visited
            boolean[] vis = new boolean[26];

            for (int j = i; j < n; j++) {

                // If current character is visited
                // Break the loop
                if (vis[s.charAt(j) - 'a'] == true)
                    break;

                // Else update the result if this window is
                // larger, and mark current character as
                // visited.
                else {
                    res = Math.max(res, j - i + 1);
                    vis[s.charAt(j) - 'a'] = true;
                }
            }
        }
        return res;
    }

    public static void main(String[] args)
    {
        String s = "geeksforgeeks";
        System.out.println(longestUniqueSubstr(s));
    }


}
######################### using hash same approach ####################
import java.util.*;
class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashSet<Character>hs = new HashSet<>();
        int max=0;
        int start=0;
        int end=0;
       // acquire release silidning window ,(writing while code first write conditon for releasing) 
        while(start<s.length()){
            if(hs.contains(s.charAt(start))){
                // releasing
                hs.remove(s.charAt(end));
                end++;
            }else{
                // acquireing
                hs.add(s.charAt(start));
                max=Math.max(max,start-end+1);
                start++;
            }
        }
        return max;
        
    }
}

or
class Solution {
    public int lengthOfLongestSubstring(String s) {
         int[] arr = new int[128];
        int n = s.length();
        int len = 0;
        for(int i = 0, j = 0; j < n; j++){
            int c = s.charAt(j);
            // acquire
            arr[c]++;
            // release
            if(arr[c] > 1){
                while(arr[c] > 1){
                    arr[s.charAt(i)]--;
                    i++;
                }
            }
            len = Math.max(len, j - i + 1);
        }
        return len;
    }
}
```
### [Expected Approach 1] Using Sliding Window - O(n) Time and O(1) Space (aquire and release technique)
Input: s = "abcbadbd" (window me a,b,c then now a again b aya matlab a se ab sequnce ni ban sakti ab start window pahle mila h usse age se krenege kyonki a ke next character se jo bhi sequence hongi like bc vo pahle wali window se chhoti hi hongi hamesha , hum map me current window rakh rahe h
```
class Solution {
    public int lengthOfLongestSubstring(String s) {
         int[] arr = new int[128]; // aslo can take hashmap or hashset
        int n = s.length();
        int len = 0;
        for(int i = 0, j = 0; j < n; j++){
            int c = s.charAt(j);
            arr[c]++;
            if(arr[c] > 1){
                while(arr[c] > 1){
                    arr[s.charAt(i)]--;
                    i++;
                }
            }
            len = Math.max(len, j - i + 1);
        }
        return len;
    }
}

```

## 5. Minimum Window Substring
### [Naive Approach] By Generating all the Substrings - O(n^3) time and O(n) space:
```
import java.util.Arrays;

public class GFG {

    public static boolean containsAllCharacters(String s,
                                                String p)
    {
        int[] count = new int[256];
        Arrays.fill(count, 0);

        // Count the frequency of each character in the
        // pattern
        for (char ch : p.toCharArray())
            count[ch]++;

        // For each character in the substring, decrement
        // its count
        for (char ch : s.toCharArray()) {
            if (count[ch] > 0)
                count[ch]--;
        }

        // If all counts in the count array are zero, the
        // substring contains all characters of the pattern
        for (int c : count) {
            if (c > 0)
                return false;
        }

        return true;
    }

    // Function to find the smallest substring containing
    // all characters of the pattern
    public static String findSmallestSubstring(String s,
                                               String p)
    {
        int m = s.length();
        int n = p.length();
        String smallestSubstring = "";
        int minLen = Integer.MAX_VALUE;

        // Generate all substrings of the given string
        for (int i = 0; i < m; i++) {
            for (int j = i; j < m; j++) {
                String substr = s.substring(i, j + 1);

                // Check if the substring contains all
                // characters of the pattern
                if (containsAllCharacters(substr, p)) {
                    int currLen = substr.length();

                    // Update the smallestSubstring if the
                    // current substring is smaller
                    if (currLen < minLen) {
                        minLen = currLen;
                        smallestSubstring = substr;
                    }
                }
            }
        }

        return smallestSubstring;
    }

    public static void main(String[] args)
    {
        String s = "timetopractice";
        String p = "toc";

        String result = findSmallestSubstring(s, p);

        if (!result.isEmpty()) {
            System.out.println(result);
        }
        else {
            System.out.println(-1);
        }
    }
}
```
## [Expected Approach] Using Window Sliding - O(n) Time and O(1) Space: (acquire and release):
### s = "ADOBECODEBANC", t = "ABC" , first char se us char tak jayenge jab tak t ke legthg cover ni ho jaye , jaise hi ho gai ab release krenege 
### next char se dekhenege kya pata chhoti substring mil jaye jab tak release krenege jab tak t ke chars na hile min update krte rahenge , agar hil gayi phir se acquire kro
```
import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        // Edge case: if s is shorter than t, it's impossible
        if (s == null || t == null || s.length() < t.length()) return "";

        // Map to store character frequencies of string t
        Map<Character, Integer> tMap = new HashMap<>();
        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            tMap.put(c, tMap.getOrDefault(c, 0) + 1); // count each character
        }

        // Map to track characters in the current sliding window of s
        Map<Character, Integer> window = new HashMap<>();

        // Counters to track how many required characters are matched
        int have = 0;                 // how many characters from t are satisfied in current window
        int need = tMap.size();       // total unique characters needed from t

        // Pointers for sliding window and tracking minimum window
        int left = 0;
        int minLen = Integer.MAX_VALUE;
        int start = 0;                // start index of the best (smallest) window found

        // Expand the window using right pointer
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right); // current character

            // Add character to window map, acquire window
            window.put(c, window.getOrDefault(c, 0) + 1);

            // If this character is in t and its count matches, increment 'have'
            if (tMap.containsKey(c) && window.get(c) == tMap.get(c).intValue()) {
                have++;
            }

            // When all required characters are matched, try to shrink the window, release window
            while (have == need) {
                // Update minimum window if smaller one is found
                if ((right - left + 1) < minLen) {
                    minLen = right - left + 1;
                    start = left;
                }

                // Try to shrink window from the left
                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);

                // If this character was needed and now below required count, reduce 'have'
                if (tMap.containsKey(leftChar) && window.get(leftChar).intValue() < tMap.get(leftChar).intValue()) {
                    have--;
                }

                // Move left pointer forward
                left++;
            }
        }

        // If no window found, return ""
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}

```


