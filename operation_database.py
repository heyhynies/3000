# -*- coding: utf-8 -*-
# @Time    : 2022/3/5 14:56
# @Author  : Haoyu Wang
# @Email   : haoyu.wang@students.plymouth.ac.uk
# @File    : operation_database.py
# @Software: PyCharm


import sqlite3

mydb = sqlite3.connect("data-dev.db")
cur = mydb.cursor()
#
# cur.execute('delete from user where id=3;')
#
# cur.close()
#
# mydb.commit()

cur.execute('select * from user;')
Tables = cur.fetchall()
for t in Tables:
    print(t)

print(Tables)
