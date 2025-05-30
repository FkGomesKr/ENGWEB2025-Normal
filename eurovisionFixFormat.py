import json

# Load the original nested JSON
with open('dataset.json', 'r', encoding='utf-8') as infile:
    original_data = json.load(infile)

# Convert dictionary of editions into a list
edition_list = list(original_data.values())

# Write the list to a new JSON file
with open('eurovision_array.json', 'w', encoding='utf-8') as outfile:
    json.dump(edition_list, outfile, ensure_ascii=False, indent=2)

print("✅ eurovision_array.json created successfully.")
