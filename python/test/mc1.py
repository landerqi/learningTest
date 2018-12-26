
import random
import matplotlib.pyplot as plt
import numpy as np
print(random.uniform(0, 1))
print(random.random())

A = []
B = []
cishu = 100
for i in range(cishu):
	X = random.random()
	A.append(X)
	Y = random.random()
	B.append(Y)

def M(zongshu):
    jishu = 0.0
    for j in range(zongshu):
        x = random.random()
        y = random.random()
        if ( x**2 + y**2 ) < 1:
            jishu += 1
    return (jishu/zongshu * 4.0)

fig=plt.figure()
p1=fig.add_subplot(121)
p1.axis([0,1,0,1])
p1.scatter(A, B)

x = y = np.arange(-1, 1, 0.001)
x, y = np.meshgrid(x,y)
p1.contour(x, y, x**2 + y**2, [1])

p2=fig.add_subplot(122)
C = [ (j+1) for j in range(1000)]
D = [ M((j+1)) for j in range(1000)]
p2.plot(C, D)
plt.show()