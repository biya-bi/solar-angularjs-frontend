(function () {
    var app = angular.module("panelModule");

    app.controller("HourlyElectricityController", HourlyElectricityController);

    function HourlyElectricityController(PanelService, PageSizeSvc) {
        var self = this;
        self.isInAddMode = false;
        self.isInEditMode = false;

        self.addDialog = undefined;
        self.editDialog = undefined;
        self.deleteDialog = undefined;

        self.pageSize = PageSizeSvc;
        self.currentPage = 1;

        var clearMessages = function () {
            self.successMessage = undefined;
            self.errorMessage = undefined;
        }

        self.select = function (index) {
            self.selectedHourlyElectricity = self.hourlyElectricities[index];
            clearMessages();
        }

        var toggleEditMode = function () {
            self.isInEditMode = !self.isInEditMode;
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

        self.canAdd = function () {
            return self.panel != null;
        }

        self.beginAdd = function (dlg) {
            clearMessages();
            self.isInAddMode = true;
            self.isInEditMode = false;
            self.selectedHourlyElectricity = undefined;
            self.addDialog = dlg;
        }

        self.save = function () {
            clearMessages();

            var dlg = undefined;

            if (self.isInAddMode) {
                PanelService.createHourlyElectricity(self.panel, self.selectedHourlyElectricity).then(function () {
                    onSaveSuccess(self.addDialog);
                    self.isInAddMode = false;
                }, onSaveFailure)
            }
            else {
                PanelService.updatePanel(self.selectedPanel).then(function () {
                    onSaveSuccess(self.editDialog);
                    self.isInEditMode = false;
                }, onSaveFailure);
            }
        }

        function onSaveSuccess(dlg) {
            self.successMessage = "Hourly electricity saved successfully.";
            if (dlg != null)
                $(dlg).modal('hide');
            self.read(self.panel, self.currentPage, PageSizeSvc);
        }

        function onSaveFailure(response) {
            switch (response.data.code) {
                case 2001:
                case 2002: self.errorMessage = response.data.message;
                    break;
                default: self.errorMessage = "An error occurred while saving the hourly electricity.";
                    break;
            }
        }
    }
})();