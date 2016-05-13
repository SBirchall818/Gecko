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
                expect(scope.$$childHead.min).toBeDefined();
                expect(scope.$$childHead.max).toBeDefined();
                expect(scope.$$childHead.value).toBeDefined();
            });

            it('should have the display information available on scope', function() {
                expect(scope.$$childHead.format).toBeDefined();
                expect(scope.$$childHead.unit).toBeDefined();
            });
        });

        describe('after getData', function() {
            // TODO: Test with different sets of returned data (euros etc.)

            it('should call dial service for data', function() {
                mockGetDataPromise.resolve({data:sampleResponse});
                scope.$digest();

                expect(scope.$$childHead.value).toEqual('£34');
                expect(scope.$$childHead.min).toEqual('£0');
                expect(scope.$$childHead.max).toEqual('£200');
            });
        });
    });
})();