# -*- coding: utf-8 -*-
# @Time    : 2022/2/28 15:14
# @Author  : Haoyu Wang
# @Email   : haoyu.wang@students.plymouth.ac.uk
# @File    : data.py
# @Software: PyCharm


import pymysql
import json
from flask import Blueprint
import pandas as pd
from flask import jsonify

data_bp = Blueprint('data', __name__)
#try:
df = pd.read_csv(f'E:/新建文件夹/Epidemic/fc/get_data/europe.csv')
# except:
#     df = pd.read_csv('../get_data/europe_1.csv')


@data_bp.route('/get_one', methods=['GET', 'POST'])
def get_one():
    country = df['Country_order'].values
    total = df['Total_cases'].values
    app = []
    for key, value in zip(country, total):
        app.append({"name": key, "value": int(value)})

    return jsonify({"data": app})


@data_bp.route('/get_two', methods=['GET', 'POST'])
def get_two():
    result = df[['Country_order', 'New_cases', 'New_Deaths', 'New_Recovered']]
    result = result.fillna(0)
    Country_order = [i for i in result['Country_order'].values]
    New_cases = [int(i) for i in result['New_cases'].values]
    New_Deaths = [int(i) for i in result['New_Deaths'].values]
    New_Recovered = [int(i) for i in result['New_Recovered'].values]

    info_list = [('name', Country_order), ('New_cases', New_cases), ('New_Deaths', New_Deaths),
                 ('New_Recovered', New_Recovered)]
    info_list = {key: value for key, value in info_list}

    return json.dumps(info_list)


@data_bp.route('/get_three', methods=['GET', 'POST'])
def get_three():
    re_df = df.fillna(0)
    re_df = re_df[re_df['Active_cases'] != 0]
    Total_cases = re_df[re_df['Total_cases'] == re_df['Total_cases'].max()]
    Total_Detaths = re_df[re_df['Total_Detaths'] == re_df['Total_Detaths'].max()]
    Total_Recovered = re_df[re_df['Total_Recovered'] == re_df['Total_Recovered'].max()]
    Active_cases = re_df[re_df['Active_cases'] == re_df['Active_cases'].max()]
    # 死亡最少 (Fewest deaths)
    name_1 = Total_cases['Country_order'].values[0]
    # 恢复最多 (Most recovered)
    name_2 = Total_Detaths['Country_order'].values[0]
    # 确诊最多 (Most diagnosed)
    name_3 = Total_Recovered['Country_order'].values[0]
    # 感染最多 (Most infected)
    name_4 = Active_cases['Country_order'].values[0]

    data_1 = Total_cases['Total_cases'].values[0]
    data_2 = Total_Detaths['New_Deaths'].values[0]
    data_3 = Total_Recovered['Total_Recovered'].values[0]
    data_4 = Active_cases['Active_cases'].values[0]
    app_name = [name_1, name_2, name_3, name_4]
    app_data_1 = [int(data_1), int(data_2), int(data_3), int(data_4)]

    print(app_name)
    print(app_data_1)

    infos_list = [('name', app_name), ('data1', app_data_1)]
    info_list = {key: value for key, value in infos_list}

    return json.dumps(info_list)


@data_bp.route('/get_fore', methods=['GET', 'POST'])
def get_fore():
    result = df.sort_values(by=['Serious_Critical', 'Country_order'], ascending=False)[:5][['Country_order', 'Serious_Critical']]

    Country_order = list(result['Country_order'].values)
    Total_cases = [int(i) for i in result['Serious_Critical'].values]
    info_list = [('name', Country_order), ('Serious_Critical', Total_cases)]

    data_app = []
    for k, v in zip(Country_order, Total_cases):
        data_app.append({'value': int(v), 'name': k})

    info_list = {key: value for key, value in info_list}

    info_list['data'] = data_app
    print(info_list)
    return json.dumps(info_list)


@data_bp.route('/get_fire', methods=['GET', 'POST'])
def get_fire():
    result = df.sort_values(by=['Total_Detaths', 'Country_order'], ascending=False)[:3][
        ['Country_order', 'Total_Detaths']]

    Country_order = list(result['Country_order'].values)
    Total_cases = [int(i) for i in result['Total_Detaths'].values]
    info_list = [('name', Country_order), ('Total_Detaths', Total_cases)]

    data_app = []
    for k, v in zip(Country_order, Total_cases):
        data_app.append({'value': int(v), 'name': k})

    info_list = {key: value for key, value in info_list}

    info_list['data'] = data_app
    print(info_list)
    return json.dumps(info_list)


@data_bp.route('/get_six', methods=['GET', 'POST'])
def get_six():
    result = df.sort_values(by=['Total_Recovered', 'Country_order'], ascending=False)[:3][
        ['Country_order', 'Total_Recovered']]

    Country_order = list(result['Country_order'].values)
    Total_cases = [int(i) for i in result['Total_Recovered'].values]
    info_list = [('name', Country_order), ('Total_Recovered', Total_cases)]

    data_app = []
    for k, v in zip(Country_order, Total_cases):
        data_app.append({'value': int(v), 'name': k})

    info_list = {key: value for key, value in info_list}

    info_list['data'] = data_app
    print(info_list)
    return json.dumps(info_list)

# 恢复前五
@data_bp.route('/get_seven', methods=['GET', 'POST'])
def get_seven():
    result = df.sort_values(by=['New_Recovered', 'Country_order'], ascending=False)[:5][
        ['Country_order', 'New_Recovered']]

    Country_order = list(result['Country_order'].values)
    Total_cases = [int(i) for i in result['New_Recovered'].values]
    info_list = [('name', Country_order), ('New_Recovered', Total_cases)]

    data_app = []
    for k, v in zip(Country_order, Total_cases):
        data_app.append({'value': int(v), 'name': k})

    info_list = {key: value for key, value in info_list}

    print(info_list)
    return json.dumps(info_list)

@data_bp.route('/get_eight', methods=['GET', 'POST'])
def get_eight():
    result = df.sort_values(by=['New_cases', 'Country_order'], ascending=False)[:5][
        ['Country_order', 'New_cases']]

    Country_order = list(result['Country_order'].values)
    Total_cases = [int(i) for i in result['New_cases'].values]
    info_list = [('name', Country_order), ('New_cases', Total_cases)]

    data_app = []
    for k, v in zip(Country_order, Total_cases):
        data_app.append({'value': int(v), 'name': k})

    info_list = {key: value for key, value in info_list}

    print(info_list)
    return json.dumps(info_list)

@data_bp.route('/get_nine', methods=['GET', 'POST'])
def get_nine():
    result = df.sort_values(by=['Serious_Critical', 'Country_order'], ascending=False)[:5][
        ['Country_order', 'Serious_Critical']]

    Country_order = list(result['Country_order'].values)
    Total_cases = [int(i) for i in result['Serious_Critical'].values]
    info_list = [('name', Country_order), ('Serious_Critical', Total_cases)]

    data_app = []
    for k, v in zip(Country_order, Total_cases):
        data_app.append({'value': int(v), 'name': k})

    info_list = {key: value for key, value in info_list}

    print(info_list)
    return json.dumps(info_list)


class Data:
    def __init__(self):
        self.db = pymysql.connect(host='localhost', user='root', password='sy_root', port=3306, db='goldshovel')
        self.cur = self.db.cursor()

    def close(self):
        self.cur.close()
        self.db.close()

    def query(self, sql):
        self.cur.execute(sql)
        res = self.cur.fetchall()
        # self.close()
        return res


if __name__ == '__main__':
    get_seven()
