# -*- coding:utf-8 -*-

import requests
import json

class nCovData():

    def __init__(self, url='https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'):

        # 获取原始全国疫情数据的网址
        self.start_url = url

    def get_html_text(self):
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:66.0) Gecko/20100101 Firefox/66.0'}
        res = requests.get(self.start_url, headers=headers, timeout=30)
        res.encoding = 'utf-8'
        # 将获取到的json格式的字符串类型数据转换为python支持的字典类型数据
        data = json.loads(res.text)
        # 所有的疫情数据,data['data']数据还是str的json格式需要转换为字典格式，包括：中国累积数据、各国数据(中国里面包含各省及地级市详细数据)、中国每日累积数据(1月13日开始)
        all_data = json.loads(data['data'])
        print(all_data)
        return all_data

if __name__ == '__main__':
    ncovdata = nCovData()
    ncovdata.get_html_text()