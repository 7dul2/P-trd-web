import requests
import json
import time
import datetime
from dateutil.relativedelta import relativedelta

# 获取当前时间戳
current_ts = int(time.time())
print("当前时间戳:", current_ts)

all_datas = []  # 用来存放所有请求返回的 datas
maxTime = current_ts  # 初始的 maxTime 使用当前时间戳

# 循环请求4次，每次将 maxTime 往前推3个月
for i in range(4):
    url = f"https://sdt-api.ok-skins.com/user/steam/category/v1/kline?type=2&maxTime={maxTime}&typeVal=1229518766579748864&platform=YOUPIN&specialStyle"
    print(f"请求 {i+1}: {url}")
    
    resp = requests.get(url).text
    datas = json.loads(resp)["data"]
    all_datas.extend(datas)
    
    # 更新 maxTime：当前的 maxTime 往前推正好3个月
    dt = datetime.datetime.fromtimestamp(maxTime)
    dt_new = dt - relativedelta(months=3)
    maxTime = int(dt_new.timestamp())

# 对合并后的数据按照时间戳（datas 中每个列表的第一个元素）从早到晚排序
all_datas_sorted = sorted(all_datas, key=lambda x: int(x[0]))

# 将时间戳转换为日期，并存入列表（去掉重复日期）
dates = []
for data in all_datas_sorted:
    ts = int(data[0])
    date_obj = datetime.datetime.fromtimestamp(ts).date()
    # 如果日期重复则不添加
    if not dates or dates[-1] != date_obj:
        dates.append(date_obj)
    print(date_obj.strftime("%Y-%m-%d"))

# 检查日期是否连续
is_consecutive = True
for i in range(1, len(dates)):
    if (dates[i] - dates[i-1]).days != 1:
        print(f"日期不连续: {dates[i-1]} 和 {dates[i]}")
        is_consecutive = False

if is_consecutive:
    print("所有日期都是连续的！")
else:
    print("存在日期不连续的情况。")
