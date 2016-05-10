(function() {
    'use strict';

    angular.module('app')
        .service('dialservice', function($http) {
            var endpoint = 'https://widgister.herokuapp.com/challenge/frontend';

            function getData() {
                return $http({
                    method: 'GET',
                    url: endpoint
                });

                // TODO: Add a .then that verifies the data,
                // e.g. that value actually lies between min and max
                // e.g. all expected data fields are present, I know sometimes the currency info is not given.
            }

            return {
                getData: getData
            };
        });
})();