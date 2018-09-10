(function () {
    var app = angular.module("panelModule");

    app.controller("HourlyElectricityController", HourlyElectricityController);

    function HourlyElectricityController(PanelService, PageSizeSvc, $mdDialog, $mdToast) {
        var self = this;
        self.isInAddMode = false;
        self.isInEditMode = false;

        self.pageSize = PageSizeSvc;
        self.currentPage = 1;

        function select(index) {
            self.selectedHourlyElectricity = self.hourlyElectricities[index];
        }

        function computePages(size) {
            PanelService.getHourlyElectricitiesCount(self.panel.hourlyUri).then(
                function (count) {
                    self.totalItems = count;
                    self.noOfPages = Math.ceil(parseFloat(count) / size);
                },
                function () {
                    self.errorMessage = "An error occurred while computing hourly electricity pages.";
                }
            );
        }

        self.read = function (panel, page, size) {
            self.panel = panel;
            self.currentPage = page;
            self.pageSize = size;

            computePages(size);

            if (page <= 0)
                page = 1;
            PanelService.getHourlyElectricities(panel.hourlyUri, page - 1, size).then(
                function (hourlyElectricities) {
                    self.hourlyElectricities = hourlyElectricities;
                },
                function () {
                    self.errorMessage = "An error occurred while loading hourly electricities.";
                }
            );
        }

        self.save = function (panel, hourlyElectricity) {
            self.panel = panel;
            if (self.isInAddMode) {
                PanelService.createHourlyElectricity(panel, hourlyElectricity).then(function () {
                    onSaveSuccess("Hourly Electricity saved successfully.");
                    self.isInAddMode = false;
                }, function (response) {
                    onSaveFailure(response, "An error occurred while saving the hourly electricity.");
                });
            }
            else if (self.isInEditMode) {
                PanelService.updateHourlyElectricity(panel, hourlyElectricity).then(function () {
                    onSaveSuccess("Hourly Electricity saved successfully.");
                    self.isInEditMode = false;
                }, function (response) {
                    onSaveFailure(response, "An error occurred while saving the hourly electricity.");
                });
            }
            else if (self.isInDeleteMode) {
                PanelService.deleteHourlyElectricity(panel, hourlyElectricity).then(function () {
                    onSaveSuccess("Hourly Electricity deleted successfully.");
                    self.isInDeleteMode = false;
                }, function (response) {
                    onSaveFailure(response, "An error occurred while deleting the hourly electricity.");
                });
            }
        }

        function DialogController($mdDialog, mode, process, panel, hourlyElectricity) {
            let self = this;

            self.mode = mode;
            self.process = process;
            self.panel = panel;
            self.hourlyElectricity = hourlyElectricity;

            self.hide = function () {
                $mdDialog.hide();
            };

            self.cancel = function () {
                $mdDialog.cancel();
            };
        }

        function getDialogOptions(evt, mode, process, templateUrl, panel, hourlyElectricity) {
            return {
                preserveScope: true,
                locals: { mode: mode, process: process, panel: panel, hourlyElectricity: hourlyElectricity },
                controllerAs: 'hourlyElectricityCtrl',
                controller: DialogController,
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: evt,
                clickOutsideToClose: true,
            };
        }

        self.add = function (panel, event) {
            self.isInAddMode = true;
            self.isInEditMode = false;
            self.isInDeleteMode = false;
            self.panel = panel;

            $mdDialog.show(getDialogOptions(event, 'add', self.save, '/views/hourly_electricity/add_edit.html', self.panel));
        }

        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .hideDelay(10000)
                    .position("top right")
            );
        }

        function onSaveSuccess(message) {
            showToast(message);
            $mdDialog.hide();
            self.read(self.panel, self.currentPage, PageSizeSvc);
        }

        function onSaveFailure(response, message) {
            var msg;
            switch (response.data.code) {
                case 2001:
                case 2002: msg = response.data.message;
                    break;
                default: msg = message;
                    break;
            }
            showToast(msg);
        }
                
        self.canAdd = function () {
            return self.panel != null;
        }
    }
})();