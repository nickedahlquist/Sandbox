(function () {
    'use strict';

    angular.module('fm').controller('FmRegisterController', ['$scope', '$http', 'fmConfig', 'FmAuthtokenFactory', function ($scope, $http, fmConfig, FmAuthtokenFactory) {

      $scope.submit = function () {

        var url = fmConfig.node.url + ':' + fmConfig.node.port + '/register';

        var user = {
          name: $scope.name,
          password: $scope.password
        };

        $http.post(url, user).then(onSuccess, onError);

        function onSuccess(res) {
          FmAuthtokenFactory.setToken(res.data.token);
          //deferred.resolve(res);
        }

        function onError(res) {
          //deferred.reject(res);
        }

      };

    }]);

})();
