// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('canteenreport', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    console.group('ionicPlatform.ready');

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    console.groupEnd();
  });
});

app.config(function ($stateProvider, $urlRouterProvider) {
  console.group('config');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
    .state('report', {
      url: '/report',
      templateUrl: 'templates/report.html',
      controller: 'ReportController'
    });

  $urlRouterProvider.otherwise('/');

  console.info($stateProvider);
  console.groupEnd();

});
