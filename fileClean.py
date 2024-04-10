import json
from pathlib import Path
import pandas as pd
import os


local_dir = Path("./project3files/")
company_ids = ['0000010795', '0000004962', '0000004127', '0000004977', '0000008063']
 
def get_company_data(company_id):
    entries = []
    for folder in os.listdir(local_dir):
        folder_path = os.path.join(local_dir, folder)
        for file in os.listdir(folder_path):
            if file.startswith(company_id):
                entry = {}
                f = open(os.path.join(folder_path, file))
                filedata = json.load(f)
                entry["symbol"] = filedata["symbol"]
                entry["quarter"] = filedata["quarter"]
                entry["year"] = filedata["year"]
                bs = filedata["data"]["bs"]
                for item in bs:
                    entry["label"] = item["label"]
                    entry["concept"] = item["concept"]
                    entry["unit"] = item["unit"]
                    entry["value"] = item["value"]
                    entries.append(entry)
    return entries

data_df = pd.DataFrame()
for company_id in company_ids:
    company_info = get_company_data(company_id)
    current_df = pd.DataFrame(company_info)
    data_df = pd.concat([data_df, current_df], ignore_index=True)
    data_df.to_csv("./company_info.csv")