describe("ExampleControllerSpec", function () {
    var $scope,
        httpBackend,
        rootScope,
        projectObj = {a: "a"}
        $controller;

    beforeEach(function () {
        module("APP");
        inject(function ($httpBackend, _$controller_, $injector) {
            httpBackend = $httpBackend;

            httpBackend.whenGET('template/404.html').respond(200);

            rootScope = $injector.get('$rootScope');

            $scope = {};
            $controller = _$controller_('ExampleController', {$scope: $scope});
            httpBackend.flush();
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('Test function save project and called $broadcast in function $scope.answer()', function () {
        httpBackend.expect('GET', '/api/example').respond(200, projectObj);
        $scope.exampleMethod().then(function(answer){
            // start
            // logic
            // end
        });
        httpBackend.flush()
    });

});
