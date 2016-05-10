angular.module('app', [])
    .directive('dial', function() {
        var directive = {
            replace: false,
            restrict: 'E',
            templateUrl: 'dial/dial.html',
            link: link
        };

        function link(scope, element, attrs) {
            scope.min = 0;
            scope.max = 10;
            scope.value = 5;
            scope.format = 'currency';
            scope.unit = 'GBP';
        }

        return directive;
    });