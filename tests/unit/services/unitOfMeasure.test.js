describe("UnitOfMeasureService", function () {
    var unitOfMeasureService;

    beforeEach(module("panelModule"));

    beforeEach(inject(function (UnitOfMeasureService) {
        unitOfMeasureService = UnitOfMeasureService;
    }));

    it("should return the name corresponding to a given key", function () {
        expect(unitOfMeasureService.getName("W")).toBe("Watt");
        expect(unitOfMeasureService.getName("KW")).toBe("Kilowatt");
    });

    it("should return two units of measure", function () {
        var unitsOfMeasure = unitOfMeasureService.getUnitsOfMeasure();

        expect(unitsOfMeasure[0].value).toBe("W");
        expect(unitsOfMeasure[0].name).toBe("Watt");

        expect(unitsOfMeasure[1].value).toBe("KW");
        expect(unitsOfMeasure[1].name).toBe("Kilowatt");
    });
});