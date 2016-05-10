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
            }

            return {
                getData: getData
            };
        });
})();