import requests
import json
import time

def get_item_id(market_hash_name):
    url = "https://sdt-api.ok-skins.com/user/skin/v1/item"
    
    headers = {
        "x-currency": "CNY"
    }
    
    data = {
        "appId": 730,
        "marketHashName": market_hash_name
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                return result["data"]["id"]
        return None
    except Exception as e:
        print(f"获取item_id失败：{str(e)}")
        return None

def fetch_trend_data(item_id):
    url = "https://sdt-api.ok-skins.com/user/steam/type-trend/v2/item/details"
    
    headers = {
        "x-currency": "CNY"
    }
    
    data = {
        "platform": "YOUPIN",
        "typeDay": "5",
        "dateType": 3,
        "itemId": item_id,
        "timestamp": str(int(time.time() * 1000))
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"获取趋势数据失败：{str(e)}")
        return None

def get_skin_trend(market_hash_name):
    item_id = get_item_id(market_hash_name)
    if item_id:
        return fetch_trend_data(item_id)
    return None

if __name__ == "__main__":
    skin_name = "AK-47 | Orbit Mk01 (Field-Tested)"
    result = get_skin_trend(skin_name)
    if result:
        print(json.dumps(result, indent=2, ensure_ascii=False))