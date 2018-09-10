var app = angular.module("panelModule", ['ui.bootstrap', 'ngMaterial', 'ngMessages', 'ngMaterialDatePicker']);
app.constant("PanelRestEndPointSvc", "http://localhost:8080/api/panels");
app.constant("PageSizeSvc", "4");