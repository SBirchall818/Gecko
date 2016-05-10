(function() {
    'use strict';

    angular.module('app')
        .directive('dial', function($filter, dialservice, $q) {
            var directive = {
                replace: false,
                restrict: 'E',
                templateUrl: 'dial/dial.html',
                link: link
            };

            function link(scope, element, attrs) {
                var decimalPoints = 0;
                var data = {
                    format: 'currency',
                    unit: 'GBP',
                    min: 0,
                    max: 10,
                    value: 5
                };

                dialservice.getData().then(function(response) {
                    data = response.data;
                    setValuesToData(data);
                    setRotation(data);
                }, function (error) {
                    console.log('An ERROR occurred:\n' + error);
                });

                setValuesToData(data);

                // TODO: Break this out into a mappings module
                function getCurrencySymbol(code) {
                    switch (code){
                        case 'GBP':
                            return '£';
                        case 'EUR':
                            return '€';
                        case 'USD':
                            return '$';
                        default:
                            return '$';
                    }
                }

                function setValuesToData(data) {
                    // TODO: tighten up error handling try / catch
                    if (data.format !== undefined) {
                        scope.format = data.format;
                    }

                    if (data.unit !== undefined) {
                        scope.unit = data.unit;
                    }

                    if (data.min !== undefined) {
                        scope.min = $filter(scope.format)(data.min, getCurrencySymbol(scope.unit), decimalPoints);
                    }

                    if (data.max !== undefined) {
                        scope.max = $filter(scope.format)(data.max, getCurrencySymbol(scope.unit), decimalPoints);
                    }

                    if (data.value !== undefined) {
                        scope.value = $filter(scope.format)(data.value, getCurrencySymbol(scope.unit), decimalPoints);
                    }
                }

                function setRotation(data) {
                    var baseRotation = 35;

                    // Checking that min <= value <= max
                    if (data.max <= data.min) {
                        return;
                    }
                    if (data.value > data.max) {
                        return;
                    }
                    if (data.value < data.min) {
                        return;
                    }

                    var fractionOfPi = (data.value - data.min) / (data.max - data.min);
                    var degreesRoundDial = 180 * fractionOfPi;
                    var degrees = degreesRoundDial + baseRotation;

                    var needleElem = element.find('.needlepic');
                    needleElem.css('transform','rotate(' + degrees + 'deg)');
                }
            }

            return directive;
        });
})();