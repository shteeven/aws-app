'use strict';

/**
 * @ngdoc function
 * @name awsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the awsAppApp
 */

angular.module('myApp')
  .controller('MainCtrl', function($scope, AWSService, UserService, StripeService, $http) {

    $scope.clientId = '120364084226-72omk2fl5mu05vdb765heq23r5lt9dh1';

    $scope.signedIn = function(oauth) {
      $scope.oauth = oauth;
      UserService.setCurrentUser(oauth)
        .then(function(user) {
          $scope.user = user;
        });
    };

    var getItemsForSale = function() {
      UserService.itemsForSale()
        .then(function(images) {
          $scope.images = images;
        });
    };

    $scope.onFile = function(files) {
      UserService.uploadItemForSale(files)
        .then(function(data) {
          getItemsForSale();
        });
    };

    $scope.sellImage = function(image) {
      $scope.showCC = true;
      $scope.currentItem = image;
    };

    $scope.submitPayment = function() {
      UserService
        .createPayment($scope.currentItem, $scope.charge)
        .then(function(data) {
          $scope.showCC = false;
        });
    };

    getItemsForSale();

    $scope.signout = function(){
      disconnectUser($scope.oauth.access_token);
    };

    function disconnectUser(access_token) {
      var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token + '&callback=JSON_CALLBACK';
      $http.jsonp(revokeUrl)
        .success( function(nullResponse) {$scope.user = undefined;})
        .error(function(err) {console.log(err);});
    }
  });
