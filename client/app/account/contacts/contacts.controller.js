'use strict';

angular.module('introApp')
  .controller('ContactsModalCtrl', function ($scope, $modal, $http, $location, Auth) {
    $scope.addContact = function(form) {
      $scope.submitted = true;

      var email = $scope.contact.email;
      $http.get('/api/users/' + email).success(function(contact) {
        var userList = Auth.getCurrentUser().contactList;
        console.log(contact)
        userList.push(contact);
        console.log('contact added');
        // TODO: confirmation user has been added.
        $location.path('/');
      })

        // from res.user, find id. add id to users contact array.
    }

      // push user.contactList
  });
