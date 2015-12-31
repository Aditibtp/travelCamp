var travelApp=angular.module('travelMateApp',[]);
travelApp.controller('travelMateCtrl',function($scope,$http){
	$scope.getCities = function(){
		$scope.showDropDown = true;
		$http.post('/getCities', { sentText: $scope.typedChars}).then(function(response) {
			console.log($scope.typedChars);
			$scope.cities = [];
			console.log(response);
			var cityDetails = response.data;
		  for(var i=0; i<cityDetails.length; i++){
			 	$scope.cities[i] = {
				 "value" : cityDetails[i].city
			 };
		 }
	 });
 }

 $scope.selectCity = function(citySelected){
	 $scope.typedChars = citySelected;
	 $scope.showDropDown = false;
 }
});
