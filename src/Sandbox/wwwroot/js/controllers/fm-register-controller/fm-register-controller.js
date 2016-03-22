(function () {
    'use strict';

    angular.module('fm').controller('FmRegisterController', ['$scope', '$http', 'fmConfig', 'fmAuthtokenFactory', function ($scope, $http, fmConfig, FmAuthtokenFactory) {

      $scope.submit = function () {

        var url = fmConfig.node.url + ':' + fmConfig.node.port + '/register';

        var user = {
          name: $scope.name,
          password: $scope.password
        };

        $http.post(url, user).then(onSuccess, onError);

        function onSuccess(res) {
          fmAuthtokenFactory.setToken(res.data.token);
          //deferred.resolve(res);
        }

        function onError(res) {
          //deferred.reject(res);
        }

      };

    }]);

})();

//# sourceMappingURL=fm-register-controller.js.map
