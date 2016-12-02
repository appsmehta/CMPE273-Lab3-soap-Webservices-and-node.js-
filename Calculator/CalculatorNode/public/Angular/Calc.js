var Calc = angular.module("myCalc",[])


Calc.controller("CalcController",function($scope,$http)
{


 $scope.calculate = function(data)
 {


 	

 		$http({
			method : "POST",
			url : '/Calc',
			data : {
				"number1" : $scope.number1,
				"number2" : $scope.number2,
				"operation": $scope.operation
			}
 		 }).success(function(data) {

 		 		if(JSON.stringify(data.result)!="null")
 		 		{
 		 			$scope.result=JSON.stringify(data.result);
 		 		}

 		 		
 		 		

 		 	}).error(function(error){

 		 		alert(error);

 		 	});






 }




});