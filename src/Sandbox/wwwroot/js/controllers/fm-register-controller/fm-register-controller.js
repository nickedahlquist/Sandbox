(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('register', {
        url: '/register',
        controller: 'FmRegisterCtrl',
        controllerAs: 'fmRegister',
        templateUrl: 'views/fm-register-view.html',
        resolve: {
          $title: function () {
            return 'Skapa Konto';
          },
        }
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmRegisterCtrl', ['$http', 'fmConfig', 'fmAuthtokenFactory', FmRegisterCtrl]);

  // Constuctor function.
  function FmRegisterCtrl($http, fmConfig, fmAuthtokenFactory) {

    /* jshint validthis: true */
    var vm = this;

    vm.submit = function () {

      var url = fmConfig.node.url + ':' + fmConfig.node.port + '/register';

      var user = {
        name: vm.name,
        password: vm.password
      };

      $http.post(url, user).then(onSuccess, onError);

      function onSuccess(res) {
        fmAuthtokenFactory.setToken(res.data.token);
        //deferred.resolve(res);
      }

      function onError(res) {
        console.log(res);
      }

    };

  }

})();

//# sourceMappingURL=fm-register-controller.js.map
