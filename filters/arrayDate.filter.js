(function () {
    var app = angular.module('panelModule');
    app.filter('toDate', function (ArrayDateService) {
        return function (arr) {
            return ArrayDateService.toDate(arr);
        };
    });
    app.filter('toLocaleDate', function (ArrayDateService) {
        return function (arr) {
            return ArrayDateService.toLocaleDate(arr);
        };
    });
})();