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

