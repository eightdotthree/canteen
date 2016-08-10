(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('homeController',
            function ($scope, $window, reportService) {
                console.group('homeController');
                console.groupEnd();

                $scope.unsubmittedReports = [];

                function setWindowWidth () {
                    $scope.windowHeight = $window.innerHeight;
                }

                function init () {
                    setWindowWidth();
                    $scope.getUnsubmittedReports();
                }

                angular.element($window).bind('resize', function () {
                    $scope.$apply(function () {
                        setWindowWidth();
                    })
                });

                $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl, newState, oldState) {
                    if (newUrl.indexOf('/report/') === -1) {
                        $scope.getUnsubmittedReports();
                    }
                });

                $scope.deleteLocalReports = function () {
                    $scope.unsubmittedReports = reportService.deleteReports();
                };

                /**
                 * Gets the unsubmitted reports from ReportService.
                 * @return {[type]} [description]
                 */
                $scope.getUnsubmittedReports = function () {
                    reportService.getReports()
                        .then(function (resp) {
                            if (resp) {
                                $scope.unsubmittedReports = resp;
                            }
                        })
                        .catch(function (resp) {
                        })
                        .finally(function () {
                        });
                };

                init();
            }
        );
})(window, window.angular);
