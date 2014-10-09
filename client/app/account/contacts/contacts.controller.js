'use strict';

angular.module('introApp')
  .controller('ContactsModalCtrl', function ($scope, $modal, $http) {
    $scope.addContact = function(form) {
      $scope.submitted = true;

      console.log('submitted');
      console.log($scope.contact.email);
      var email = $scope.contact.email;
      $http.get('/api/users/' + email).success(function(userprofile) {
        console.log("found user");
        console.log(userprofile);
        console.log(userprofile.id);
      })

      // push user.contactList
    }
  });
