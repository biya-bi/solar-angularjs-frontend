describe("UnitOfMeasureController", function () {
    var mockUnitOfMeasureService;

    beforeEach(module("panelModule"));

    beforeEach(inject(function ($controller, UnitOfMeasureService) {
        mockUnitOfMeasureService = UnitOfMeasureService;

        spyOn(mockUnitOfMeasureService, "getUnitsOfMeasure").and.returnValue([]);

        $controller("UnitOfMeasureController", { UnitOfMeasureService: mockUnitOfMeasureService });
    }));

    it("should get units of measure", function () {
        // We expect the units of measure to be obtained from the service during the instantiation
        // of this controller.
        expect(mockUnitOfMeasureService.getUnitsOfMeasure).toHaveBeenCalled();
    });

});