(function () {
    var app = angular.module("panelModule");

    app.controller("PanelController", PanelController);

    function PanelController(PanelService, PAGE_SIZE, $mdDialog, $mdToast, UnitOfMeasureService) {
        var self = this;

        self.pageSize = PAGE_SIZE;
        self.currentPage = 1; 

        function select(index) {
            self.selectedPanel = self.panels[index];
        }

        function computePages(size) {
            PanelService.getPanelsCount().then(
                function (count) {
                    self.totalItems = count;
                    self.noOfPages = Math.ceil(parseFloat(count) / size);
                },
                function () {
                    showToast("An error occurred while computing panel pages.");
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
                    showToast("An error occurred while loading panels.");
                }
            );
        }

        self.read(self.currentPage, PAGE_SIZE);

        self.save = function (panel) {
            if (self.isInAddMode) {
                PanelService.createPanel(panel).then(function () {
                    onSaveSuccess("Panel saved successfully.");
                    self.isInAddMode = false;
                }, function (response) {
                    onSaveFailure(response, "An error occurred while saving the panel.");
                });
            }
            else if (self.isInEditMode) {
                PanelService.updatePanel(panel).then(function () {
                    onSaveSuccess("Panel saved successfully.");
                    self.isInEditMode = false;
                }, function (response) {
                    onSaveFailure(response, "An error occurred while saving the panel.");
                });
            }
            else if (self.isInDeleteMode) {
                PanelService.deletePanel(panel).then(function () {
                    onSaveSuccess("Panel deleted successfully.");
                    self.isInDeleteMode = false;
                }, function (response) {
                    onSaveFailure(response, "An error occurred while deleting the panel.");
                });
            }
        }

        function DialogController($mdDialog, mode, process, panel) {
            let self = this;

            self.mode = mode;
            self.process = process;
            self.panel = panel;

            self.hide = function () {
                $mdDialog.hide();
            };

            self.cancel = function () {
                $mdDialog.cancel();
            };
        }

        function getDialogOptions(event, mode, process, templateUrl, panel) {
            return {
                preserveScope: true,
                locals: { mode: mode, process: process, panel: panel },
                controllerAs: 'panelCtrl',
                controller: DialogController,
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
            };
        }

        self.add = function (event) {
            self.isInAddMode = true;
            self.isInEditMode = false;
            self.isInDeleteMode = false;

            $mdDialog.show(getDialogOptions(event, 'add', self.save, '/views/panel/add_edit.html'));
        }

        self.edit = function (index, event) {
            self.isInAddMode = false;
            self.isInEditMode = true;
            self.isInDeleteMode = false;
            select(index);

            $mdDialog.show(getDialogOptions(event, 'edit', self.save, '/views/panel/add_edit.html', self.selectedPanel));
        }

        self.delete = function (index, event) {
            self.isInAddMode = false;
            self.isInEditMode = false;
            self.isInDeleteMode = true;
            select(index);
            $mdDialog.show(getDialogOptions(event, 'delete', self.save, '/views/panel/delete.html', self.selectedPanel));
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
            self.read(self.currentPage, PAGE_SIZE);
        }

        function onSaveFailure(response, message) {
            var msg;
            switch (response.data.code) {
                case 1001:
                case 1002:
                case 1003:
                case 1004: msg = response.data.message;
                    break;
                default: msg = message;
                    break;
            }
            showToast(msg);
        }

        self.compare = function (obj1, obj2) {
            var v1 = null;
            var v2 = null;

            if (self.sortProperty === 'unitOfMeasure') {
                v1 = UnitOfMeasureService.getName(obj1.value);
                v2 = UnitOfMeasureService.getName(obj2.value);
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
})();