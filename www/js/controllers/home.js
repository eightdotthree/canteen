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

                angular.element($window).bind('resize', function () {
                    $scope.$apply(function () {
                        setWindowWidth();
                    })
                });

                $scope.unsubmittedReports = [];

                /**
                 * Gets the unsubmitted reports from ReportService.
                 * @return {[type]} [description]
                 */
                $scope.getUnsubmittedReports = function () {
                    $scope.loading = true;

                    reportService.getUnsubmittedReports()
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

                $scope.getUnsubmittedReports();
            }
        );
})(window, window.angular);
