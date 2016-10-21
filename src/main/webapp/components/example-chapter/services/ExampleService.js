/**
 * Example Service
 *
 * @author Andriu Blyzniuk
 */
app
    .factory('exampleService', function ($q, serverService) {

        return{
            exampleMethod: function(value){
                var deferred = $q.defer();
                serverService.exampleMethodGET(value).then(function(response){
                    deferred.resolve(response);
                });
                return deferred.promise;
            }
        }
    });