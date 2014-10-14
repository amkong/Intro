'use strict';

angular.module('introApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Modal) {
    
    // Messages!
    $scope.inbox = [];
    $scope.conversations = [];

    var user = Auth.getCurrentUser();
    // async? sometimes on log in will not run.
    console.log(user);

    // GET contacts from users contacts list
    $http.get('/api/users/contacts/list').success(function(contacts) {
      $scope.contacts = contacts;
    })

    // GET conversations from users conversation list
    $http.get('/api/users/conversations/list').success(function(conversations) {
      $scope.conversations = conversations;
    })

    // GET messages
      // $http.get('/api/messages/' + user._id).success(function(messages) {
    $http.get('/api/messages').success(function(messages) {
      // why does .push not work here?
      $scope.inbox = messages;
      $scope.user = user.name;

      // callback to move chat down to new message?
      socket.syncUpdates('message', $scope.inbox);
      $(".chat-list").animate({ scrollTop: $(".chat-area").height()*10 }, "fast");
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
      $scope.newMessage = '';
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

      $http.post('/api/conversations/', conversation).success(function(conversation) {
        $scope.conversations.push(conversation);
        // push into users?
        console.log($scope.conversations);
      });
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('message');
    });
  });
