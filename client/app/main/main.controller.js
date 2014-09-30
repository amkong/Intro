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


    //Messages!
    $scope.inbox = [];

    $scope.addMessage = function() {
      if($scope.newMessage === '') {
        return;
      }
      $http.post('/api/messages', { name: "THIS SHOULD BE USER NAME" });
      $scope.newMessage = '';
    };

    $scope.message = function() {
      var msg = $scope.newMessage;
      socket.sendMessage(msg);
      $scope.newMessage = '';
    }

    $scope.newMessage = function() {
      socket.receiveMessage('message', $scope.inbox);
    }

    $scope.deleteMessage = function(message) {
      //nothing here!
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
