(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('ReportController',
            function ($scope, $state, $timeout, $ionicPopup, $ionicViewSwitcher) {
                console.group('ReportController');

                $scope.syncing = false;

                /**
                 * Syncs the form with the server.
                 */
                $scope.sync = function () {
                    $scope.syncing = true;

                    $timeout(function () {
                        $scope.syncing = false;
                    }, 1000 + Math.random() * 3);

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

                /**
                 * Saves and closes the report
                 */
                $scope.save = function (form) {
                    console.group('save');
                    console.info(form.$valid);
                    console.groupEnd();
                };

                console.groupEnd();
            }
        );
})(window, window.angular);