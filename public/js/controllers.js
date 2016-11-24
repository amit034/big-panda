angular.module('big.panda.controllers', ['big.panda.services']).
controller('comments', function($scope,CommentService) {
        $scope.comments = [];
        $scope.message = '';
        $scope.email='';
        $scope.addComment = function() {
            const comment = {message: $scope.message, email: $scope.email};
            CommentService.addComment(comment)
            .then(function(){
                $scope.getComments();
            });
        };
        $scope.getComments = function() {
            return CommentService.getComments().then(function (comments) {
                
                $scope.comments = comments;
            });
        };
        $scope.getComments();
});