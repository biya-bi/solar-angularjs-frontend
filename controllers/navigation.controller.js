(function () {
    var app = angular.module('panelModule');
    app.controller('NavigationController', NavigationController);

    function NavigationController($mdSidenav) {
        var self = this;

        self.currentView = "panels";
     
        self.isSelected = function (view) {
            return self.currentView == view;
        }

        self.select = function (view) {
            self.currentView = view;
        }

        self.init = function (sideNavId, contentId) {
            self.sideNavId = sideNavId;
            self.contentId = contentId;
        }

        self.toggleLeft = buildLeftToggler();

        function buildLeftToggler() {
            return function () {
                var sideNav = $mdSidenav(self.sideNavId);
                sideNav.toggle();

                var nav = $("#" + self.sideNavId);
                var width = nav.width() + nav.offset().left;

                var content = $("#" + self.contentId);
                var contentLeftOffset = content.offset().left;

                var margin;
                if (sideNav.isOpen())
                    margin = contentLeftOffset + width;
                else
                    margin = contentLeftOffset - width;

                content.css("margin-left", margin);

            };
        }
    }
})();