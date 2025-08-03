### Climbing Stairs
## dp three rule, 1, storage and meaning 2, direction(need to start from left to right or right to left), travel and solve
```
class Solution {
    public int climbStairs(int n) {
        int dp[] = new int[n+1];
        dp[0] =1;
        for(int i =1; i<= n ;i++){
            if(i==1){
                dp[i] = dp[i-1];
            }else{
              dp[i] = dp[i-1]+dp[i-2];
            }
        }
        return dp[n];
    }
}

```
### 198. House Robber
You are a professional robber planning to rob houses along a street. \
Each house has a certain amount of money stashed, \
the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected \
and it will automatically contact the police if two adjacent houses were broken into on the same night.


Given an integer array nums representing the amount of money of each house, return the maximum amount of \
money you can rob tonight without alerting the police.\

 

Example 1:

Input: nums = [1,2,3,1]\
Output: 4\
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).\
Total amount you can rob = 1 + 3 = 4.
## kya lag raha h subsequenc eproblem lag ri h, pick it not pick it(but constraint) , if pick it 0th then give me\
## the solution of n-2 or not pick it then solution of n-1
```
class Solution {
    public int rob(int[] nums) {
        
        return helperRob(nums, nums.length-1);

    }

    public int helperRob(int[] nums , int index) {
        if(index<0){
            return 0;
        }
        int res1 = nums[index] + helperRob(nums, index-2);
        int res2 = 0 + helperRob(nums, index-1);
        return Math.max(res1,res2);


    }
    
}
```
```
using memoization
class Solution {
    public int rob(int[] nums) {
         Map<Integer, Integer> memo = new HashMap<>();
        return helperRob(nums, nums.length - 1 , memo);

    }

    public int helperRob(int[] nums, int index ,Map<Integer, Integer> memo) {
        if (index < 0) {
            return 0;
        }
        if (memo.containsKey(index)) {
            return memo.get(index);
        }
        int res1 = nums[index] + helperRob(nums, index - 2 , memo);
        int res2 = 0 + helperRob(nums, index - 1 , memo);
        memo.put(index,Math.max(res1, res2));
        return Math.max(res1, res2);

    }

}
```
### Longest Palindromic Substring
Example 1:\
Input: s = "babad"\
Output: "bab"\
Explanation: "aba" is also a valid answer.\
 ## recursive approach
i will check first and last char of babad if it is return else check left part and right part means \
recursive give me from abad or baba because length is same 
```


class Solution {
    public String longestPalindrome(String s) {
        return longestPalindrome(s,0,s.length()-1);
    }
    // Helper function to check if a substring is a palindrome
    public static boolean isPalindrome(String s, int left, int right) {
        if (left >= right)
            return true;
        if (s.charAt(left) != s.charAt(right))
            return false;
        return isPalindrome(s, left + 1, right - 1);
    }

    // Recursive function to find the longest palindromic substring
    public static String longestPalindrome(String s, int start, int end) {
        if (start > end)
            return "";
        if (isPalindrome(s, start, end)) {
            return s.substring(start, end + 1);
        }

        // Recur for two substrings: (start+1, end) and (start, end-1)
        String left = longestPalindrome(s, start + 1, end);
        String right = longestPalindrome(s, start, end - 1);

        return left.length() > right.length() ? left : right;
    }
}

```
## dp using 2-d matrix
```
class Solution {
    public String longestPalindrome(String s) {
        boolean[][] dp = new boolean[s.length()][s.length()];
        int l = 0;
        String res = "";
        for (int g = 0; g < s.length(); g++) {
                // diagonal starts from 0, gap, and hota h last couloum pe
                for (int i = 0, j = g; j < s.length(); i++, j++) {
                    if (g == 0) {
                        dp[i][j] = true;
                    } else if (g == 1) {
                        if (s.charAt(i) == s.charAt(j)) {
                            dp[i][j] = true;
                        } else {
                            dp[i][j] = false;
                        }
                    } else {
                        if (s.charAt(i) == s.charAt(j) && dp[i +1][j - 1] == true) {
                            dp[i][j] = true;
                        }else{
                            dp[i][j] = false;
                        }
                    }

                    if(dp[i][j]){
                        l = g+1;
                        res = s.substring(i,j+1);
                    }
                    
                }
        }
        return res;
    }
}```

