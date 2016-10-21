/**
 * Server Service
 * Service that holds all possible server requests
 *
 * @author Andrii Blyzniuk
 */
app
    .factory('serverService', function ($http, $q) {

        String.prototype.format = String.prototype.formatf = function(){
            var args = arguments;
            return this.replace(/\{(\d+)\}/g, function(m, n){
                return args[n] ? args[n] : m;
            });
        };

        var server = {
            exampleApiGET: '/api/example',
        };

        return {

            exampleMethodGET: function() {
                var deferred = $q.defer();
                $http.get(server.exampleApiGET).then(function (response) {
                    deferred.resolve(response.data)
                });
                return deferred.promise;
            },
    }
    });
