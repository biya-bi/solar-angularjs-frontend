describe("DailyElectricityController", function () {
    var mockPanelService;
    var dailyElectricityController;

    beforeEach(module("panelModule"));

    beforeEach(inject(function ($controller, PanelService) {
        mockPanelService = PanelService;

        var fakeFn = function () {
            return {
                // We assume that the service method returns a promise that has a then() function.
                then: function () { }
            };
        }

        spyOn(mockPanelService, "getDailyElectricities").and.callFake(fakeFn);

        dailyElectricityController = $controller("DailyElectricityController", { PanelService: mockPanelService });
    }));

    it("should read", function () {
        panel = { uri: "panel_uri", serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };
 
        dailyElectricityController.read(panel);

        expect(mockPanelService.getDailyElectricities).toHaveBeenCalledWith(panel);
    });

});