(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('homeController',
            function ($scope, $window, $document, $state, $ionicPopover, $ionicViewSwitcher, reportService) {
                console.group('homeController');
                console.groupEnd();

                $scope.unsubmittedReports = [];
                $scope.debug = debug;

                $scope.popover = $ionicPopover.fromTemplate('unsubmitted-reports.html', {
                    scope: $scope
                });

                $ionicPopover.fromTemplateUrl('unsubmitted-reports.html', {
                    scope: $scope
                }).then(function(popover) {
                    $scope.popover = popover;
                });

                function setWindowWidth () {
                    var navBar = document.getElementById('navBar'),
                        bar = navBar.getElementsByClassName('title')[0],
                        offset = bar.style.height | 43;

                    $scope.windowHeight = $window.innerHeight - offset - 1;
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
                 * Navigate to a new report.
                 */
                $scope.newReport = function () {
                    $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
                    $scope.popover.hide();
                    $state.go('report');
                };

                /**
                 * Navigate to a report with an id.
                 * @param  {Number} id The ID of the report.
                 */
                $scope.loadReport = function (id) {
                    $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
                    $scope.popover.hide();
                    $state.go('report', {
                        id: id
                    });
                };

                /**
                 * [deleteLocalReports description]
                 * @return {[type]} [description]
                 */
                $scope.deleteUnsubmittedReports = function () {
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
