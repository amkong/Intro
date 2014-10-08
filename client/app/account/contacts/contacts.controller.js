'use strict';

angular.module('introApp')
  .controller('ContactsModalCtrl', function ($scope, $modal) {
    $scope.addcontact = function(form) {
      $scope.submitted = true;

      // push user.contactList
    }
  });
