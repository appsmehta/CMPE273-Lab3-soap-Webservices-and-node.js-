/**
 * New node file
 */

 var soap = require('soap');
 var baseURL = "http://localhost:8080/Calculator_JAX/services";

exports.test= function (req,res){

	console.log(req.body);

	var option = {
			ignoredNamespaces : true	
		};
	
	var url = baseURL+"/calculator?wsdl";
	var args = {operation:req.body.operation,number1:parseFloat(req.body.number1),number2:parseFloat(req.body.number2)};
	console.log(url);
	  soap.createClient(url,option, function(err, client) {
	      client.getResult(args, function(err, result) {
	    		  res.send({"result":result.getResultReturn});
	      });
	  });

}

/*
exports.calculate = function(req,res)
{
	console.log(req.body);
console.log(req.body.operation);

var number1=parseInt(req.body.number1);
var number2=parseInt(req.body.number2);

var operation=req.body.operation;

/*console.log(2+3);
console.log("result:"+(2-3));
console.log(2*3);
console.log(2/3);*/

/*
var result;

switch(operation)
{
case "add":
	result = number1+number2;
	break;
case "subtract":
	result = number1-number2;
	break;
case "multiply":
	result = number1*number2;
	break;
case "divide":
	result = number1/number2;
	break;

}

res.send({"result":result});


}
*/