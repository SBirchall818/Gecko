describe('dial directive', function() {
    var compile, scope, templateCache, directiveElem, template;

    beforeEach(function() {
        module('app');

        inject(function ($templateCache, $compile, $rootScope) {
            templateCache = $templateCache;

            template = __html__['public/dial/dial.html'];   // How the file is referenced in the project root.
            templateCache.put('dial/dial.html', template);  // How the file is referenced in the js file contraining the directive

            compile = $compile;
            scope = $rootScope.$new();
        });

        directiveElem = getCompiledElement();
    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<dial></dial>'))(scope);
        scope.$digest();
        return compiledDirective;
    }

    it('should pass', function () {
        expect(true).toEqual(true);
    });

    it('contain the sample dial text', function() {
        var findh1 = directiveElem.find('h1');
        expect(findh1.text()).toEqual('Sample Widget');
    });
    
    it('should have min max and value on the scope', function() {
        expect(scope.min).toBeDefined();
        expect(scope.max).toBeDefined();
        expect(scope.value).toBeDefined();
    });
});