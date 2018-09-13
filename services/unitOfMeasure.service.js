(function () {
    var app = angular.module("panelModule");
    app.service("UnitOfMeasureService", UnitOfMeasureService);

    function UnitOfMeasureService() {
        var self = this;

        var unitsOfMeasureDic = {
            'W': 'Watt',
            'KW': 'Kilowatt'
        };

        self.getName = function (value) {
            return unitsOfMeasureDic[value];
        }

        self.getUnitsOfMeasure = function () {
            var unitsOfMeasure = [];
            for (var key in unitsOfMeasureDic) {
                unitsOfMeasure.push({
                    value: key,
                    name: unitsOfMeasureDic[key]
                });
            }
            return unitsOfMeasure;
        }
    }
})();