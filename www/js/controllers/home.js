(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('homeController',
            function ($scope, $window, reportService) {
                console.group('homeController');
                console.groupEnd();

                function setWindowWidth () {
                    $scope.windowHeight = $window.innerHeight;
                }

                setWindowWidth();

                function init () {
                    console.info('init');
                    $scope.getUnsubmittedReports();
                }

                angular.element($window).bind('resize', function () {
                    $scope.$apply(function () {
                        setWindowWidth();
                    })
                });

                $scope.$on('$locationChangeSuccess', function (event) {
                    console.info(event);
                    init();
                });

                $scope.unsubmittedReports = [];

                $scope.deleteLocalReports = function () {
                    reportService.deleteReports();
                };

                /**
                 * Gets the unsubmitted reports from ReportService.
                 * @return {[type]} [description]
                 */
                $scope.getUnsubmittedReports = function () {
                    $scope.loading = true;

                    reportService.getReports()
                        .then(function (resp) {
                            $scope.loading = false;

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
