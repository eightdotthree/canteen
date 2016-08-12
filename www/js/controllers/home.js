(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('homeController',
            function ($scope, $window, $state, $ionicPopover, $ionicViewSwitcher, reportService) {
                console.group('homeController');
                console.groupEnd();

                $scope.unsubmittedReports = [];

                $scope.popover = $ionicPopover.fromTemplate('unsubmitted-reports.html', {
                    scope: $scope
                });

                $ionicPopover.fromTemplateUrl('unsubmitted-reports.html', {
                    scope: $scope
                }).then(function(popover) {
                    $scope.popover = popover;
                });

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

                /**
                 * [newReport description]
                 * @return {[type]} [description]
                 */
                $scope.newReport = function () {
                    $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
                    $scope.popover.hide();
                    $state.go('report');
                };

                /**
                 * [loadReport description]
                 * @param  {[type]} id [description]
                 * @return {[type]}    [description]
                 */
                $scope.loadReport = function (id) {
                    $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
                    $scope.popover.hide();
                    $state.go('report', { id: id });
                };

                /**
                 * [deleteLocalReports description]
                 * @return {[type]} [description]
                 */
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

                /**
                 * [showUnsubmittedReports description]
                 * @param  {[type]} $event [description]
                 * @return {[type]}        [description]
                 */
                $scope.showUnsubmittedReports = function ($event) {
                    $scope.popover.show($event);
                };

                init();
            }
        );
})(window, window.angular);
