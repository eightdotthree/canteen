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
            function ($q, $timeout) {
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

                /**
                 * Gets a report by its id.
                 * @param  {Number} id The ID of the report to load.
                 * @return {Promise}
                 */
                this.getReport = function (id) {
                    console.group(logPrefix + 'getReport');
                    console.info('id: ' + id);

                    var stubReports = {
                        id: id,
                        date: new Date(),
                        unitNumber: '1234'
                    };

                    console.groupEnd();

                    return stubHttp(stubReports);
                };

                /**
                 * Gets a list of unsubmitted reports.
                 * @return {Promise}
                 */
                this.getUnsubmittedReports = function () {
                    console.group(logPrefix + 'getUnsubmittedReports');

                    var stubReports = [
                        {
                            id: 1,
                            date: new Date()
                        }
                    ];

                    console.groupEnd();
                    return stubHttp(stubReports);
                };

                /**
                 * Syncs the report with the server and localStorage
                 * @return {Promise}
                 */
                this.sync = function () {
                    console.group(logPrefix + 'sync');
                    console.groupEnd();
                    return stubHttp();
                };

                /**
                 * Submits and finalizes the report.
                 * @return {Promise}
                 */
                this.save = function () {
                    console.group(logPrefix + 'save');
                    console.groupEnd();
                    return stubHttp();
                };

                /**
                 * Deletes the current report.
                 * @return {Promise}
                 */
                this.delete = function () {
                    console.group(logPrefix + 'delete');
                    console.groupEnd();
                    return stubHttp();
                };

                console.groupEnd();

                return this;
            }
        );

}(window, window.angular));
