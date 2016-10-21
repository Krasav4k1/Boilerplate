/**
 * Example Controller
 * @author Andriu Blyzniuk
 *
 */
app.controller('ExampleController', function ($scope, exampleService) {

    $scope.exampleObject = null;

    $scope.exampleMethod = function () {
        exampleService.exampleMethod($scope.exampleObject).then(function (answer) {
                $scope.answer = answer;
        })
    }

});