(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('reportController',
            function ($scope, $state, $timeout, $location, $ionicPopup, $ionicViewSwitcher, $ionicScrollDelegate, reportService, US_STATES) {
                console.group('reportController');

                $scope.titlePrefix = 'New';
                $scope.syncing = false;
                $scope.activeSection = 'incident';
                $scope.states = US_STATES;

                /**
                 * Syncs the form with the server.
                 */
                $scope.sync = function () {
                    console.group('sync');

                    $scope.syncing = true;
                    reportService.sync();

                    $timeout(function () {
                        $scope.syncing = false;
                    }, 1000 + Math.random() * 3);

                    console.groupEnd();
                };

                /**
                 * Closes the current report.
                 */
                $scope.close = function () {
                    console.group('close');

                    var confirm = $ionicPopup.confirm({
                        title: 'Are you sure?',
                        template: 'You will lose progress if you have not synced lately.',
                        okType: 'button-assertive'
                    });

                    confirm.then(function (res) {
                        if (res) {
                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $state.go('index');
                        }
                    })

                    console.groupEnd();
                };

                $scope.goToSection = function (section) {
                    console.group('goTo: ' + section);

                    $location.hash(section);
                    $scope.activeSection = section;

                    switch (section) {
                        case 'incident' :
                            $ionicScrollDelegate.scrollTop(true);
                            break;
                        default :
                            $ionicScrollDelegate.anchorScroll(true);
                    }

                    console.groupEnd();
                };

                /**
                 * Saves and closes the report
                 */
                $scope.save = function (form) {
                    console.group('save');
                    console.info(form);

                    var valid = form.$valid;
                    console.info('valid: ' + valid);

                    if (valid) {
                        reportService.save();
                    }

                    console.groupEnd();
                };

                console.groupEnd();
            }
        );
})(window, window.angular);
