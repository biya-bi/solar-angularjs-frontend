describe("PanelService", function () {
    var panelService;
    var endpoint;
    var $httpBackend;
    var panels;
    var hourlyElectricities;
    var dailyElectricities;

    function constructPanelUri(id) {
        return endpoint + "/" + id;
    };

    function constructHourlyElectricityUri(panelId, hourlyElectricityId) {
        return constructPanelUri(panelId) + "/hourly/" + hourlyElectricityId;
    };

    function initializePanels() {
        var panelUri1 = constructPanelUri(1);
        var panelUri2 = constructPanelUri(2);
        var panelUri3 = constructPanelUri(3);

        panels = [
            { "uri": panelUri1, "serial": "100001", "latitude": 50.123456, "longitude": 51.123456, "brand": "Brand1", "unitOfMeasure": "KW", "hourlyUri": panelUri1 + "/hourly", "dailyUri": panelUri1 + "/daily", "hourlyCountUri": panelUri1 + "/hourly/count" },
            { "uri": panelUri2, "serial": "100002", "latitude": 60.574589, "longitude": 61.123456, "brand": "Brand2", "unitOfMeasure": "W", "hourlyUri": panelUri2 + "/hourly", "dailyUri": panelUri2 + "/daily", "hourlyCountUri": panelUri2 + "/hourly/count" },
            { "uri": panelUri3, "serial": "100003", "latitude": 70.123456, "longitude": 71.123456, "brand": "Brand3", "unitOfMeasure": "KW", "hourlyUri": panelUri3 + "/hourly", "dailyUri": panelUri3 + "/daily", "hourlyCountUri": panelUri3 + "/hourly/count" }
        ];
    };

    function initializeHourlyElectricities() {
        hourlyElectricities = [{ "uri": constructHourlyElectricityUri(1, 1), "generatedElectricity": 1500, "readingAt": [2018, 9, 19, 3, 0] }];
    };

    function initializeDailyElectricities() {
        dailyElectricities = [{ "date": [2018, 9, 19], "sum": 1500, "average": 1500.0, "min": 1500, "max": 1500 }];
    }

    beforeEach(module("panelModule"));

    beforeEach(inject(function (PanelService, PANEL_RESTFUL_ENDPOINT, _$httpBackend_) {
        panelService = PanelService;
        endpoint = PANEL_RESTFUL_ENDPOINT;
        $httpBackend = _$httpBackend_;

        initializePanels();

        $httpBackend.whenGET(PANEL_RESTFUL_ENDPOINT + "?page=0&size=3").respond(panels);
        $httpBackend.whenPOST(PANEL_RESTFUL_ENDPOINT).respond(constructPanelUri(1));
        $httpBackend.whenPUT(panels[0].uri).respond("Panel updated");
        $httpBackend.whenDELETE(panels[0].uri).respond("Panel deleted");
        $httpBackend.whenGET(PANEL_RESTFUL_ENDPOINT + "/count").respond("3");

        initializeHourlyElectricities();
        $httpBackend.whenGET(panels[0].hourlyUri).respond(hourlyElectricities);
        $httpBackend.whenGET(panels[0].hourlyCountUri).respond("1");
        $httpBackend.whenPOST(panels[0].hourlyUri).respond(hourlyElectricities[0].uri);
        $httpBackend.whenPUT(hourlyElectricities[0].uri).respond("Hourly electricity updated");
        $httpBackend.whenDELETE(hourlyElectricities[0].uri).respond("Hourly electricity deleted");

        initializeDailyElectricities();
        $httpBackend.whenGET(panels[0].dailyUri).respond(dailyElectricities);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should make an HTTP GET request when getPanels() is called", function () {
        panelService.getPanels(0, 3)
            .then(function (list) {
                expect(list).toBeDefined();
                expect(list.length).toBe(3);
                expect(list[0].uri).toBe(panels[0].uri);
            });
        $httpBackend.flush();
    });

    it("should make an HTTP POST request when createPanel() is called", function () {
        panelService.createPanel({ "serial": "100001", "latitude": 50.123456, "longitude": 51.123456, "brand": "Brand1", "unitOfMeasure": "KW" })
            .then(function (uri) {
                expect(uri).toBe(panels[0].uri);
            });
        $httpBackend.flush();
    });

    it("should make an HTTP PUT request when updatePanel() is called", function () {
        panelService.updatePanel(panels[0]);
        $httpBackend.flush();
    });

    it("should make an HTTP DELETE request when deletePanel() is called", function () {
        panelService.deletePanel(panels[0]);
        $httpBackend.flush();
    });

    it("should make an HTTP GET request when getPanelsCount() is called", function () {
        panelService.getPanelsCount()
            .then(function (count) {
                expect(parseInt(count)).toBe(3);
            });
        $httpBackend.flush();
    });

    it("should make an HTTP GET request when getHourlyElectricities() is called", function () {
        panelService.getHourlyElectricities(panels[0])
            .then(function (list) {
                expect(list).toBeDefined();
                expect(list.length).toBe(1);
                expect(list[0].uri).toBe(hourlyElectricities[0].uri);
            });
        $httpBackend.flush();
    });

    it("should make an HTTP GET request when getHourlyElectricitiesCount() is called", function () {
        panelService.getHourlyElectricitiesCount(panels[0])
            .then(function (count) {
                expect(parseInt(count)).toBe(1);
            });
        $httpBackend.flush();
    });

    it("should make an HTTP POST request when createHourlyElectricity() is called", function () {
        panelService.createHourlyElectricity(panels[0], { "generatedElectricity": 1500, "readingAt": new Date() })
            .then(function (uri) {
                expect(uri).toBe(hourlyElectricities[0].uri);
            });
        $httpBackend.flush();
    });

    it("should make an HTTP PUT request when updateHourlyElectricity() is called", function () {
        panelService.updateHourlyElectricity(hourlyElectricities[0]);
        $httpBackend.flush();
    });

    it("should make an HTTP DELETE request when deleteHourlyElectricity() is called", function () {
        panelService.deleteHourlyElectricity(hourlyElectricities[0]);
        $httpBackend.flush();
    });

    it("should make an HTTP GET request when getDailyElectricities() is called", function () {
        panelService.getDailyElectricities(panels[0])
            .then(function (list) {
                expect(list).toBeDefined();
                expect(list.length).toBe(1);
                expect(list[0].sum).toEqual(1500);
            });
        $httpBackend.flush();
    });
});