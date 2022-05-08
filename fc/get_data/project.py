#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
# @Time    : 2022/4/10 14:15 下午
# @Author  : Haoyu Wang
# @Email   : haoyu.wang@students.plymouth.ac.uk
# @File    : project.py
# @Software: PyCharm
import csv
import datetime
import os
import time
import pandas as pd
from lxml import etree
import requests
from apscheduler.schedulers.blocking import BlockingScheduler

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
    'cookie': 'mobile_detect=desktop; _ga=GA1.2.169831586.1649571216; _fssid=94521a61-4455-498b-8f8b-610576e76df5; __qca=P0-1419495249-1649571232987; _pbjs_userid_consent_data=3524755945110770; _pubcid=b7350038-185c-48e1-977d-d9b3d388d84f; _lr_env_src_ats=false; _cc_id=73cbee9de9116b25ac6aeabd9428e36e; cto_bundle=lz4CtF92Y1JiYVFvV2szTGc0OHBKcSUyRkYzOG9jZVAzN1VCenVEOUlnTSUyQmQlMkJUYlhNeXVic1E0Mmg3RCUyQnJ0RnFNSGRLWEtiQ1RTN1RWNU9WUFNtYzBRR21vNEpzM3ozOUVYZkRYczhTZVBvZGJOZSUyQmRqZlJScHhUckkwcER1ekdqZlhrQW5yQkJWRm9ieG1nNTRUeVNCQkdRRWhRJTNEJTNE; cto_bundle=lz4CtF92Y1JiYVFvV2szTGc0OHBKcSUyRkYzOG9jZVAzN1VCenVEOUlnTSUyQmQlMkJUYlhNeXVic1E0Mmg3RCUyQnJ0RnFNSGRLWEtiQ1RTN1RWNU9WUFNtYzBRR21vNEpzM3ozOUVYZkRYczhTZVBvZGJOZSUyQmRqZlJScHhUckkwcER1ekdqZlhrQW5yQkJWRm9ieG1nNTRUeVNCQkdRRWhRJTNEJTNE; cookieconsent_status=dismiss; cto_bidid=fyUukl85emdaZ2RWclp0ZmJsMWhzUThlTHZOUTlHRHVqbmFZSnpuR3EwNU95QWlWZGpVNERvN0M3WDRpU0tmWDVSbXRiSzQ0bG9sdEpqYURvYnJ3eDhWa09oc0xIczQyOUhQdUVtbzdrc0MwWThxeDJaTldyaHEyRlgwRGFyVXdBYUFIZw; cto_bundle=UoO6ol92Y1JiYVFvV2szTGc0OHBKcSUyRkYzOHNwV3lJaVhCUFZFUGElMkY4UDZzcXdGa1Jublc0aVpGZnR5YndLNUlOTiUyQnJZcmFyN3dJOTRiaHpVUnFsMVhVOFJESnJCWFZoWktqQ2pMYSUyQlFsdlg5WkE5cDN6eVN2MCUyRiUyRjV2VUdQQUxOUXN0OUJ6JTJGSU5PVXBYNEoydEtZYkluMUNBUSUzRCUzRA; cookie=%7B%22id%22%3A%2201G091Q8F1A6R9RV3V2W1KBG1N%22%2C%22ts%22%3A1650203370474%7D; _gid=GA1.2.1880962037.1650466640; _gat=1; _gat_gtag_UA_1438574_30=1; fsbotchecked=true; __atuvc=2%7C16; __atuvs=62601f5be646f88c000; _lr_geo_location=CN; __gads=ID=a34acd8718b75ba0:T=1650203342:S=ALNI_MZ2kZouh_fLlUofSPVXLm0Z2PWnEA; __gpi=UID=000004e341ecd3d7:T=1650203362:RT=1650466655:S=ALNI_MZTF3fKJgt1uCR1xpvbOwj01Q1Svg; _lr_retry_request=true; panoramaId_expiry=1650553061680'

}


