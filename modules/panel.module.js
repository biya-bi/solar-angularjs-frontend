var app = angular.module("panelModule", ['ui.bootstrap', 'ngMaterial', 'ngMessages', 'ngMaterialDatePicker', 'tableSort']);
app.constant("PanelRestEndPointSvc", "http://localhost:8080/api/panels");
app.constant("PageSizeSvc", "4");