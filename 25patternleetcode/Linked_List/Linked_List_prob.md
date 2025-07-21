## 14. Reverse Linked List 
```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        if(head == null){
            return head;
        }
        // insert at the first
        ListNode newHead = null;
        while(head!= null){
            ListNode newNode  = new ListNode(head.val);
          // insert at first of newHead
          if(newHead == null){
            // single node 
            newHead = newNode;
          }else{
            newNode.next = newHead;
            newHead = newNode;
          }
          head = head.next;
        }
        return newHead;
    }
}
```
## 15. Linked List Cycle
### [Naive Approach] Using HashSet - O(n) Time and O(n) Space
### [Expected Approach] Using Floyd's Cycle-Finding Algorithm - O(n) Time and O(1) Space ,(slow and fast pointer)
```
```

