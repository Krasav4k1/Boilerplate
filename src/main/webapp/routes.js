/**
 * Application router
 * Config that holds all possible routes in client-side application
 *
 * @author Andrii Blyzniuk
 */
app
    .config(function ($stateProvider, $urlRouterProvider) {

        //Main provider
        $stateProvider

            //Main abstract State
            .state('app', {
                abstract: true,
                url: "",
                controller: 'HeaderController',
                templateUrl: 'template/header.html'
            })

            //State for root URL
            .state('app.main', {
                url: "/",
                controller: 'ExampleMainController',
                templateUrl: 'template/main.html'
            })

            .state('app.example', {
                abstract: true,
                url: "^/example",
                template: '<ui-view/>'
            })

            .state('app.example.ex', {
                url: "",
                controller: 'ExampleController',
                templateUrl: 'template/example.template.html'
            });


        //Root abstract provider for errors
        $stateProvider
            .state('error', {
                abstract: true,
                url: "/error",
                template: '<ui-view/>'
            })

            //State for 404 error
            .state('error.404', {
                url: "^/404",
                templateUrl: 'template/404.html'
            });

        $urlRouterProvider.otherwise('/404');
    });