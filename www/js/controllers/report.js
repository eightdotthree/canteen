(function (window, angular, undefined) {
    'use strict';

    /**
     */
    angular.module('canteenreport')
        .controller('reportController',
            function ($scope, $state, $stateParams, $timeout, $location, $ionicPopup, $ionicViewSwitcher, $ionicScrollDelegate, $ionicLoading, reportService, US_STATES) {
                console.group('reportController');
                console.info($stateParams);

                function init () {
                    if ($scope.id) {
                        getReport();
                    } else {
                        newReport();
                    }
                }

                function goBack () {
                    $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                    $state.go('index');
                }

                /**
                 */
                function getReport () {
                    console.group('getReport');

                    $ionicLoading.show({
                        template: 'Loading report...'
                    });

                    reportService.getReport($scope.id)
                        .then(function (resp) {
                            console.info('loaded report');
                            console.info(resp);

                            $ionicLoading.hide();
                            $scope.reportModel = resp;
                        })
                        .catch(function (resp) {
                            console.info('catch');
                            $ionicLoading.hide();
                        })
                        .finally(function () {
                            console.groupEnd();
                        });
                }

                /**
                 *
                 */
                function newReport () {
                    console.group('newReport');

                    $scope.reportModel = reportService.newReport();

                    console.groupEnd();
                }

                $scope.id = $stateParams.id;

                $scope.titlePrefix = 'New';
                $scope.syncing = false;
                $scope.activeSection = 'incident';
                $scope.states = US_STATES;

                /**
                 * Adds an empty team member
                 */
                $scope.addTeamMember = function () {
                    $scope.reportModel.teamMembers.push('');
                };

                /**
                 * Adds more counseling
                 */
                $scope.addCounseling = function () {
                    $scope.reportModel.servicesCounseling.push({
                        administrator: '',
                        individual: '',
                        reason: '',
                        phoneNumber: ''
                    });
                };

                /**
                 * Closes the current report.
                 */
                $scope.close = function () {
                    console.group('close');

                    $scope.sync();

                    var confirm = $ionicPopup.confirm({
                        title: 'Are you sure?',
                        template: 'Your data will be available until you delete or submit your report.',
                        okType: 'button-assertive'
                    });

                    confirm.then(function (res) {
                        if (res) {
                            goBack();
                        }
                    });

                    console.groupEnd();
                };

                /**
                 * Navigates to a provided anchor on the form.
                 * @param  {String} section The ID of the anchor.
                 */
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
                 * Syncs the form with the server.
                 */
                $scope.sync = function () {
                    console.group('sync');

                    $scope.syncing = true;

                    reportService.sync($scope.reportModel)
                        .then(function (resp) {
                            console.info('synced');
                            $scope.syncing = false;
                        })
                        .catch(function (resp) {
                        })
                        .finally(function () {
                            console.groupEnd();
                        });
                };

                /**
                 * Saves and closes the report
                 */
                $scope.submit = function (form) {
                    console.group('save');
                    console.info(form);

                    var valid = form.$valid;
                    console.info('valid: ' + valid);

                    if (valid) {
                        $ionicLoading.show({
                            template: 'Sending your report'
                        });

                        reportService.submit(form, $scope.reportModel)
                            .then(function (resp) {
                                console.info('saved');

                                $ionicLoading.hide();
                                $scope.saving = false;
                            })
                            .catch(function (resp) {
                                console.info('catch');
                                $ionicLoading.hide();
                            })
                            .finally(function () {
                                console.groupEnd();
                            });
                    }
                };

                /**
                 * Deletes the open form.
                 */
                $scope.delete = function () {
                    console.group('close');

                    var confirm = $ionicPopup.confirm({
                        title: 'Are you sure?',
                        template: 'You will lose all progress and your data will be removed from the device.',
                        okType: 'button-assertive'
                    });

                    confirm.then(function (res) {
                        if (res) {
                            $ionicLoading.show({
                                template: 'Deleting report...'
                            });

                            reportService.deleteReport($scope.reportModel.id)
                                .then(function (resp) {
                                    console.info('deleted');

                                    $ionicLoading.hide();
                                    goBack();
                                })
                                .catch(function (resp) {
                                    console.info('catch');
                                    $ionicLoading.hide();
                                })
                                .finally(function () {
                                    console.groupEnd();
                                });
                        }
                    });
                };

                init();

                console.groupEnd();
            }
        );
})(window, window.angular);
