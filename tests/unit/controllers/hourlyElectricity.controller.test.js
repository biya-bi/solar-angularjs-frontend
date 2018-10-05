describe("HourlyElectricityController", function () {
    var mockPanelService;
    var hourlyElectricityController;

    beforeEach(module("panelModule"));

    beforeEach(inject(function ($controller, PanelService) {
        mockPanelService = PanelService;

        var fakeFn = function () {
            return {
                // We assume that the service method returns a promise that has a then() function.
                then: function () { }
            };
        }

        spyOn(mockPanelService, "getHourlyElectricities").and.callFake(fakeFn);
        spyOn(mockPanelService, "createHourlyElectricity").and.callFake(fakeFn);
        spyOn(mockPanelService, "updateHourlyElectricity").and.callFake(fakeFn);
        spyOn(mockPanelService, "deleteHourlyElectricity").and.callFake(fakeFn);
        spyOn(mockPanelService, "getHourlyElectricitiesCount").and.callFake(fakeFn);

        hourlyElectricityController = $controller("HourlyElectricityController", { PanelService: mockPanelService });
    }));

    it("should read", function () {
        panel = { uri: "panel_uri", serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };
        pageIndex = 0;
        pageSize = 10;
        hourlyElectricityController.read(panel, pageIndex, pageSize);

        expect(mockPanelService.getHourlyElectricities).toHaveBeenCalledWith(panel, pageIndex, pageSize);
    });

    it("should create", function () {
        panel = { serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };
        hourlyElectricity = { generatedElectricity: 1500, readingAt: new Date() };

        hourlyElectricityController.isInAddMode = true;
        hourlyElectricityController.save(panel, hourlyElectricity);

        expect(mockPanelService.createHourlyElectricity).toHaveBeenCalledWith(panel, hourlyElectricity);
    });

    it("should update", function () {
        panel = { uri: "panel_uri", serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };
        hourlyElectricity = { uri: "hourlyElectricity_uri", generatedElectricity: 1500, readingAt: new Date() };

        hourlyElectricityController.isInEditMode = true;
        hourlyElectricityController.save(panel, hourlyElectricity);

        expect(mockPanelService.updateHourlyElectricity).toHaveBeenCalledWith(hourlyElectricity);
    });


    it("should delete", function () {
        panel = { uri: "panel_uri", serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };
        hourlyElectricity = { uri: "hourlyElectricity_uri", generatedElectricity: 1500, readingAt: new Date() };

        hourlyElectricityController.isInDeleteMode = true;
        hourlyElectricityController.save(panel, hourlyElectricity);

        expect(mockPanelService.deleteHourlyElectricity).toHaveBeenCalledWith(hourlyElectricity);
    });
});