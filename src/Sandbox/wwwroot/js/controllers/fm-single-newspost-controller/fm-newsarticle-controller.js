(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('article', {
        url: '/news/article/{id:[1-9]{1}[0-9]*}',
        controller: 'FmNewsArticleCtrl',
        controllerAs: 'fmNewsArticle',
        templateUrl: 'views/fm-newsarticle-view.html',
        resolve: {
          $title: function () {
            return 'Nyhetsartikel';
          },
          articleData: function (fmNewsService, $stateParams) {
            return fmNewsService.getNews($stateParams.id);
          }
        }
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmNewsArticleCtrl', ['$stateParams', '$sanitize', 'articleData', 'fmUtilityFunctions', FmNewsArticleCtrl]);

  // Define controller-function.
  function FmNewsArticleCtrl($stateParams, $sanitize, articleData, fmUtilityFunctions) {

    /* jshint validthis: true */
    var vm = this;
    var utils = fmUtilityFunctions;

    vm.article = articleData;
    vm.article.SignatureExcerpt = $sanitize(vm.article.Signature.split('<br/>')[0]);
    vm.article.NewsText = $sanitize(vm.article.NewsText);
    
  }

})();

//# sourceMappingURL=fm-newsarticle-controller.js.map
