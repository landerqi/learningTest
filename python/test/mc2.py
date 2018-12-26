
import random
import time
n=1000000
k=0
startT1 = time.process_time()
for i in range(n):
    x=random.uniform(0,1)
    y=random.uniform(0,1)
    if y<x**2:
        k=k+1
entT1 = time.process_time()
print (float(k)/float(n))
print ('Time1:{0}'.format(entT1 - startT1))

startT2 = time.process_time()
repeatNum = 100000000
count = 0
for i in range(repeatNum) :
    x = random.random()
    y = random.random()
    if (x ** 2 + y ** 2) < 1 :
        count += 1
entT2 = time.process_time()
print(count * 4 / repeatNum) # 4 = 2 * 2, 那个正方形的面积
print ('Time2:{0}'.format(entT2 - startT2))