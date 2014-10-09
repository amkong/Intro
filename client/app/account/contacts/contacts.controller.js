'use strict';

angular.module('introApp')
  .controller('ContactsModalCtrl', function ($scope, $modal, $http, Auth) {
    $scope.addContact = function(form) {
      $scope.submitted = true;

      console.log('submitted');
      console.log($scope.contact.email);
      var email = $scope.contact.email;
      $http.get('/api/users/' + email).success(function(user) {
        console.log("found user");
        var currentUser = Auth.getCurrentUser();
        currentUserList.contactList.push(user._id);
        console.log(currentUserList);
        $http.get('/api/users/' + currentUser._id + '/' + user._id)



        // from res.user, find id. add id to users contact array.
      })

      // push user.contactList
    }
  });
