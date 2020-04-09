---
title: 排序算法js版
date: 2020-04-08 19:27:41
tags: "js javascript 算法"
---
### 冒泡排序
````
const bubbleSort = (arr) => {
    if (arr.length <= 1) return
    for (let i = 0; i < arr.length; i++) {
        let hasChange = false
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                hasChange = true
            }
        }
        // 如果false 说明所有元素已经到位
        if (!hasChange) break
    }
    console.log(arr)
}
````

### 插入排序
````
const insertionSort = (arr) => {
    if (arr.length <= 1) return
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i]
        let j = i - 1
        // 若arr[i]前有大于arr[i]的值的化，向后移位，腾出空间，直到一个<=arr[i]的值
        for (j; j >= 0; j--) {
            if (arr[j] > temp) {
                arr[j + 1] = arr[j]
            } else {
                break
            }
        }
        arr[j + 1] = temp
    }
    console.log(arr)
}
````

### 选择排序
````
const selectionSort = (arr) => {
    if (arr.length <= 1) return
    // 需要注意这里的边界, 因为需要在内层进行 i+1后的循环，所以外层需要 数组长度-1
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j // 找到整个数组的最小值
            }
        }
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    console.log(arr)
}
````
### 快速排序 
````
const quickSort = (array,l,r) =>{
    if (l >= r)  return;
    let i =i,j = r, key = array[l];
    while (i < j){
        while (i < j && array[j] >= key){
            j --;
        } 
        if (i < j){
            array[i] = array[j];
            i++;
        } 
        while (i < j && array[i] <= key){
            i ++;
        } 
        if (i < j){
            array[j] = array[i];
            j --;
        } 
        array[i] = key;
        quickSort(array,l,i-1);
        quickSort(array,l+1,r);
    } 
}
````

### 归并排序  先把数组分成单个一组 然后再两两合并 
````
const mergeArr = (left, right) => {
    let temp = []
    let leftIndex = 0
    let rightIndex = 0
    // 判断2个数组中元素大小，依次插入数组
    while (left.length > leftIndex && right.length > rightIndex) {
        if (left[leftIndex] <= right[rightIndex]) {
            temp.push(left[leftIndex])
            leftIndex++
        } else {
            temp.push(right[rightIndex])
            rightIndex++
        }
    }
    // 合并 多余数组
    return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

const mergeSort = (arr) => {
    // 当任意数组分解到只有一个时返回。
    if (arr.length <= 1) return arr
    const middle = Math.floor(arr.length / 2) // 找到中间值
    const left = arr.slice(0, middle) // 分割数组
    const right = arr.slice(middle)
    // 递归 分解 合并
    return mergeArr(mergeSort(left), mergeSort(right))
}
````

