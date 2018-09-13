(function () {
    var app = angular.module('panelModule');
    app.filter('unitOfMeasure', function (UnitOfMeasureService) {
        return function (uom) {
            return UnitOfMeasureService.getName(uom);
        };
    });
})();