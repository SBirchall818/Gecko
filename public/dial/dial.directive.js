angular.module('app', [])
    .directive('dial', function() {
        return {
            replace: false,
            restrict: 'EA',
            templateUrl: 'dial/dial.html'
        };
    });