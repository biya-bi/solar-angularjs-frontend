(function () {
    var app = angular.module("panelModule");

    app.controller("DailyElectricityController", DailyElectricityController);

    function DailyElectricityController(PanelService, $mdToast) {
        var self = this;
 
        self.read = function (panel) {
            self.panel = panel;
  
            PanelService.getDailyElectricities(panel.dailyUri).then(
                function (dailyElectricities) {
                    self.dailyElectricities = dailyElectricities;
                },
                function () {
                    showToast( "An error occurred while loading daily electricities.");
                }
            );
        }
    }

    function showToast(message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(10000)
                .position("top right")
        );
    }

})();