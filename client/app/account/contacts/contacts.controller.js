'use strict';

angular.module('introApp')
  .controller('ContactsModalCtrl', function ($scope, $modal, $http, $location, Auth) {
    $scope.addContact = function(form) {
      $scope.submitted = true;

      var email = $scope.contact.email;
      $http.get('/api/users/' + email).success(function(contact) {
        var userList = Auth.getCurrentUser().contactList;
        userList.push(contact);
        // TODO: confirmation user has been added.
        $location.path('/');
      })
    }
  });
