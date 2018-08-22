def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return smallest_index

arr = [20,3,1,323,0.1]
s = findSmallest(arr)
print(arr[s])
print(arr.pop(3))

def selectionSort(arr):
    newArr = []
    for i in range(len(arr)):
        smallest = findSmallest(arr)
        newArr.append(arr.pop(smallest))
        print(i)
    return newArr

print(selectionSort(arr))