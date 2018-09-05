(function () {
    var app = angular.module('panelModule');
    app.directive('alert', function () {
        return {
            restrict: "E",
            template: "<div class='alert {{type}} alert-dismissible' ng-if='message!=null'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "{{message}}" +
                "</div>",
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                message: "=",
                type: "@"
            },
        };
    });
})();