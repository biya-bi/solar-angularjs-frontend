describe("PanelController", function () {
    var mockPanelService;
    var panelController;

    beforeEach(module("panelModule"));

    beforeEach(inject(function ($controller, PanelService) {
        mockPanelService = PanelService;

        var fakeFn = function () {
            return {
                // We assume that the service method returns a promise that has a then() function.
                then: function () { }
            };
        }

        spyOn(mockPanelService, "getPanels").and.callFake(fakeFn);
        spyOn(mockPanelService, "createPanel").and.callFake(fakeFn);
        spyOn(mockPanelService, "updatePanel").and.callFake(fakeFn);
        spyOn(mockPanelService, "deletePanel").and.callFake(fakeFn);

        panelController = $controller("PanelController", { PanelService: mockPanelService });
    }));

    it("should read", function () {
        // Whenever the page loads, the controller should call its read() method, 
        // and this in turn should call the getPanels() method of the service.
        expect(mockPanelService.getPanels).toHaveBeenCalled();
    });

    it("should create", function () {
        panel = { serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };

        panelController.isInAddMode = true;
        panelController.save(panel);

        expect(mockPanelService.createPanel).toHaveBeenCalledWith(panel);
    });

    it("should update", function () {
        panel = { uri: "panel_uri", serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };

        panelController.isInEditMode = true;
        panelController.save(panel);

        expect(mockPanelService.updatePanel).toHaveBeenCalledWith(panel);
    });


    it("should delete", function () {
        panel = { uri: "panel_uri", serial: "12345", latitude: 90.123456, longitude: 90.123456, brand: "TestBrand", unitOfMeasure: "KW" };

        panelController.isInDeleteMode = true;
        panelController.save(panel);

        expect(mockPanelService.deletePanel).toHaveBeenCalledWith(panel);
    });
});