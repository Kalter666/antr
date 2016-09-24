const app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
  console.log('hello');

  const refresh = () => {
    $http.get('/contactlist').success( (res) => {
      console.log('I've got some data');
      $scope.contactlist = res;
      $scope.contact = '';
    });
  };

  refresh();

  $scope.addContact = () => {
    //noinspection JSUnresolvedVariable
    console.log($scope.contact);
    //noinspection JSUnresolvedVariable
    $http.post('/contactlist', $scope.contact).success( (res) => {
      console.log(res);
      refresh();
    });
  };
  $scope.remove = (id) => {
    console.log(id);
    $http.delete('/contactlist/' + id).success( (res) => {
      refresh();
    });
  };
});﻿
