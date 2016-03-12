angular.module('capstone')
  .controller('LandingController', LandingController)
  .controller('MainController', MainController)

function LandingController($scope) {
  $scope.hello = "Bring your rebellion to market";
  $scope.secondVariable = "start the revolution"
}

function MainController($scope, $http, getUsers) {

  getUsers.then(function(users){
    $scope.realUsers = users;
    console.log($scope.realUsers)
  })

  $scope.whatever = 'whatever';
  $scope.users = [];


}
