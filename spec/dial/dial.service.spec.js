(function() {
    'use strict';

    var service;

    describe('The dial directive service', function () {
        beforeEach(function() {
            module('app');

            inject(function(dialservice) {
                service = dialservice;
            });
        });


        it('should exist', function () {
            expect(service).toBeDefined();
        });
    });
})();