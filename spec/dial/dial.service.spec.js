(function() {
    'use strict';

    var service;
    var httpBackend;
    var q;
    var endpoint = 'https://widgister.herokuapp.com/challenge/frontend';
    var sampleResponse = {"value":34,"min":0,"max":200,"format":"currency","unit":"GBP"};

    describe('The dial directive service', function () {
        beforeEach(function() {
            module('app');

            inject(function(dialservice, $httpBackend, $q) {
                httpBackend = $httpBackend;
                service = dialservice;
                q = $q;
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should exist', function () {
            expect(service).toBeDefined();
        });

        it('should call out for data', function() {
            httpBackend.expect('GET', endpoint)
                .respond(200, sampleResponse);

            service.getData().then(function(response) {
                expect(response.data).toEqual(sampleResponse);
            }, function(error) {
                fail('Unwanted code branch');
            });

            httpBackend.flush();

        });
    });
})();