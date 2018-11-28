Test

upload a product: http://localhost:3000/hannibal/upload

check users's posted products: http://localhost:3000/hannibal/postItems/:user_id

to see the info of user's posted product: http://localhost:3000/hannibal/product/:product_id


Because we didn't realize the local storage for user_id, so to run this project you should:
1. use postman to crate a user account, 
	url: http://localhost:3000/hannibal/user, 
	method: POST
	data: {"user_name":"stevens","user_pass":"123","contact_email":"111@126.com"}

2. Go to your mongoldb, check the collection "users" to find the '_id' of the account that we created

3. Copy the _id and paste it to /public/js/hannibal.js there is a variable 'user_id' and replace it with your copy _id.

4. Copy the _id and paste it to views/products/uploadProduct.handlebars, 
	<input type="hidden" name = "user_id" value="02"> replace value by the copy _id