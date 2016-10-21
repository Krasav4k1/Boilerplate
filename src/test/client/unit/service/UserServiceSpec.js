describe('ExampleServiceSpec', function () {
    var httpBackend,
        $injector,
        exampleService,
        object = {
            id: 1,
        },
        file = new File([""], "testFile");

    beforeEach(function () {
        module("ERP");
        inject(function ($httpBackend, _$injector_) {
            httpBackend = $httpBackend;
            $injector = _$injector_;
            exampleService = $injector.get( 'exampleService' );

            httpBackend.whenGET('template/404.html').respond(200);

            httpBackend.flush();
        });
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("example testing method in service", function () {
        httpBackend.expect('GET', '/api/example').respond(200, object);
        exampleService.exampleMethod().then(function (answer) {
            // start
            // logic
            // end
        });
        expect(httpBackend.flush).not.toThrow();
    });




});