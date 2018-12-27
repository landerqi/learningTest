import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# 生成积累函数坐标
def ecdf(data):
    return np.sort(data), np.arange(1, len(data)+1) / len(data)

sampleNo = 400
mu = 14
sigma = 2
np.random.seed(0)
s = np.random.normal(mu, sigma, sampleNo)

fig, ax = plt.subplots()
ax.hist(s, 32, density=True)
ax.set(xlabel='time (s)', ylabel='voltage (mV)',
       title='About as simple as it gets, folks')
ax.grid()
plt.show()

#normfun正态分布函数，mu: 均值，sigma:标准差，pdf:概率密度函数，np.exp():概率密度函数公式
def normfun(x,mu, sigma):
    pdf = np.exp(-((x - mu)**2) / (2* sigma**2)) / (sigma * np.sqrt(2*np.pi))
    return pdf

# x的范围为60-150，以1为单位,需x根据范围调试
x = np.arange(7, 35, 0.01)

# x数对应的概率密度
y = normfun(x, 14, 2)

plt.plot(x,y, color='g',linewidth = 1)
m, n = ecdf(s)
print(m)
print(n)
plt.plot(m, n)
plt.hist(s, 32, density=True)

plt.grid()
plt.show()



# Draw 100000 samples from Normal distribution with stds of interest: samples_std1, samples_std3, samples_std10
samples_std1=np.random.normal(20,1,size=100000)
samples_std3=np.random.normal(20,3,size=100000)
samples_std10=np.random.normal(20,10,size=100000)

# Make histograms
plt.hist(samples_std1,bins=100,density=True,histtype='step')
plt.hist(samples_std3,bins=100,density=True,histtype='step')
plt.hist(samples_std10,bins=100,density=True,histtype='step')



# Make a legend, set limits and show plot
_ = plt.legend(('std = 1', 'std = 3', 'std = 10'))
plt.ylim(-0.01, 0.42)

# Generate CDFs
x_std1,y_std1=ecdf(samples_std1)
x_std3,y_std3=ecdf(samples_std3)
x_std10,y_std10=ecdf(samples_std10)

# Plot CDFs
plt.plot(x_std1,y_std1,marker='.',linestyle='none')
plt.plot(x_std3,y_std3,marker='.',linestyle='none')
plt.plot(x_std10,y_std10,marker='.',linestyle='none')

# Make 2% margin
plt.margins(0.02)

# Make a legend and show the plot
_ = plt.legend(('std = 1', 'std = 3', 'std = 10'), loc='lower right')


plt.show()