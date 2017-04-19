angular.module('talk', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){

 $scope.signedInUser = '';

$scope.isEqual = function(talk) {
console.log("TALK " + talk.user);
console.log("SIGNED IN " + $scope.signedInUser);
console.log(talk.user === $scope.signedInUser)

return (talk.user === $scope.signedInUser);
};

$scope.setUser = function(uid) {
console.log("I JUST SIGNED IN " + uid);
 $scope.signedInUser = uid;
$scope.$apply();
console.log("PHASE " + $scope.$$phase);

	
};

$scope.removeUser = function() {
 $scope.signedInUser = '';
};

 
 $scope.addOwn = function() {
if (typeof $scope.urlContent === 'undefined') { return; }
     if ($scope.urlContent=== ''){ return; }
     if ($scope.signedInUser === '') {return;}
      $scope.create({
	picture: $scope.urlContent,
        upvotes: 0,
	user: $scope.signedInUser,
      });
      $scope.urlContent= '';
    };

$scope.setVal = function(data) {
$scope.gifContent = data;
$scope.$apply();
};

 
 $scope.addRan = function() {
if (typeof $scope.gifContent === 'undefined') { return; }
     if ($scope.gifContent === ''){ return; }
     if ($scope.signedInUser === '') {return;}
      $scope.create({
	picture: $scope.gifContent,
        upvotes: 0,
	user: $scope.signedInUser,
      });
      $scope.gifContent= '';
//$scope.gifImage = '';
    };

 $scope.incrementUpvotes = function(talk) {
      $scope.upvote(talk);
    };

 $scope.decrementUpvotes = function(talk) {
      $scope.downvote(talk);
    };

$scope.getAll = function() {
    return $http.get('/talks').success(function(data){
      angular.copy(data, $scope.talks);
    });
  };
$scope.getAll();
$scope.create = function(talk) {
    console.log("IN POST");
    return $http.post('/talks', talk).success(function(data){
      $scope.talks.push(data);
    });
  };
$scope.talks = [];

$scope.delete = function(talk) {
      $http.delete('/talks/' + talk._id )
        .success(function(data){
          console.log("delete worked");
	  $scope.getAll();
        });
    };

$scope.upvote = function(talk) {
      return $http.put('/talks/' + talk._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          talk.upvotes += 1;
        });
    };

$scope.downvote = function(talk) {
      return $http.put('/talks/' + talk._id + '/downvote')
        .success(function(data){
          console.log("downvote worked");
          talk.upvotes -= 1;
        });
    };

}
]);

