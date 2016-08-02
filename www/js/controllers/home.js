(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('HomeController',
            function ($scope, $window) {
                console.group('HomeController');

                function setWindowWidth () {
                    $scope.windowHeight = $window.innerHeight;
                }

                setWindowWidth();

                angular.element($window).bind('resize', function () {
                    $scope.$apply(function () {
                        setWindowWidth();
                    })
                });
                console.groupEnd();
            }
        );
})(window, window.angular);
