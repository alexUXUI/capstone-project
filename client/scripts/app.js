angular.module('capstone', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('onboard', {
        templateUrl: 'templates/onboard.html',
        controller: 'LandingController',
        url: '/onboard'
      }).state('landing', {
        templateUrl: 'templates/landing.html',
        controller: 'LandingController',
        url: '/landing'
      }).state('main', {
        templateUrl: 'templates/main.html',
        controller: 'MainController',
        url: '/main'
      });
    });
