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
        .factory('reportFactory',
            function (localStorageService, US_STATES) {
                var reportFactory = function (reportObj) {
                    var date = new Date(),
                        report = reportObj || {};

                    /**
                     * Finds a state by its abbreviation.
                     * @param  {String} abbr The state abbreviation you are looking for.
                     * @return {Object}      The state object from the US_STATES constant.
                     */
                    function findStateByAbbr (abbr) {
                        var state;

                        angular.forEach(US_STATES, function (value, index) {
                            if (value.abbr === abbr) {
                                state = value;
                            }
                        });

                        return state;
                    }

                    // create or ammend the report
                    if (reportObj) {
                        // if a reportObj was given, fix the dates
                        report.incidentStart = new Date(reportObj.incidentStart);
                        report.incidentInroute = new Date(reportObj.incidentInroute);
                        report.incidentOnscene = new Date(reportObj.incidentOnscene);
                    } else {
                        // if no reportObj was given, create a new report
                        report.id = date.getUTCMilliseconds();
                        report.incidentUnitNumber = localStorageService.get('unitNumber');
                        report.incidentStart = date;
                        report.incidentInroute = date;
                        report.incidentState = findStateByAbbr('PA');
                        report.teamMembers = [];
                        report.servicesCounseling = [{
                            administrator: '',
                            individual: '',
                            reason: '',
                            phoneNumber: ''
                        }];
                    }

                    return report;
                }

                return reportFactory;
            }
        );

}(window, window.angular));
