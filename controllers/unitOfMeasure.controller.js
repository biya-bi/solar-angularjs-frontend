(function () {
    var app = angular.module("panelModule");
    app.controller("UnitOfMeasureController", UnitOfMeasureController);

    function UnitOfMeasureController() {
        var self = this;

        self.getName = function (value) {
            if (value == 'W') return 'Watt';
            else if (value == 'KW') return 'Kilowatt';
            return undefined;
        }

        self.unitsOfMeasure =
            [
                {
                    value: 'W',
                    name: 'Watt'
                },
                {
                    value: 'KW',
                    name: 'Kilowatt'
                }
            ];
    }
})();