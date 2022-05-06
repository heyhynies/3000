# -*- coding: utf-8 -*-
# @Time    : 2022/2/23 16:07
# @Author  : Haoyu Wang
# @Email   : haoyu.wang@students.plymouth.ac.uk
# @File    : manage.py
# @Software: PyCharm


from fc import create_app
import shutil

app = create_app()
# 运行主文件
# (Run the master file)
if __name__ == '__main__':


    app.run(host='127.0.0.2',port=5001,debug=True,use_reloader=False)
