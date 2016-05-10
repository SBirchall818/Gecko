(function() {
    'use strict';

    angular.module('app', [])
        .directive('dial', function($filter) {
            var directive = {
                replace: false,
                restrict: 'E',
                templateUrl: 'dial/dial.html',
                link: link
            };

            function link(scope, element, attrs) {
                var decimalPoints = 0;

                scope.format = 'currency';
                scope.unit = 'GBP';
                scope.min = $filter(scope.format)(0, getCurrencySymbol(scope.unit), decimalPoints);
                scope.max = $filter(scope.format)(10, getCurrencySymbol(scope.unit), decimalPoints);
                scope.value = $filter(scope.format)(5, getCurrencySymbol(scope.unit), decimalPoints);

                // TODO: Break this out into a mappings module
                function getCurrencySymbol(code) {
                    switch (code){
                        case 'GBP':
                            return '£';
                        default:
                            return '$';
                    }
                }
            }

            return directive;
        });
})();