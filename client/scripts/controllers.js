angular.module('capstone')
  .controller('LandingController', LandingController)
  .controller('MainController', MainController)

function LandingController($scope) {
  $scope.hello = "Bring your rebellion to market";
  $scope.secondVariable = "start the revolution"
}

function MainController($scope, $http) {

  $scope.whatever = 'whatever';


  $scope.getUsers = $http({
    method: 'GET',
    url: '/mainpage'
  }).then(function successCallback(response) {
      $scope.users = [];
      for(i = 0; i< response.data.data.length; i = i + 1){
        $scope.user = response.data.data[i];
        $scope.users.push($scope.user)
      }
        console.log($scope.users);
    }, function errorCallback(response) {
      console.log('something went wrong');
  });

}
