import requests
import json

username = "bode"
country = "ngn"


def get_collection_name(username, country, collection_id=0):
    collection_name = country + username[0].lower() + str(collection_id)
    return collection_name


data = {
    "api_key": "c9dfbcd2-8140-4f24-ac3e-50195f651754",
    "db_name": "db0",
    "coll_name": get_collection_name(username, country),
    "operation": "fetch",
    "filters": {
        "_id": "101001010101"
    },
}

print(data)

res = requests.post(
    "https://datacube.uxlivinglab.online/db_api/get_data/", json=data)

users = json.loads(res.text)
print(users)
