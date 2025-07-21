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
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if(head == null || head.next == null){
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while(slow!=null && fast!=null && fast.next!=null){
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast){
                return true;
            }
        }
        return false;

        
    }
}
```

## 16. Merge Two Sorted Lists
### approach1 , take a arraylist and put all the linkedlist element into it and sort arrayloist then again create a new linked list 
### recursive2 , merge two sorted linked list 
### using pointer3 , whichever is smaller create a newNode and push at last of new node
### Using Iterative Merge - O(n+m) Time and O(1) Space
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
    public ListNode mergeTwoLists(ListNode head1, ListNode head2) {
         ListNode t1=head1;
         ListNode t2=head2;
         ListNode head;
         ListNode tail;
        if(head1==null){
            return head2;
        }
        if(head2==null){
            return head1;
        }
        if(t1.val<t2.val){
            head=t1;
            tail=t1;
            t1=t1.next;
        }
        else{
            head=t2;
            tail=t2;
            t2=t2.next;
        }
        while(t1!=null && t2!=null){
            if(t1.val<t2.val){
                tail.next=t1;
                tail=tail.next;
                t1=t1.next;
            }
            else{
                tail.next=t2;
                tail=tail.next;
                t2=t2.next;
            }
        }
        if(t1!=null){
            tail.next=t1;
        }else{
            tail.next=t2;
        }
        return head;
        
    }
}
```



