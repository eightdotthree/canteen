describe('reportController', function () {
    var scope,
        deferred,
        stateMock,
        ionicViewSwitcherMock,
        reportObj,
        reportServiceMock,
        httpBackend,
        formObj;

    beforeEach(function () {
        module('canteenreport');
    });

    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () {} );
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(inject(function($injector, $rootScope, $controller, $q) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('unsubmitted-reports.html').respond(200, '');

        scope = $rootScope.$new();

        deferred = $q.defer();

        var getReportsDeferred = $q.defer();
        getReportsDeferred.resolve([{ id: 666 }]);

        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        ionicViewSwitcherMock = jasmine.createSpyObj('$ionicViewSwitcher spy', ['nextDirection']);

        reportObj = {
            id: 123,
            incidentUnitNumber: 321,
            incidentStart: 'Sun Aug 14 2016 15:15:32 GMT-0400 (EDT)',
            incidentInroute: 'Sun Aug 14 2016 15:15:32 GMT-0400 (EDT)',
            incidentState: {
                abbr: 'PA'
            },
            teamMembers: [],
            servicesCounseling: [{
                administrator: '',
                individual: '',
                reason: '',
                phoneNumber: ''
            }]
        };

        reportModel = {

        };

        formObj = {
            $valid: true
        };

        reportServiceMock = {
            newReport: jasmine.createSpy('newReport spy').and.returnValue(reportObj),
            sync: jasmine.createSpy('newReport spy').and.returnValue(deferred.promise),
            submit: jasmine.createSpy('submit spy').and.returnValue(deferred.promise),
            deleteReports: jasmine.createSpy('deleteReports spy').and.returnValue([]),
            getReports: jasmine.createSpy('getReports spy').and.returnValue(getReportsDeferred.promise)
        };

        $controller('reportController', {
            $scope: scope,
            $state: stateMock,
            $ionicViewSwitcher: ionicViewSwitcherMock,
            reportService: reportServiceMock
        });
    }));

    describe('goToSection', function () {
        beforeEach(function () {
            scope.goToSection('test');
        });

        it('should set activeSection to given parameter value', function () {
            expect(scope.activeSection).toBe('test');
        });
    });

    describe('addTeamMember', function () {
        beforeEach(function () {
            scope.addTeamMember();
        });

        it('should add an empty item to the teamMembers array', function () {
            expect(scope.reportModel.teamMembers.length).toBe(1);
        });
    });

    describe('addCounseling', function () {
        beforeEach(function () {
            scope.addCounseling();
        });

        it('should add an item to the servicesCounseling array', function () {
            expect(scope.reportModel.servicesCounseling.length).toBe(2);
        });
    });

    describe('close', function () {
        beforeEach(function () {
            scope.close();
        });

        it('should display a confirmation', function () {

        });
    });

    describe('sync', function () {
        beforeEach(function () {
            scope.sync();
        });

        it('should set syncing to true', function () {
            expect(scope.syncing).toBe(true);
        });

        it('should call reportService.sync', function () {
            expect(reportServiceMock.sync).toHaveBeenCalled();
        });

        it('should set syncing back to false', function () {
            deferred.resolve();
            scope.$apply();

            expect(scope.syncing).toBe(false);
        });
    });

    describe('submit', function () {
        beforeEach(function () {
            scope.submit(formObj);
        });

        it('should call $ionicLoading.show', function () {

        });

        it('should call reportService.submit if the form is valid', function () {

        });

        it('should call $ionicLoading.hide', function () {

        });
    });

    describe('delete', function () {
        beforeEach(function () {
            scope.delete();
        });

        it('should call $ionicPopup.confirm', function () {

        });

        describe('if confirmed', function () {
            it('should call $ionicLoading.show if confirmed', function () {

            });

            it('should call reportService.delete', function () {

            });

            it('should call $ionicLoading.hide after reportService.delete promise is resolved', function () {

            });

            it('should call goBack after reportService.delete promise is resolved', function () {

            });
        });
    });
});