(function () {
    var app = angular.module("panelModule");

    app.controller("DailyElectricityController", DailyElectricityController);

    function DailyElectricityController(PanelService) {
        var self = this;
 
        self.read = function (panel) {
            self.panel = panel;
  
            PanelService.getDailyElectricities(panel.dailyUri).then(
                function (dailyElectricities) {
                    self.dailyElectricities = dailyElectricities;
                },
                function () {
                    self.errorMessage = "An error occurred while loading daily electricities.";
                }
            );
        }
    }
})();