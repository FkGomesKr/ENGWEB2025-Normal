import json

with open('eurovision_array.json', 'r', encoding='utf-8') as f:
    data = json.load(f)  # data is a list

for edition in data:
    if "id" in edition:
        edition["_id"] = edition.pop("id")

with open('eurovisao_modified.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("✅ Done: Changed top-level 'id' to '_id' in each edition")
