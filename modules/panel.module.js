var app = angular.module("panelModule", ['ui.bootstrap', 'ngMaterial', 'ngMessages', 'ngMaterialDatePicker', 'tableSort']);
app.constant("PANEL_RESTFUL_ENDPOINT", "http://localhost:8080/api/panels");
app.constant("PAGE_SIZE", "4");