'use strict';

angular.module('press').directive('scrollPosition', function($window) {
  return {
    link: function(scope, element, attrs) {
      var windowEl = angular.element($window);
      var handler = function() {
        scope.scrolled = windowEl.scrollTop() > 150;
      };
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
});