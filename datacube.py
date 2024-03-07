import requests
import json


data = {
    "api_key": "c9dfbcd2-8140-4f24-ac3e-50195f651754",
    "db_name": "login_india_db1",
    "coll_name": "registeration",
    "operation": "fetch",
    "filters": {
        "_id": "101001010101"
    },
}

res = requests.post(
    "https://datacube.uxlivinglab.online/db_api/get_data/", json=data)

print(res.text)
