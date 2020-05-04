---
title: leetcode 1
date: 2020-05-01 22:31:07
tags: "leetcode"
---
### 1.两数之和
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

### 示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

### js版本

````
    var twoSum = function(nums,target){
        var temp,idx;
        var map = {};
        for(let i =0 ;i < nums.length;i++){
            temp = target - nums[i];
            if(map[temp] !== undefined){
                return [i,map[temp]];
            }else{
                map[num[i]] = i;
            }
        }
    }
 ````
### golang版本
````
    func twoSum(nums[] int,target int) []int{
        maps :=make(map[int] int)
        result := make([] int,2)
        for index,num :=range nums{
            _,isTrue :=maps[target - num]
            if(isTrue){
                result[0] = maps[target-num]
                result[1] = index
            }else{
                maps[num] = index
            }
        }
        return result
    }
````

### 2. 两数相加

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

### js版本
````
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var addTwoNumbers = function(l1, l2) {
    let p = l1,q = l2;
    let curr,head,temp = 0;
    while (p || q){
        let v1 = p ? p.val :0;
        let v2 = q ? q.val :0;
        let sum = v1 + v2 + temp;
        temp = parseInt(sum/10);
        if (!curr){
            curr = new ListNode(sum%10);
            head = curr;
        }else {
            curr.next = new ListNode(sum%10);
            curr = curr.next;
        }
        if (p) p = p.next;
        if (q) q = q.next;
    }
    if (temp > 0){
        curr.next = new ListNode(temp);
    }
    return head;
}
````

### 3. 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
````
var lengthOfLongestSubstring = function (s) {
    if (s === "") return 0;
    let map = {};
    let max = 1,j =0;
    for (let i =0;i < s.length;i++){
        if (map[s[i]]){
            j = Math.max(j,map[s[i]]);  // 上一次出现的位置
        }
        max = Math.max(max,i-j+1);   // 当前出现位置i 减去上次出现位置j 下标从1开始 +1；
        map[s[i]] = i + 1;  // 重置该字符出现的位置为 i+1;
    }
    return max
}
````