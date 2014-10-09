'use strict';

angular.module('introApp')
  .controller('ContactsModalCtrl', function ($scope, $modal, $http, $location, Auth) {
    $scope.addContact = function(form) {
      $scope.submitted = true;

      console.log('submitted');
      console.log($scope.contact.email);
      var email = $scope.contact.email;
      $http.get('/api/users/' + email).success(function(user) {
        console.log("found user");
        var currentUserList = Auth.getCurrentUser().contactList;
        currentUserList.push(user._id);
        console.log(currentUserList);
        $http.put('/api/users/contacts/add/' + user._id).success(function() {
          $location.path('/');
        })

        // from res.user, find id. add id to users contact array.
      })

      // push user.contactList
    }
  });
