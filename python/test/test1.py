import math
import random

print (random.random())
print (random.choice([1,2,3,4,5]))

print (math.pi)
print (math.sqrt(9))
print (3.1415/2)

S = 'python'
print (len(S))
print (S[len(S)-1])
print (S[1:5])
print (S[:])
print (S + 'abd')
print (S * 8)

S = 'z' + S[1:]
S = S * 8
print (S)
print (S.find('y'))
print (S.replace('y', 'X'))

line = 'aaa,bbb,ccccc,dd\n'
A = line.split(',')
B = line.upper()
print (A)
print (B)
print (line.rstrip())
print ('aaa'.isalpha())