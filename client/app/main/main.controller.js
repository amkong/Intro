'use strict';

angular.module('introApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };


    // Messages!
    $scope.inbox = [];

    $http.get('/api/messages').success(function(messages) {
      $scope.inbox = messages;
      socket.syncUpdates('message', $scope.indox);
      console.log('success: getting inbox from server');
    })

    $scope.message = function() {
      if($scope.newMessage === '') {
        return;
      }
      $http.post('api/messages', { name: "User", text: $scope.newMessage });
      $scope.newMessage = '';
    }

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
