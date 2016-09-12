#coding=utf-8
import urllib2, cookielib

URL = 'http://www.baidu.com'

#直接请求
response = urllib2.urlopen('http://www.baidu.com')

#获取状态码，如果是200,则表示获取成功
print response.getcode()

#读取内容
cont = response.read()

#print cont

#创建Requst对象
request = urllib2.Request(URL)

#添加数据
#request.add_data('a', '1')

#添加http header
request.add_header('User-Agent', 'Mozilla/5.0')

response2 = urllib2.urlopen(request)

#print response2.read()

#创建cookie容器
cj = cookielib.CookieJar()

#创建一个opener
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

#给urllib2 安装opener
urllib2.install_opener(opener)

#使用带有cookie 的urllib2 访问网页
response3 = urllib2.urlopen(URL)

print response3.read()

##
