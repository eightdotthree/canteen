describe('homeController', function () {
    var scope,
        stateMock,
        ionicViewSwitcherMock,
        reportServiceMock,
        httpBackend;

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

        var deferred = $q.defer();

        var getReportsDeferred = $q.defer();
        getReportsDeferred.resolve([{ id: 666 }]);

        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        ionicViewSwitcherMock = jasmine.createSpyObj('$ionicViewSwitcher spy', ['nextDirection']);

        reportServiceMock = {
            deleteReports: jasmine.createSpy('deleteReports spy').and.returnValue([]),
            getReports: jasmine.createSpy('getReports spy').and.returnValue(getReportsDeferred.promise)
        };

        $controller('homeController', {
            $scope: scope,
            $state: stateMock,
            $ionicViewSwitcher: ionicViewSwitcherMock,
            reportService: reportServiceMock
        });
    }));

    describe('newReport', function () {
        beforeEach(function () {
            scope.newReport();
        });

        it('should call $ionicViewSwitcher.nextDirection', function () {
            expect(ionicViewSwitcherMock.nextDirection).toHaveBeenCalledWith('forward');
        });

        it('should call $state.go', function () {
            expect(stateMock.go).toHaveBeenCalledWith('report');
        });
    });

    describe('loadReport', function () {
        beforeEach(function () {
            scope.loadReport(666);
        });

        it('should call $ionicViewSwitcher.nextDirection', function () {
            expect(ionicViewSwitcherMock.nextDirection).toHaveBeenCalledWith('forward');
        });

        it('should call $state.go', function () {
            expect(stateMock.go).toHaveBeenCalledWith('report', { id: 666 });
        });
    });

    describe('deleteUnsubmittedReports', function () {
        beforeEach(function () {
            scope.deleteUnsubmittedReports();
        });

        it('should call deleteReports', function () {
            expect(reportServiceMock.deleteReports).toHaveBeenCalled();
        });

        it('should reset the unsubmittedReports array', function () {
            expect(scope.unsubmittedReports).toEqual([]);
        });
    });

    describe('getUnsubmittedReports', function () {
        beforeEach(function () {
            scope.getUnsubmittedReports();
            scope.$digest();
        });

        it('should call getReports', function () {
            expect(reportServiceMock.getReports).toHaveBeenCalled();
        });

        it('should set the unsubmittedReports array', function () {
            expect(scope.unsubmittedReports.length).toEqual(1);
        });
    });
});