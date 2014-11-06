'use strict';

angular.module('introApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Modal) {

    // Messages!
    $scope.inbox = [];
    $scope.conversations = [];

    var user = Auth.getCurrentUser();
    // async? sometimes on log in will not run.

    // GET contacts from users contacts list
    $http.get('/api/users/contacts/list').success(function(contacts) {
      $scope.contacts = contacts;
    })

    // GET conversations from users conversation list
    $http.get('api/conversations/list/' + user._id).success(function(conversations) {
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
      var contact = this.contact;
      var foundConversation = false;
      var conversation = {
        name: contact.name,
        creator: user._id,
        userId: contact._id
      }

      for (var i = 0; i < $scope.conversations.length; i++) {
        if ($scope.conversations[i].name == contact.name) {
          foundConversation = true;
          break;
        }
      }

      if (foundConversation) {
        // OPEN THIS CONVERSATION WINDOW
      }
      else {
        $http.post('/api/conversations/', conversation).success(function(conversation) {
          $scope.conversations.push(conversation);
          // OPEN CONVERSATION WINDOW
          console.log('this, ' + conversation)
        });
      }
    }

    $scope.closeConversation = function() {
      // remove conversation from list
      // TODO: remove from database?
      var index = $scope.conversations.indexOf(this.conversation);
      $scope.conversations.splice(index, 1);
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('message');
    });
  });
