/**
 * New node file
 */
var ejs = require('ejs');
/*var mysql = require('./mysql');*/
var auctions = require('./adM');
require("client-sessions");
var winston = require('../log.js');

var soap = require('soap');
var baseURL= "http://localhost:8080/Ebay_Jax/services";


exports.about = function (req,res){
	if(req.session.username!=undefined){

		winston.info("Clicked About profile");
	
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('about',{"username":req.session.username});
}

else {
	res.redirect('/')
	
	/*res.end;*/
	}
}

exports.getProfile = function (req,res){


	if(req.session.username!=undefined)
	{
		var option = {
					ignoredNamespaces : true	
			};

		var url = baseURL + "/About?wsdl";
		var args = {"email": req.session.username};

			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.getProfile(args, function(err, result) {
					console.log("inside client Register");
					console.log("results" + JSON.stringify(result));
			if(result.length > 0){
			res.send({"email":result.getProfileReturn.email,"firstName":result.getProfileReturn.firstname,"lastName":result.getProfileReturn.lastName,"birthday":result.getProfileReturn.birthday,"handle":result.getProfileReturn.handle,"contactinfo":result.getProfileReturn.contactinfo,"location":result.getProfileReturn.location})
				}
	 		else {
	 			res.status(400);
	 			res.json({"result":"Couldn't retrive profile at this time!"});
	 			 }
		})
   });

}
};

exports.updateProfile = function (req,res){
	winston.info("Clicked :Update Profile");
	console.log('printing date');
	console.log(req.body.birthday.slice(0,10));

		
		
		var url = baseURL + "/About?wsdl";

		var args = {
			"firstName": req.body.firstName,
			"lastName": req.body.lastName,
			"handle" : req.body.handle,
			"contactinfo": req.body.contactinfo,
			"location": req.body.location,
			"email": req.body.email
		}
		

			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.updateProfile(args, function(err, result) {
					console.log("inside client updateProfile");
					console.log("results" + JSON.stringify(result))
	
			if(results.length > 0){

			res.json({"Result": "Profile Updated"});
				}
	 		else {
	 			res.json({"result":"profile not updated"});
	 			 }

		});
	});
};



exports.getBoughtItems = function (req,res){

	winston.info("Clicked :My Orders");
	var url = baseURL + "/About?wsdl";

		var args = {
						"email": req.session.username
					}
		

			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.getBoughtItems(args, function(err, result) {
					console.log("inside client getBoughtItems");
					console.log("results" + JSON.stringify(result))
			{
				if(result.length>0)
				{
					res.send({"data":result.getBoughtItemsReturn.myBoughtItems});
				}
				else
					res.send({"data":null});
			}
		

		});
	});
}


exports.getSoldItems = function (req,res){

	winston.info("Clicked :My Sold Items");
	
	var url = baseURL + "/About?wsdl";

		var args = {
						"email": req.session.username
					}
		

			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.getSoldItems(args, function(err, result) {
					console.log("inside client getSoldItems");
					console.log("results" + JSON.stringify(result))
			
				if(result.length>0)
				{
					res.send({"data":result.getSoldItemsReturn.mySoldItems});
				}
				else
					res.send({"data":null});
			

		});
	
}); }


exports.getBidResults = function(req,res){

	
	winston.info("Clicked :My Bids");

	console.log("Get bids for:"+req.session.username);
	var url = baseURL + "/About?wsdl";

		var args = {
						"bidder": req.session.username
					}

		soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.getBidResults(args, function(err, result) {
					console.log("inside client getBidResults");
					console.log("results" + JSON.stringify(result))
			
				if(result.length>0)
				{
					res.send({"Bids":result.getBidResultsReturn});
				}
				else
					res.send({"data":null});
			

		});
	});
};