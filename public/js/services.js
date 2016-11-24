angular.module('big.panda.services', []).
    factory('CommentService', function($http,$q) {
    const comments = [];
    return {
          getComments : function() {
              var deferred = $q.defer();
              $http.get('/comments')
              .success(function (data) {
                  deferred.resolve(data);
              });
              return deferred.promise;
          },
          addComment: function(comment){
              var deferred = $q.defer();
              $http.post('/comments',comment)
              .success(function () {
                deferred.resolve();
              });
              return deferred.promise;
          }
      };
});