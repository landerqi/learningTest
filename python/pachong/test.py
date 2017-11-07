#coding=utf-8
import urllib.request
import http.cookiejar

URL = 'http://www.baidu.com'

#直接请求
response = urllib.request.urlopen('http://www.baidu.com')

#获取状态码，如果是200,则表示获取成功
print (response.getcode())

#读取内容
cont = response.read()

#print cont

#创建Requst对象
request = urllib.request.Request(URL)

#添加数据
#request.add_data('a', '1')

#添加http header
request.add_header('User-Agent', 'Mozilla/5.0')

response2 = urllib.request.urlopen(request)

#print response2.read()

#创建cookie容器
cj = http.cookiejar.CookieJar()

#创建一个opener
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

#给urllib.request 安装opener
urllib.request.install_opener(opener)

#使用带有cookie 的urllib.request 访问网页
response3 = urllib.request.urlopen(URL)

print (cj)
print (response3.read())

##
