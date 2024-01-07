# LayeringSkincare
https://rainingchicken.github.io/layeringSkincare/
page to see if one can layer or not layer certain skincare products

## Purpose of Application
This is website in which you are able to check your skincare products compatability with each other. While each brand has a kit in which the different products (clenser, toner, serum, acid, moisturiser, sunscreen, etc) go well together, people are inclined to mix and match the best qualities of each product category. This, however, may result in catastrophe (like how it happened to me) where the combination of these products may cancel each other and make your skin worse! The website is a soft solution to quickly check if your routine is not going to be irritating or not. 

![samplewebsiteskincare](https://github.com/rainingchicken/LayeringSkincare/blob/main/skinlayersample.png)

## Inspiration for Project
I recently got into skincare due to random YouTube recommendation. Therefore, I decided to follow influencers (doctors/dermatologist) and purchase their recommended products. I started breaking out right away. I thought it was skin purging where the products are bringing out all the inpurities and clense from the inside. A month went by I decided to lessen usuage of each product and ultimately not use them at all. My skin that was really red and bumpy became normal again. So I create this website to expedite the process of research of wether or not the different products go together. Overall, I wasted money and ruined my okay skin. 

## Coming (not so) Soon Features
hide and unhide ingredient
show which product has which ingredients that are conflicting with each other
prompt to save products and their ingredients that are not already in the database

## Surface level research
- https://www.skin.software/journal/skincare-ingredients-that-dont-mix, 
- https://www.laroche-posay.com.au/blog/perfect-serum-pairings-how-to-layer-serums-and-ingredients.html
- https://inside-our-products.loreal.com/ingredients/retinol
- https://inside-our-products.loreal.com/ingredients/vitamin-c#:~:text=Vitamin%20C%20is%20used%20in,ASCORBIC%20ACID%20and%20ASCORBYL%20GLUCOSIDE.
- https://www.medicalnewstoday.com/articles/alpha-hydroxy-acid
- https://www.fda.gov/cosmetics/cosmetic-ingredients/beta-hydroxy-acids
- https://www.cerave.com/skin-smarts/skincare-tips-advice/understanding-the-differences-between-ahas-and-bhas

<hr>

## Progress:
1. My first thought is to use scrab ingredients of skincare products from Amazon website since that is where I shop and read the ingredients, claims, and reviews. However, I am second guessing because there were some warnings that it may or may not be illegal and that you might be banned from using Amazon. So I am using Skincare Products Clean Dataset by Erin Ward at https://www.kaggle.com/datasets/eward96/skincare-products-clean-dataset which is a safer and faster. However, it will not include all skincare products...

2. I am going to use python to do data analysis to extract key ingredients such as vitamin C, Retinol, Niacinamide, etc.  





3. I cannot figure an easy way to get variables from python to js so I tried looking at sql in node.js but that looks scary that I have to log in and out of database. So instead of trying to get and use python or SQL, just have js read csv file directly. Maybe it will be easier to use python to clean csv and store it in another csv file?  


4. I tried to make js read csv file directly. While I was able to do it, the array was not an array.
5. I tried to make the website entirely with python. I tried using pyscript but for some reason, it won't recognize the packages I already have installed.
6. I somehow was able to export variable from python into a js file. In the beginning there was a problem with export and import. I had to make the main js file type="module" which for some reason, HTML refuse to recognize and kept giving me errors. I was contemplating putting 2000+ lines of data into one js file but by some miracle I discovered "glocalThis.varable." This god send mechanic allowed me to get variables from other js file without making any imports or module environment. And so I am able to do data analysis in python while still using good old js to code the rest.


