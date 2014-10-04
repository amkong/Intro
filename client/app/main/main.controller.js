'use strict';

angular.module('introApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Modal) {
    
    // Messages!
    $scope.inbox = [];

    $http.get('/api/messages').success(function(messages) {
      $scope.inbox = messages;
      $scope.user = Auth.getCurrentUser().name;
      socket.syncUpdates('message', $scope.inbox);

      // scroll to bottom of chat
      $(".chat-list").load().animate({ scrollTop: $(document).height() }, "fast");
      // why does it stop before it gets to the bottom?

      console.log('success: getting inbox from server');
    })

    $scope.message = function() {
      if($scope.newMessage === '') {
        return;
      }
      var currentUserEmail = Auth.getCurrentUser().email;
      $http.post('api/messages', { user: $scope.user, text: $scope.newMessage, email: currentUserEmail });
      $scope.newMessage = '';
    }

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    }

    // $scope.test = function() {
    //   $scope.openModal();
    // }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('message');
    });
  });
