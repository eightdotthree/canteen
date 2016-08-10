(function (window, angular, undefined) {
    'use strict';

    /**
     * @ngdoc service
     * @name report
     *
     * @description
     * Handles the negotiation between the server and the report UI.
     */
    angular.module('canteenreport')
        .service('reportService',
            function ($q, $timeout, localStorageService, reportFactory) {
                console.group('reportService');

                var logPrefix = 'reportService: ';

                function stubHttp (response) {
                    var loadMin = 500;
                    var loadMax = 3000;
                    var deferred = $q.defer();

                    $timeout(function () {
                        deferred.resolve(response);
                    }, loadMin + Math.random() * loadMax);

                    return deferred.promise;
                }

                function getLocalReports () {
                    var reports = localStorageService.get('reports') ? localStorageService.get('reports') : [];
                    return reports;
                }

                function getLocalReport (id) {
                    console.group(logPrefix + 'getLocalReport: ' + id);

                    var localReports = getLocalReports(),
                        localReport,
                        report;

                    angular.forEach(localReports, function (value, key) {
                        if (String(value.id) === String(id)) {
                            localReport = value;
                        }
                    });

                    if (localReport) {
                        report = new reportFactory(localReport);
                    }

                    console.info(report);
                    console.groupEnd();

                    return report;
                }

                function setLocalReport (reportModel) {
                    console.group(logPrefix + 'setLocalReport: ' + reportModel);

                    var reports = getLocalReports(),
                        reportIndex;

                    angular.forEach(reports, function (report, key) {
                        if (report.id === reportModel.id) {
                            reportIndex = key;
                        }
                    });

                    console.info(reportIndex);

                    reports[reportIndex] = reportModel;

                    localStorageService.set('reports', reports);

                    console.groupEnd();
                }

                /**
                 * Gets a list of unsubmitted reports.
                 * @return {Promise}
                 */
                this.getReports = function () {
                    console.group(logPrefix + 'getUnsubmittedReports');

                    var deferred = $q.defer();
                    var reports = getLocalReports();

                    deferred.resolve(reports);

                    console.info(reports);
                    console.groupEnd();

                    return deferred.promise;
                };

                /**
                 * Gets a report by its id.
                 * @param  {Number} id The ID of the report to load.
                 * @return {Promise}
                 */
                this.getReport = function (id) {
                    console.group(logPrefix + 'getReport');
                    console.info('id: ' + id);

                    var report = getLocalReport(id);

                    var deferred = $q.defer();
                    deferred.resolve(report);

                    console.groupEnd();

                    return deferred.promise;
                };

                this.deleteReports = function () {
                    localStorageService.set('reports', []);
                    return [];
                };

                /**
                 * Generates a new report and saves it to localStorage.
                 * @return {Object} A report object.
                 */
                this.newReport = function () {
                    console.group(logPrefix + 'newReport');

                    var report = new reportFactory();
                    console.info(report);

                    var reports = getLocalReports();
                    reports.push(report);

                    localStorageService.set('reports', reports);

                    console.info(localStorageService.get('reports'));

                    console.info('reports: ' + this.reports);
                    console.groupEnd();

                    return report;
                };

                /**
                 * Syncs the report with the server and localStorage
                 * @return {Promise}
                 */
                this.sync = function (reportModel) {
                    console.group(logPrefix + 'sync');
                    console.info(reportModel);

                    var deferred = $q.defer();

                    setLocalReport(reportModel);

                    $timeout(function () {
                        deferred.resolve();
                    }, 1000);

                    console.info(getLocalReports());
                    console.groupEnd();

                    return deferred.promise;
                };

                /**
                 * Submits and finalizes the report.
                 * @return {Promise}
                 */
                this.submit = function (form, reportModel) {
                    console.group(logPrefix + 'save');
                    console.info(form);

                    var deferred = $q.defer();

                    // store the unit number for use on this device
                    localStorageService.set('unitNumber', reportModel.incidentUnitNumber);

                    // temp resolve until i can integrate with the server
                    $timeout(function () {
                        deferred.resolve();
                    }, 1000);

                    return deferred.promise;

                    console.groupEnd();
                };

                /**
                 * Deletes the current report.
                 * @return {Promise}
                 */
                this.delete = function (id) {
                    console.group(logPrefix + 'delete');

                    var deferred = $q.defer();

                    var reports = getLocalReports(),
                        reportIndex;

                    angular.forEach(reports, function (value, key) {
                        if (String(value.id) === String(id)) {
                            reportIndex = key;
                        }
                    });

                    reports.splice(reportIndex, 1);

                    localStorageService.set('reports', reports);

                    $timeout(function () {
                        deferred.resolve();
                    }, 1000);

                    console.groupEnd();

                    return deferred.promise;
                };

                console.groupEnd();

                return this;
            }
        );

}(window, window.angular));
