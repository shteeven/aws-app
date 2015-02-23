'use strict';

/**
 * @ngdoc function
 * @name awsAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the awsAppApp
 */
angular.module('myApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
