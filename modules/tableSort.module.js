(function () {
    var app = angular.module('tableSort', []);

    app.directive('sortGlyph', function () {
        return {
            restrict: "E",
            template: "<md-icon style='cursor:pointer;' class='material-icons' ng-show='direction==\"asc\" && visible'>arrow_drop_up</md-icon>" +
                "<md-icon style='cursor:pointer;' class='material-icons' ng-show='direction==\"desc\" && visible'>arrow_drop_down</md-icon>",

            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                direction: "=",
                visible: '='
            },
        };
    });

    app.controller("TableSortController", TableSortController);

    function TableSortController() {
        var self = this;

        self.direction = null;
        self.column = null;

        self.init = function (column, direction) {
            self.column = column;
            self.direction = direction;
        }
        
        self.toggle = function (column) {
            // If the column being sorted is not equal to the last one, 
            // we reset the sort direction to null.
            if (column != self.column)
                self.direction = null;
            self.column = column;
            if (self.direction != 'asc')
                self.direction = 'asc';
            else
                self.direction = 'desc';
        }
    }
})();