def get_requests():
    # 发送请求
    # (Send request)
    html = requests.get('https://www.worldometers.info/coronavirus/', headers=headers).text
    # 解析请求
    # (Parsing requests)
    data = etree.HTML(html)
    maincounters = data.xpath('//div[@id="maincounter-wrap"]')
    emotion_one = './data.csv'
    if os.path.exists(emotion_one):
        os.remove(emotion_one)

    for counter in maincounters:
        h1 = counter.xpath('./h1/text()')[0].replace(':', '')
        num = counter.xpath('./div[@class="maincounter-number"]/span/text()')[0].replace(',', '')
        with open(emotion_one, 'a+', encoding='utf_8_sig', newline='') as csvfile:
            writer = csv.writer(csvfile)
            with open(emotion_one, 'r', encoding='utf_8_sig', newline='') as f:
                reader = csv.reader(f)
                if not [row for row in reader]:
                    writer.writerow(['name', 'value'])
                    writer.writerow([h1, num])
                else:
                    writer.writerow([h1, num])

    tab_count = data.xpath(
        '//div[@id="nav-tabContent"]/div[@class="tab-pane active"]/div[@class="main_table_countries_div"]/table[@id="main_table_countries_today"]/tbody/tr')
    print(tab_count)

    emotion_data = './europe.csv'
    if os.path.exists(emotion_data):
        os.remove(emotion_data)
    for tab in tab_count:

        Country_order = ''.join(tab.xpath('./td[2]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                '').replace(
            'N/A', '')
        Total_cases = ''.join(tab.xpath('./td[3]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                              '').replace(
            'N/A', '')
        New_cases = ''.join(tab.xpath('./td[4]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                            '').replace(
            'N/A', '')
        Total_Detaths = ''.join(tab.xpath('./td[5]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                '').replace(
            'N/A', '')
        New_Deaths = ''.join(tab.xpath('./td[6]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                             '').replace(
            'N/A', '')
        Total_Recovered = ''.join(tab.xpath('./td[7]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                  '').replace(
            'N/A', '')
        New_Recovered = ''.join(tab.xpath('./td[8]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                '').replace(
            'N/A', '')
        Active_cases = ''.join(tab.xpath('./td[9]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                               '').replace(
            'N/A', '')
        Serious_Critical = ''.join(tab.xpath('./td[10]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                    '').replace(
            'N/A', '')
        Tot_Cases_1M_pop = ''.join(tab.xpath('./td[11]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                    '').replace(
            'N/A', '')
        Deaths_1M_pop = ''.join(tab.xpath('./td[12]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                                 '').replace(
            'N/A', '')
        Total_Tests = ''.join(tab.xpath('./td[13]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                               '').replace(
            'N/A', '')
        Test_1M_pop = ''.join(tab.xpath('./td[14]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                               '').replace(
            'N/A', '')
        Population = ''.join(tab.xpath('./td[15]//text()')).strip().replace('"', '').replace(',', '').replace('+',
                                                                                                              '').replace(
            'N/A', '')

        not_counter=['Total:','World','Asia','Europe','South America','North America']
        if Country_order=='USA':
            Country_order='America'
        if len(Country_order) == 0 or Country_order in not_counter:
            pass
        else:
            values = [Country_order, Total_cases, New_cases, Total_Detaths, New_Deaths,
                      Total_Recovered, New_Recovered, Active_cases, Serious_Critical,
                      Tot_Cases_1M_pop, Deaths_1M_pop, Total_Tests, Test_1M_pop, Population
                      ]
            print(values)
            heads = ['Country_order', 'Total_cases', 'New_cases', 'Total_Detaths', 'New_Deaths',
                     'Total_Recovered', 'New_Recovered', 'Active_cases', 'Serious_Critical',
                     'Tot_Cases_1M_pop', 'Deaths_1M_pop', 'Total_Tests', 'Test_1M_pop', 'Population'
                     ]

            with open(emotion_data, 'a+', encoding='utf_8_sig', newline='') as csvfile:
                writer = csv.writer(csvfile)
                with open(emotion_data, 'r', encoding='utf_8_sig', newline='') as f:
                    reader = csv.reader(f)
                    if not [row for row in reader]:
                        writer.writerow(heads)
                        writer.writerow(values)
                    else:
                        writer.writerow(values)


def timedTask():
    print(datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])


sched = BlockingScheduler()  # 初始化时指定时区 (Specify time zone at initialisation)
sched.add_job(get_requests, "cron", hour=10, minute=44)  # 执行时间 (Execution time)
sched.add_job(timedTask, "interval", seconds=5)  # 5秒钟执行一次 (Executed once every 5 seconds)


def main():
    sched.start()
    #get_requests()


if __name__ == '__main__':
    main()
