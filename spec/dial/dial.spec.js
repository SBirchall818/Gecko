(function() {
    'use strict';

    describe('dial directive', function() {
        var compile;
        var templateCache;
        var directiveElem;
        var template;
        var filter;
        var scope;

        var endpoint = 'https://widgister.herokuapp.com/challenge/frontend';
        var sampleResponse = {value:34, min:0, max:200, format:'currency', unit:'GBP'};
        var mockGetDataPromise;

        beforeEach(function() {
            module('app', function($provide) {
                $provide.service('dialservice', function($q) {
                    var mock = {getData: function() {}};
                    
                    mock.getData = spyOn(mock, 'getData').and.callFake(function() {
                        mockGetDataPromise = $q.defer();
                        return mockGetDataPromise.promise;
                    });
                    
                    return mock;
                });                
            });

            inject(function ($templateCache, $compile, $rootScope, $filter) {
                templateCache = $templateCache;

                template = __html__['public/dial/dial.html'];   // How the file is referenced in the project root.
                templateCache.put('dial/dial.html', template);  // How the file is referenced in the js file contraining the directive

                compile = $compile;
                scope = $rootScope.$new();

                filter = $filter;
            });

            directiveElem = getCompiledElement();
        });

        function getCompiledElement() {
            var compiledDirective = compile(angular.element('<dial></dial>'))(scope);
            scope.$digest();
            return compiledDirective;
        }

        describe('before getData provides server data', function() {
            it('should pass', function () {
                expect(true).toEqual(true);
            });

            it('should have min, max and value on the scope', function() {
                expect(scope.min).toBeDefined();
                expect(scope.max).toBeDefined();
                expect(scope.value).toBeDefined();
            });

            it('should display the min, max and value', function() {

                var queryResult = directiveElem[0].querySelector('#value');
                var wrappedQueryResult = angular.element(queryResult);

                expect(wrappedQueryResult.text()).toEqual(scope.value.toString());

                queryResult = directiveElem[0].querySelector('#min');
                wrappedQueryResult = angular.element(queryResult);

                expect(wrappedQueryResult.text()).toEqual(scope.min.toString());

                queryResult = directiveElem[0].querySelector('#max');
                wrappedQueryResult = angular.element(queryResult);

                expect(wrappedQueryResult.text()).toEqual(scope.max.toString());
            });

            it('should have the display information available on scope', function() {
                expect(scope.format).toBeDefined();
                expect(scope.unit).toBeDefined();
            });

            it('should apply display filter', function() {
                // TODO
                // Currentyly this test does not add much value because all it is
                // doing is checking if the $filter function can work in two places (which it can)
                // This test should be re-written when data is injeted to ensure display is correct
                var sym = '£';
                var decimalPoints = 0;
                var filterType = 'currency';
                scope.min = filter(filterType)(0, sym, decimalPoints);
                scope.max = filter(filterType)(10, sym, decimalPoints);
                scope.value = filter(filterType)(5, sym, decimalPoints);

                var queryResult = directiveElem[0].querySelector('#value');
                var wrappedQueryResult = angular.element(queryResult);

                expect(wrappedQueryResult.text()).toEqual('£5');

                queryResult = directiveElem[0].querySelector('#min');
                wrappedQueryResult = angular.element(queryResult);

                expect(wrappedQueryResult.text()).toEqual('£0');

                queryResult = directiveElem[0].querySelector('#max');
                wrappedQueryResult = angular.element(queryResult);

                expect(wrappedQueryResult.text()).toEqual('£10');
            });
        });

        describe('after getData', function() {
            // TODO: Test with different sets of returned data (euros etc.)

            it('should call dial service for data', function() {
                mockGetDataPromise.resolve({data:sampleResponse});
                scope.$digest();

                expect(scope.value).toEqual('£34');
                expect(scope.min).toEqual('£0');
                expect(scope.max).toEqual('£200');
            });
        });
    });
})();