(function () {
    var app = angular.module("panelModule");
    app.controller("UnitOfMeasureController", UnitOfMeasureController);

    function UnitOfMeasureController(UnitOfMeasureService) {
        var self = this;

        self.unitsOfMeasure = UnitOfMeasureService.getUnitsOfMeasure();
    }
})();