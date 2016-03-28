var travelApp = angular.module('travelMateApp', ['ngAnimate']);
travelApp.controller('travelMateCtrl',function($scope, $http){
	$scope.getUserInputPage = true;

	$scope.getCities = function(){
		$scope.showDropDownCity = true;
 	  $scope.showDropDownActivity = false;
		$http.post('/getCities', { sentText: $scope.typedChars}).then(function(response) {
			$scope.cities = [];
			var cityDetails = response.data;
		  for(var i=0; i<cityDetails.length; i++){
			 	$scope.cities[i] = {
				 "value" : cityDetails[i].city,
				 "id": cityDetails[i].cityId
			 };
		 }
	 });
 }

$scope.selectCityByKey = function($event){
	var e = $event;
	var $target = $(e.target);
	if(e.keyCode === 40){
		$("ul#travelCityNames li").first().focus();
		$("ul#travelCityNames li").first().addClass("highlight-city");
	}
}

$scope.selectActivityByKey = function($event){
	var e = $event;
	var $target = $(e.target);
	if(e.keyCode === 40){
		$("ul#travelActivityNames li").first().focus();
		$("ul#travelActivityNames li").first().addClass("highlight-city");
	}
}

$scope.selectActivity = function(){
	$(".travel-first-page").hide();
	$(".travel-second-page").show();
}

$scope.navigateCities = function($event, $index){
	var e = $event;
	var $target = $(e.target);
	if(e.keyCode === 40){
		$target.removeClass("highlight-city");
		$target.next().focus();
		$target.next().addClass("highlight-city");
		$("#travelPlace").val($target.next().text().trim());
	}
	else if(e.keyCode === 38){
		$target.removeClass("highlight-city");
		$target.prev().addClass("highlight-city");
		$target.prev().focus();
		$("#travelPlace").val($target.prev().text().trim());
	}
}

 $scope.selectCity = function(citySelectedId, citySelectedName){
	 $scope.typedChars = citySelectedName;
	 $scope.showDropDownCity = false;
	 $scope.showDropDownActivity = true;
	 $("#travelType").focus();
	 $http.post('/getAvailableActivities', { selectedCityId: citySelectedId}).then(function(response) {
		 $scope.showDropDownActivity = true;
		 $scope.activities = [];
		 var activityDetails = response.data;
		 for(var i=0; i<activityDetails.length; i++){
			 $scope.activities[i] = {
				"value" : activityDetails[i].activity + " at " + activityDetails[i].place,
				"data": activityDetails[i].activityId
			};
		}
	});
 }
});

//focus the first li using ng-if in the html tag
//reverse the selection criteria as in if user wants to select activity first and then city
travelApp.directive('keyNav', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
                scope.$apply(function (){
                    scope.$eval(attrs.keyNav);
										if(event.which === 40){
											element.removeClass("highlight-city");
											element.next().focus();
											element.next().addClass("highlight-city");
											$("#travelType").val(element.next().text().trim());
										}
										else if(event.which === 38){
											console.log("in second cond");
											element.removeClass("highlight-city");
											element.prev().focus();
											element.prev().addClass("highlight-city");
											$("#travelType").val(element.prev().text().trim());
										}
                });
                event.preventDefault();
        });
    };
});

travelApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});
