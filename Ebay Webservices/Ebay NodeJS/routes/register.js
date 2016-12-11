var crypto = require('crypto');
/*var mysql = require('./mysql');*/
var dateFormat = require('dateFormat');
require('ejs');
var winston = require('../log.js');
var soap = require('soap');
var baseURL= "http://localhost:8080/Ebay_Jax/services";

exports.signup = function(req, res){

	winston.info("Clicked: Register");
	console.log("inside new signup register");
	//console.log(req);

	var emailId = req.param('inputemail');
	reenteredemail=req.param('inputreenteredemail');
	password=req.param('inputpassword');
	firstName=req.param('inputfirstName');
	lastName=req.param('inputlastName');

	console.log(emailId+reenteredemail+password+firstName+lastName);

	var salt = "theSECRETString";
	password = crypto.createHash('sha512').update(password + salt).digest("hex");

	
	console.log(password);

	
	

	var option = {
					ignoredNamespaces : true	
			};

	var url = baseURL + "/Login?wsdl";
	var args = {"email": emailId, "password": password, "firstName": firstName, "lastName" : lastName};



			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.register(args, function(err, result) {
					console.log("inside client Register");
					console.log("results" + JSON.stringify(result));
					
					 json_responses = {"statusCode" : 200};
		    	res.send(json_responses);




				})
			});


	
	/*mysql.storeData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			console.log("entered data");
			console.log(results);

			res.send("OK");
		}
	},getUser);
	*/
	
}

exports.authenticate= function(req,res){
	console.log("inside signin register");
	winston.info("Clicked: Log In");
	var username = req.param('username');
	var password = req.param('password');
	
	console.log(username+password);
	
	var salt = "theSECRETString";
	password = crypto.createHash('sha512').update(password + salt).digest("hex");

	var option = {
					ignoredNamespaces : true	
			};

	var url = baseURL + "/Login?wsdl";
	var args = {username: username,password: password};

			soap.createClient(url,option, function(err, client) {
				console.log("client created",err);
				console.log("client created success",client);
				client.login(args, function(err, result) {
					console.log("inside client login");
					console.log("results" + JSON.stringify(result));
					req.session.username = result.loginReturn.email;
					req.session.previous_logged_in = dateFormat(result.loginReturn.last_logged_in);

					 json_responses = {"statusCode" : 200,"username":req.session.username,"previous_logged_in":req.session.previous_logged_in};
		    res.send(json_responses);




				})
			});
	};


exports.logout = function(req,res)
{
	winston.info("Clicked: Logout");


	req.session.destroy();
	res.redirect('/');
}


	//res.send("SignIN API success");
  //	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  	//res.render('login', { title : 'About'});

  	//res.render("login",{selectedSignIn : "false"});

//   	mysql.fetchData(function(err,results){
// 		if(err){
// 			throw err;
// 		}
// 		else 
// 		{
// 			if(results.length > 0){
// 				console.log("valid Login");
// 				req.session.username = username;
// 				req.session.previous_logged_in = dateFormat(results[0].last_logged_in, "yyyy:mm:dd HH:MM:ss");
// 				var previous_logged_in=results[0].last_logged_in;
// 				console.log("Previous login:"+previous_logged_in);
// 				var now = new Date();
// 				console.log(now);
// 				var mydate = dateFormat(now, "yyyy:mm:dd HH:MM:ss");
// 				console.log(mydate);



// 				var updateLastLoginQuery = "update users set `last_logged_in`='"+mydate+"' where `email`='"+req.session.username+"';";

// 				/*mysql.storeData(function(err,results){
// 					if(err){
// 						throw err;
// 					}
// 					else
// 					{
// 						console.log("updated login timestamp data");
// 						console.log(results);

// 						 //res.send("Tamaru Thai Gyu!");
// 						}
// 					},updateLastLoginQuery);*/


// 				console.log("Session initialized");
// 			ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
// 		        // render on success
// 		        if (!err) {
// 		            res.end(result);
// 		        }
// 		        // render or error
// 		        else {
// 		            res.end('An error occurred');
// 		            console.log(err);
// 		        }
// 		    });
// 		    json_responses = {"statusCode" : 200,"username":req.session.username,"previous_logged_in":"n/a"};
// 		    res.send(json_responses);


// 		}
// 		else {    
			
// 			console.log("Invalid Login");
// 			/*ejs.renderFile('./views/failLogin.ejs',function(err, result) {
// 		        // render on success
// 		        if (!err) {
// 		            res.end(result);
// 		        }
// 		        // render or error
// 		        else {
// 		            res.end('An error occurred');
// 		            console.log(err);
// 		        }
// 		    });*/
// 		    res.send("Na thyu !");
// 		}

		
// 	}  
// },checkUser);