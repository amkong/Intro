'use strict';

angular.module('introApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
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
      socket.syncUpdates('message', $scope.inbox);

      // scroll to bottom of chat
      $(".chat-list").load().animate({ scrollTop: $(document).height() }, "slow");
      // why does it stop before it gets to the bottom?

      console.log('success: getting inbox from server');
    })

    $scope.message = function() {
      if($scope.newMessage === '') {
        return;
      }
      var currentUser = Auth.getCurrentUser().name;
      var currentUserEmail = Auth.getCurrentUser().email;
      $http.post('api/messages', { user: currentUser, text: $scope.newMessage, email: currentUserEmail });
      $scope.newMessage = '';
    }

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('message');
    });
  });
