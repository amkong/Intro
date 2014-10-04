'use strict';

angular.module('introApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/account/contacts/contacts.html',
        controller: 'ContactsModalCtrl'
      });
  });