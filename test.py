import pandas as pd

url = 'https://github.com/rainingchicken/LayeringSkincare/blob/main/skincare_products_clean.csv'

df = pd.read_csv(url, index_col=0)

print(df.head())
