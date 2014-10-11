'use strict';

angular.module('introApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Modal) {
    
    // Messages!
    $scope.inbox = [];

    var user = Auth.getCurrentUser();
    // async? sometimes on log in will not run.

    // http call for contact list

    // GET contacts
    $http.get('/api/users/contacts/list').success(function(contacts) {
      $scope.contacts = contacts;
    })

    // GET messages
      // $http.get('/api/messages/' + user._id).success(function(messages) {
    $http.get('/api/messages').success(function(messages) {
      $scope.inbox = messages;
      $scope.user = user.name;
      $(".chat-list").animate({ scrollTop: $(".chat-area").height()*10 }, "fast");

      // callback to move chat down to new message?
      socket.syncUpdates('message', $scope.inbox);
    })

    $scope.message = function() {
      if($scope.newMessage === '') {
        return;
      }

      var message = {
        userId: user._id,
        user: $scope.user,
        // CAUTION: SENDING MESSAGE TO SELF
        to: user._id,
        text: $scope.newMessage,
        email: user.email
      };

      $http.post('api/messages', message);
      console.log(message);
      $scope.newMessage = '';
    }

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    }

    $scope.newConversation = function() {
      // click on contact to open a conversation
      console.log(this.contact._id);
      var contact = this.contact;

      var conversation = {
        name: contact.name,
        creator: user._id,
        userId: contact._id
      }

      $http.post('/api/conversations/', conversation).success(function(err, conversation) {
        console.log(conversation);
      });
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('message');
    });
  });
