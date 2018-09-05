(function () {
    var app = angular.module("panelModule");

    app.controller("PanelController", PanelController);

    function PanelController(PanelService, PageSizeSvc) {
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
            self.selectedPanel = self.panels[index];
            clearMessages();
        }

        var toggleEditMode = function () {
            self.isInEditMode = !self.isInEditMode;
        }

        function computePages(size) {
            PanelService.getPanelsCount().then(
                function (count) {
                    self.totalItems = count;
                    self.noOfPages = Math.ceil(parseFloat(count) / size);
                },
                function () {
                    self.errorMessage = "An error occurred while computing panel pages.";
                }
            );
        }

        self.read = function (page, size) {
            self.currentPage = page;
            self.pageSize = size;

            computePages(size);

            if (page <= 0)
                page = 1;
            PanelService.getPanels(page - 1, size).then(
                function (panels) {
                    self.panels = panels;
                },
                function () {
                    self.errorMessage = "An error occurred while loading panels.";
                }
            );
        }

        self.read(self.currentPage, PageSizeSvc);

        function onSaveSuccess(dlg) {
            self.successMessage = "Panel saved successfully.";
            if (dlg != null)
                $(dlg).modal('hide');
            self.read(self.currentPage, PageSizeSvc);
        }

        function onSaveFailure(response) {
            switch (response.data.code) {
                case 1001:
                case 1002:
                case 1003:
                case 1004: self.errorMessage = response.data.message;
                    break;
                default: self.errorMessage = "An error occurred while saving the panel.";
                    break;
            }
        }

        self.save = function () {
            clearMessages();

            var dlg = undefined;

            if (self.isInAddMode) {
                PanelService.createPanel(self.selectedPanel).then(function () {
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

        self.beginAdd = function (dlg) {
            clearMessages();
            self.isInAddMode = true;
            self.isInEditMode = false;
            self.selectedPanel = undefined;
            self.addDialog = dlg;
        }

        self.beginEdit = function (index, dlg) {
            self.isInAddMode = false;
            self.isInEditMode = true;
            self.editDialog = dlg;
            self.select(index);
        }

        self.beginDelete = function (index, dlg) {
            self.deleteDialog = dlg;
            self.select(index);
        }

        self.delete = function () {
            toggleEditMode();
            clearMessages();

            PanelService.deletePanel(self.selectedPanel).then(
                function () {
                    self.successMessage = "Panel deleted successfully.";
                    if (self.deleteDialog != null)
                        $(self.deleteDialog).modal('hide');
                    self.read(self.currentPage, PageSizeSvc);;
                },
                function () {
                    self.errorMessage = "An error occurred while deleting the panel.";
                }
            );
        }

    }
})();