angular.module('capstone')
  .controller('LandingController', LandingController)
  .controller('MainController', MainController)

function LandingController($scope) {
  $scope.hello = "Bring your rebellion to market";
  $scope.secondVariable = "start the revolution"
}

function MainController($scope, $http) {

  $scope.whatever = 'whatever';

//   $scope.getUsers = $http({
//   method: 'GET',
//   url: '/mainpage'
// }).then(function successCallback(response) {
//   var users = response;
//
//   console.log(response);
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     console.log('something went wrong');
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });

}
