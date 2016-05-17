(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'FmLoginCtrl',
        controllerAs: 'fmLogin',
        templateUrl: 'views/fm-login-view.html',
        resolve: {
          $title: function () {
            return 'Logga in';
          },
        }
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmLoginCtrl', ['fmAuthServiceFactory', FmLoginCtrl]);

  // Constuctor function.
  function FmLoginCtrl(fmAuthServiceFactory) {

    /* jshint validthis: true */
    var vm = this;
    vm.status = fmAuthServiceFactory.getStatus();
    vm.username = '';
    vm.password = '';

    vm.login = function () {
      fmAuthServiceFactory.login({ username: vm.username, password: vm.password}).then(function (data) {
        vm.status = fmAuthServiceFactory.getStatus();
      });
    };

    vm.logout = function () {
      fmAuthServiceFactory.logout();
      vm.status = fmAuthServiceFactory.getStatus();
    };

  }

})();
