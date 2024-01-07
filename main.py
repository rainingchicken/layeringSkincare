import pandas as pd 

df = pd.read_csv("skincare_products_clean.csv")
#get first column of csv which is the product_name
#product = df.iloc["product_name"]
#ingredient = df.iloc["clean_ingreds"]


#get rid of volumn of product
def cleanproductrow(eachProduct):
    #gets of of last word 
    #starting from the end of string split when sees first blank space
    #now it becomes 2 elements so just take the first element at index 0
    eachProduct = eachProduct.rsplit(' ', 1)[0]
    return eachProduct
df['product_name'] = df['product_name'].apply(cleanproductrow)

#select product_name and clean_ingreds columns because thats all we need
newdf = df[["product_name","clean_ingreds"]]
#get rid of duplicates because now volumn dont differentiate them
newdf = newdf.drop_duplicates(subset=['product_name'])
newdf.to_csv("clean.csv", index = 0)

product = newdf["product_name"].tolist()
ingredient = newdf["clean_ingreds"].tolist()


#export variable to js file
import json

file = open('./module/product.js', 'w')
file.write("var product = "+json.dumps(product) +  "; \n globalThis.product=product;")
file.close

file = open('./module/ingredient.js', 'w')
file.write("var ingredient = "+json.dumps(ingredient) +  "; \n globalThis.ingredient=ingredient;")
file.close









#get rid of volumn of product
#for eachProduct in product :
    #gets of of last word 
    #starting from the end of string split when sees first blank space
#    eachProduct = eachProduct.rsplit(' ', 1)
    #now it becomes 2 elements so just take the first element at index 0
    #we add a comma so when we copy and paste to js it will become array when we surround with [ ]
#    eachProduct = eachProduct[0]
    #cleanProduct.append(eachProduct )

#get rid of duplicates because now volumn dont differentiate them
#cleanProduct=list(set(cleanProduct))
#product.merge(ingredient, how="left")



#product = pd.DataFrame(cleanProduct)
#product.iloc[-1] = "product_name"






#for eachIngredient in ingredient:
#    cleanedIngredient.append(eachIngredient)
#cleanedIngredient=list(set(cleanedIngredient))

#make new df out of cleanProduct

#get rid of duplicates because now volumn dont differentiate them
#product.drop_duplicates()



