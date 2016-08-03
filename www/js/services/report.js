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
            function () {
                console.group('reportService');

                var logPrefix = 'reportService: ';

                this.sync = function () {
                    console.group(logPrefix + 'sync');
                    console.groupEnd('sync');
                };

                this.save = function () {
                    console.group(logPrefix + 'save');
                    console.groupEnd();
                };

                console.groupEnd();

                return this;
            }
        );

}(window, window.angular));
