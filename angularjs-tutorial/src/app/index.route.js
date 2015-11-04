(function() {
  'use strict';

  angular
    .module('angularjsTutorial')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
    .state('User',{
        url: '/User',
        templateUrl: 'app/workshop/User-view.html',
        controller: 'UserController',
        controllerAs: 'userCtrl'})
    .state('Student',{
        url: '/Student',
        templateUrl: 'app/workshop/Student-view.html',
        controller: 'StudentController',
        controllerAs: 'studentCtrl'})
    .state('PlayList',{
        url: '/PlayList',
        templateUrl: 'app/workshop/PlayList-view.html',
        controller: 'PlayListController',
        controllerAs: 'playlistCtrl'})
    .state('Contact',{
        url: '/Contact',
        templateUrl: 'app/workshop/Contact-view.html',
        controller: 'ContactController',
        controllerAs: 'contactCtrl'})
    .state('AddContact',{
        url: '/AddContact',
        templateUrl: 'app/workshop/AddContact-view.html',
        controller: 'AddContactController',
        controllerAs: 'addContactCtrl'})
    .state('ThemePicker',{
        url: '/ThemePicker',
        templateUrl: 'app/HomeworkAssignments/UIThemePicker-view.html',
        controller: 'ThemePickerController',
        controllerAs: 'thempickerCtrl'});

    $urlRouterProvider.otherwise('/');
  }

})();
