var ejs = require('ejs');
/*var mysql = require('./mysql');*/
require("client-sessions");
var dateFormat = require('dateformat');
var now = "2016-10-13T10:48:31.000Z";
var winston = require('../log.js');

var soap = require('soap');
var baseURL= "http://localhost:8080/Ebay_Jax/services";


const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
   
    new (winston.transports.File)({
      filename: `${logDir}/bids.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});



exports.ad = function(req,res) {

	winston.info("Clicked: Daily Deals");
	if(req.session.username!=undefined)
	{	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("ads",{"username":req.session.username});
	}

	else

	{
		res.redirect('/')
	}



}

exports.getAds = function(req,res) {



	if(req.session.username!=undefined)
	{
		winston.info("Requested all ads");

		var getAdquery = "select * from advertisements";
		console.log("Query is:"+getAdquery);


		var url = baseURL + "/Advertisements?wsdl";
		var args = {};



			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.getAds(args, function(err, result) {
					console.log("inside Ads getAds");
					console.log("results" + JSON.stringify(result));

					if(result.getAdsReturn.length>0)
					{
						json_responses = result.getAdsReturn;
						res.status(200);
						res.json(json_responses);
					}
					
					else
					{
						res.status(400);
						res.json({"result":"No Ads to show"});
					}

				});
			});

}
}

exports.getAuctions = function(req,res){

	winston.info("Requested all auctions");
	console.log("Trying dateformat");

	console.log(dateFormat(now, "fullDate"));

	var url = baseURL + "/Advertisements?wsdl";
		var args = {};



			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.getAuctions(args, function(err, result) {
					console.log("inside Ads getAuctions");
					console.log("results" + JSON.stringify(result));

					if(result.getAuctionsReturn.length>0)
					{
						json_responses = result.getAdsReturn;
						res.status(200);
						res.json(json_responses);
					}
					
					else
					{
						res.status(400);
						res.json({"result":"No Auction Items to show"});
					}

				});
			});



	}


	exports.postAd = function (req,res) {


	//if(req.session.username!=undefined)
	{
		console.log(req.body.item_quantity);

		winston.info("Clicked:Post Ad");		
		var url = baseURL + "/Advertisements?wsdl";
		var args = { 
					 "item_name":req.body.item_name,
					  "item_description":req.body.item_description,
					  "seller_name":res.session.username,
					  "item_price":req.body.item_price,
					  "item_quantity":req.body.item_quantity
				};



			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.postAd(args, function(err, result) {
					console.log("inside Ads postAds");
					console.log("results" + JSON.stringify(result));

					if(result.postAdReturn!=null)
					{
						
						res.status(200);
						res.json({"Result":"Ad posted!"});
					}
					
					else
					{
						res.status(400);
						res.json({"result":"Ad not posted"});
					}

				});
			});
	}
}
exports.postAuction = function(req,res) {

	winston.info("Clicked:Post Auction");
	var expirydate = new Date();
	expirydate.setDate(expirydate.getDate() + 4);
	console.log(expirydate);
	expirydate=dateFormat(expirydate,"yyyy-mm-dd HH:MM:ss");
	console.log("expires:"+expirydate);

	var postAuctionQuery = "insert into auctions(`item_name`, `item_description`, `seller_name`, `item_price`,`status`,`expires`) values ('"+req.body.item_name+"','"+req.body.item_description+"','"+req.session.username+"','"+req.body.item_price+"','in-progress','"+expirydate+"');";
	console.log("Query is:"+postAuctionQuery);

	var url = baseURL + "/Advertisements?wsdl";
		var args = { 
					 "item_name":req.body.item_name,
					  "item_description":req.body.item_description,
					  "seller_name":res.session.username,
					  "status":"in-progress",
					  "expires":expirydate
				};

	

			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.postAuction(args, function(err, result) {
					console.log("inside Ads postAuction");
					console.log("results" + JSON.stringify(result));

					if(result.postAuctionReturn!=null)
					{
						
						res.status(200);
						res.json({"Result":"Auction Item posted!"});
					}
					
					else
					{
						res.status(400);
						res.json({"result":"Auction Item not posted"});
					}

				});
			});
}





exports.addtoCart = function(req,res){
	winston.info("Clicked: Add to Cart on:"+req.body.product.item_name);
	req.session.cartitems.push(req.body.product);
	req.session.cartqty.push(req.body.quantity);
//console.log("cost for :"+req.body.product.item_name+" is:"+(req.body.product.item_price*req.body.quantity));
req.session.checkoutAmount = req.session.checkoutAmount + (req.body.product.item_price*req.body.quantity)
//console.log(req.body.product+"ordered quantity"+req.body.quantity);
	//console.log(req.session.cartitems);
	res.json({statusCode:200,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty});


}

exports.removeFromCart = function(req,res){
winston.info("Clicked: Remove from Cart on:"+req.body.product.item_name);
	console.log("remove cart called");
	console.log(req.body.product+" and quantity"+req.body.qty);
	console.log(req.session.cartitems[req.body.product]);

	console.log("removing");

	req.session.cartitems.splice(req.body.product,1);
	req.session.cartqty.splice(req.body.product,1);
	req.session.checkoutAmount = req.session.checkoutAmount - (req.body.product.item_price*req.body.qty)
	console.log("new items in cart:");
	console.log(req.session.cartitems);
	;res.json({statusCode:200,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty})

	

}



exports.sellHome = function(req,res){

	if(req.session.username!=undefined)
	{
		res.render("sell",{"username":req.session.username});
	}

	else

	{
		res.redirect('/')
	}

}

exports.registerBid = function(req,res){

	logger.info("User:"+req.session.username+" bid for "+req.body.Auctionitem.item_name+ "item id:"+req.body.Auctionitem.auction_id+" Amount:"+req.body.bidAmount);	

	console.log("Bid to server for:"+req.body.Auctionitem.item_name+" worth $: "+req.body.bidAmount);

	console.log(req.body.Auctionitem.auction_id + " "+ req.session.username + " "+ req.body.bidAmount + " "+ "active");

	

	var url = baseURL + "/Advertisements?wsdl";
		var args = { 
					 "auction_id":req.body.Auctionitem.auction_id,
					  "bidder":res.session.username,
					  "bid_amount":req.body.bid_amount,
					  "bid_status":"active",
					  
				};

				soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.registerBid(args, function(err, result) {
					console.log("inside Ads registerBid");
					console.log("results" + JSON.stringify(result));

					if(result.registerBidResult!=null)
					{
						
						res.status(200);
						res.json({"Result":"Bid posted!"});
					}
					
					else
					{
						res.status(400);
						res.json({"result":"Bid not posted"});
					}

				});
			});
}
