## 17. Valid Parentheses
### [Expected Approach 1] Using Stack - O(n) Time and O(n) Space
```
class Solution {
    public boolean isValid(String s) {
        Stack<String> stack = new Stack<>();

        for (String string : s.split("")) {
            switch (string) {
                case "{" -> {
                    stack.push("{");
                }
                case "(" -> {
                    stack.push("(");
                }
                case "[" -> {
                    stack.push("[");
                }
                case "}" -> {
                    if (stack.isEmpty() || !stack.pop().equals("{"))
                        return false;

                }
                case "]" -> {
                    if (stack.isEmpty() || !stack.pop().equals("["))
                        return false;

                }
                case ")" -> {
                    if (stack.isEmpty() || !stack.pop().equals("("))
                        return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
```
## Daily Temperatures
### brute force
```
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] result = new int[temperatures.length];
        for (int i = 0; i < temperatures.length; i++) {
            for (int j = i + 1; j < temperatures.length; j++) {
                if (temperatures[j] > temperatures[i]) {
                    result[i] = j - i;
                    break;
                }
            }
        }
        return result;

    }
}
```
### using stack ||  understanding monotonic stacks (especially monotonic decreasing and monotonic increasing) is key to solving a wide class of array problems efficiently.

🔁 Summary Heuristics (How You Know It’s a Stack Problem)
| Heuristic Question                                            | If Yes, Maybe Use Stack |
| ------------------------------------------------------------- | ----------------------- |
| Do I need to remember past values?                            | ✅                       |
| Do I want to resolve current value with previously seen ones? | ✅                       |
| Is there a “next greater/smaller” style pattern?              | ✅                       |
| Can I use brute-force nested loop, but it’s too slow?         | ✅ Stack helps           |
| Do I need something **last-in, first-out** (LIFO)?            | ✅ Stack is best         |
🔎 Dry Run (First Few Iterations)
Input: [73, 74, 75, 71, 69, 72, 76, 73]
Day 0: 73 → stack = [0]
Day 1: 74 > 73 → pop 0, answer[0] = 1 → stack = [1]
Day 2: 75 > 74 → pop 1, answer[1] = 1 → stack = [2]
Day 3: 71 < 75 → stack = [2, 3]
Day 4: 69 < 71 → stack = [2, 3, 4]
Day 5: 72 > 69 → pop 4, answer[4] = 172 > 71 → pop 3, answer[3] = 2 → stack = [2, 5]
Day 6: 76 > 72 → pop 5, answer[5] = 176 > 75 → pop 2, answer[2] = 4 → stack = [6]
Day 7: 73 < 76 → stack = [6, 7]
Final result: [1, 1, 4, 2, 1, 1, 0, 0]
```
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        Stack<Integer> st = new Stack<>();
        int[] ans  = new int[temperatures.length];
        for(int i =0 ; i<temperatures.length; i++){
            // While current temperature is higher than the temperature at index on top of the stack
            while(!st.isEmpty() && temperatures[i] > temperatures[st.peek()]){
                int prevIndex = st.pop();
                ans[prevIndex] = i - prevIndex; // Calculate how many days waited
            }
            st.push(i); // Push current index

        }
        return ans;
    }
}
```


