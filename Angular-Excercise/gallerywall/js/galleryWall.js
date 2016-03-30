var galleryApp = angular.module('galleryApp', []);

galleryApp.directive("galleryWall", function(){
  var template = '<div class="photos">'+
                   '<img win-fn-enter win-hide-err ng-repeat="item in galleryItems" class="photoImg" ng-src="{{item.medium_url}}" />'+
                 '</div>';
  return {
    restrict: 'E',
    template: template,
    scope: {
        photoDataStr: '@galleryData',
    },  
    controller:function($scope){
      $scope.galleryData = eval($scope.photoDataStr);
      $scope.galleryItems = $scope.galleryData.slice(0,60);

      $(window).scroll(function(){
        var topHeight = $("body").height() - window.innerHeight;
        if(topHeight - $(window).scrollTop() < 1000){
          var len = $scope.galleryItems.length;
		  $scope.galleryItems = $scope.galleryItems.concat($scope.galleryData.slice(len, len+15));
          $scope.$apply();
        }
      }.bind(this));
    },
  };
});

galleryApp.directive("winHideErr", function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('error', function(e) {
        e.target.style.display = 'none';
      });
    }
  };
});
galleryApp.directive("winFnEnter", function(){
  var isScrolledIntoView = function(el){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(el).offset().top;
    var elemBottom = elemTop + $(el).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };
  var animateCheck = function(el){
    if(isScrolledIntoView(el)){
      TweenMax.from(el, 1.2, {rotationY:500, scale:0.1, ease:Power1.easeOut});
    }
  };
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      animateCheck(element);
    }
  };
});
