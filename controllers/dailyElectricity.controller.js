(function () {
    var app = angular.module("panelModule");

    app.controller("DailyElectricityController", DailyElectricityController);

    function DailyElectricityController(PanelService, $mdToast, ArrayDateService) {
        var self = this;

        self.read = function (panel) {
            self.panel = panel;

            PanelService.getDailyElectricities(panel.dailyUri).then(
                function (dailyElectricities) {
                    self.dailyElectricities = dailyElectricities;
                },
                function () {
                    showToast("An error occurred while loading daily electricities.");
                }
            );
        }

        self.compare = function (obj1, obj2) {
            var v1 = null;
            var v2 = null;

            if (self.sortProperty === 'date') {
                // The date is received by this method as a string of numbers
                // separated by commons. We therefore need to split the string
                // using the comma as the separator. This will convert the string
                // into an array of substrings which can then be passed to the
                // ArrayDateService.toDate method
                v1 = ArrayDateService.toDate(obj1.value.split(','));
                v2 = ArrayDateService.toDate(obj2.value.split(','));
            }
            else {
                v1 = obj1.value;
                v2 = obj2.value;
            }

            if (v1 === v2) return 0;
            if (v1 > v2) return 1;
            return -1;
        }

        self.setSortProperty = function (property) {
            self.sortProperty = property;
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