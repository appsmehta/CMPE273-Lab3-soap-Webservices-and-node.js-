var winston = require('../log.js');
var ejs = require("ejs");
/*var mysql = require('./mysql');*/
var soap = require('soap');
var baseURL= "http://localhost:8080/Ebay_Jax/services";


exports.validate = function (req,res){

	winston.info("Clicked:PayNow");
	
	console.log(req.body);
	var allValid=false;
	var validations=[];
	var DateValid = false, cvvValid = false,NumberValid=false;
	var cardName = req.param("username");
	var cardNumber = req.param("number");
	var expiry_month = parseInt(req.body.expiry_month);
	var expiry_year = parseInt(req.body.expiry_year);
	var cvv = parseInt(req.body.password_cvv);
	console.log("Expires : "+expiry_month+expiry_year);
	if(cardNumber.length==16)
		{
		NumberValid=true;
		}
	else
		{
		console.log("Not valid number");
		validations.push({"field":"Invalid Card Number"});
		}
	if(expiry_year>16)
		{
		console.log("future year valid");
		DateValid=true;
		}
	else if(expiry_year==16&&expiry_month>=(new Date().getMonth()))
		{
		console.log("current year valid");
		DateValid=true;
		}
	else
		{
		
		validations.push({"field":"Invalid Expiry Date"});
		}
	//data [0] = DateValid;
	
	
	if(cvv>0&&cvv<1000)
		{
		console.log("cvv valid");
		
		cvvValid=true;
		}
	else{
	
		validations.push({"field":"Invalid CVV"});
	}
	
	
	if(DateValid&&cvvValid)
		{
		

		console.log(req.session.cartitems);
		console.log(req.session.cartqty);
        
        for(item in req.session.cartitems)
        	{
        		console.log(req.session.cartitems[item]);

        		var orderedItem = req.session.cartitems[item];

				var checkoutQuery = "insert into orders (`ad_id`,`item_name`,`seller_name`, `buyer`,`cost`, `qty`) values ('"+orderedItem.adv_id+"','"+orderedItem.item_name+"','"+orderedItem.seller_name+"','"+req.session.username+"','"+(orderedItem.item_price*req.session.cartqty[item])+"','"+req.session.cartqty[item]+"');";
				console.log("Query is:"+checkoutQuery);

				var url = baseURL + "/Checkout?wsdl";
				var args = {
							"ad_id": orderedItem.adv_id,
							"item_name":orderedItem.item_name,
							"seller_name":orderedItem.seller_name,
							"buyer":req.session.username,
							"cost":orderedItem.item_price*req.session.cartqty[item],
							"qty":req.session.cartqty[item]
						}

						soap.createClient(url,option, function(err, client) {
						console.log("client created",err);
						console.log("client created success",client);
						client.processCheckout(args, function(err, result) {
						console.log("inside process checkout");
						console.log("results" + JSON.stringify(result));

						
							if(result.processCheckoutReturn!=null)
								{
									res.status(200);
								res.json({"result":result.processCheckoutReturn})
								}
								else
									res.status(400);
								res.json({"result":"Error processing order"});
						});
					});
				}
		}
};