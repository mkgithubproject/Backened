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
}```

