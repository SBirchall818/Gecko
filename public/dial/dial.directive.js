(function() {
    'use strict';

    angular.module('app')
        .directive('dial', function($filter, dialservice, $q) {
            var directive = {
                replace: false,
                restrict: 'E',
                templateUrl: 'dial/dial.html',
                link: link,
                scope: {}
            };

            function link(scope, element, attrs) {
                var decimalPoints = 0;
                var initialData = {
                    format: 'currency',
                    unit: 'GBP',
                    min: 0,
                    max: 10,
                    value: 5
                };

                // Initialize
                setValuesToData(initialData);
                retrieveData();

                // Public functions
                scope.refresh = function() {
                    retrieveData();
                };

                // Private functions
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

                function retrieveData() {
                    dialservice.getData().then(function(response) {
                        setValuesToData(response.data);
                        setRotation(response.data);
                    }, function (error) {
                        console.log('An ERROR occurred:\n' + error);
                    });
                }

                function setRotation(data) {
                    var baseRotation = 35;

                    // Checking that min <= value, value <= max and min < max
                    if (data.max <= data.min) {
                        // Note that this check prevents divide by zero error.
                        setDegrees(0 + baseRotation);
                        return;
                    }
                    if (data.value > data.max) {
                        setDegrees(180 + baseRotation);
                        return;
                    }
                    if (data.value < data.min) {
                        setDegrees(0 + baseRotation);
                        return;
                    }

                    var fractionOfPi = (data.value - data.min) / (data.max - data.min);
                    var degreesRoundDial = 180 * fractionOfPi;
                    var degrees = degreesRoundDial + baseRotation;
                    setDegrees(degrees);

                    function setDegrees(degrees) {
                        var needleElem = element.find('.needlepic');
                        needleElem.css('transform','rotate(' + degrees + 'deg)');
                    }
                }
            }

            return directive;
        });
})();