# 二分法查找
import math

def binarySearch(list, item):
    low = 0
    high = len(list) - 1
    while low <= high:
        mid = math.floor((low + high) / 2)
        print('--------')
        print('mid', mid)
        print('high', high)
        print('low', low)
        print('--------')
        guess = list[mid]
        print('guess', guess)
        print('===================')
        if guess == item:
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None


arr = [1, 2, 3, 4, 5, 7, 98, 99, 100, 1, 3, 7]
arr.sort()
print(arr)
print('result index', binarySearch(arr, 1000))

