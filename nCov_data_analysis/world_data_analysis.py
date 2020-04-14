# -*- coding:utf-8 -*-

# from nCov_data_analysis import a_get_html
import a_get_html
import json

class WorldData():
    def __init__(self):
        self.ncovdata = a_get_html.nCovData('https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign')
        self.all_data = self.ncovdata.get_html_text()

    def world_total_data(self):
        '''获取世界各国累积数据'''
        # areaTree键对应的值就是各个国家的数据
        foreignList = self.all_data['foreignList']
        country_name = list()
        country_total_confirm = list()
        country_total_suspect = list()
        country_total_dead = list()
        country_total_heal = list()
        for country in foreignList:
            country_name.append(country['name'])
            country_total_confirm.append(country['confirm'])
            country_total_suspect.append(country['suspect'])
            country_total_dead.append(country['dead'])
            country_total_heal.append(country['heal'])
        print(len(country_name))
        print(country_total_confirm)
        # 将各国名称和确诊人数对应打包为字典，用于ECharts地图可视化
        province_total_confirm_dict = {'name': country_name, 'value': country_total_confirm}
        print(len(province_total_confirm_dict))
        with open('./country_total.json', 'w', encoding='utf-8') as f:
            json.dump(province_total_confirm_dict, f, ensure_ascii=False)

    def world_today_data(self):
        '''获取各国今日数据'''
        areaTree = self.all_data['areaTree']
        country_name = list()
        country_today_confirm = list()
        country_today_suspect = list()
        country_today_dead = list()
        country_today_heal = list()
        for country in areaTree:
            country_name.append(country['name'])
            country_today_confirm.append(country['today']['confirm'])
            country_today_suspect.append(country['today']['suspect'])
            country_today_dead.append(country['total']['dead'])
            country_today_heal.append(country['total']['heal'])
        print(country_today_confirm)

    def main(self):
        self.world_total_data()
        # self.world_today_data()

if __name__ == '__main__':
    world_data= WorldData()
    world_data.main()


