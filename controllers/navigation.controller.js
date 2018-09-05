(function () {
    var app = angular.module("panelModule");
    app.controller("NavigationController", NavigationController);

    function NavigationController() {
        var self = this;
        self.currentView = "panels";
        self.expanded = false;

        self.isSelected = function (view) {
            return self.currentView == view;
        }

        self.select = function (view) {
            self.currentView = view;
        }

        self.toggle = function () {
            self.expanded = !self.expanded;
            if (self.expanded) {
                $("#mySidenav").css("width", "20%");
                $("#myMain").css("margin-left", "20%");
            } else {
                $("#mySidenav").css("width", "0");
                $("#myMain").css("margin-left", "0");
            }
        }

        self.toggle();
    }
})();