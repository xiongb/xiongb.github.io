---
title: leetcode 1
date: 2020-05-01 22:31:07
tags: "leetcode"
---
### 两数之和
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