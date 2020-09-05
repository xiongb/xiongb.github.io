//两数之和
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

// 2. 两数相加
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
// 最长子串   abca

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

// region  最长回文数

function longestPalindrome(s) {
    if ((s === null || s.length < 1)) return "";
    let start = 0,end = 0;
    for (let i =0;i < s.length;i++){
        let l1 = expandAroundCenter(s,i,i);
        let l2 = expandAroundCenter(s,i,i+1);
        let len = Math.max(l1,l2);
        if (len > end- start){
            start = i - parseInt((len-1)/2);
            end = i + parseInt(len/2)
        }
    } 
    return s.substring(start,end+1)
}

function expandAroundCenter(s,left,right) {
    let l  = left,r = right;
    while (l >=0 && r< s.length && s[l] === s[r]){
        l --;
        r ++;
    }
    return r - l -1;
}

console.log(longestPalindrome("fdafdfda"))

//endregion