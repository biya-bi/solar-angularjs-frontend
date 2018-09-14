(function () {
    var app = angular.module("panelModule");

    app.service("PanelService", PanelService);

    function PanelService($http, PANEL_RESTFUL_ENDPOINT, ArrayDateService) {

        this.getPanels = function (page, size) {
            var uri = PANEL_RESTFUL_ENDPOINT;
            if (page != null && size != null)
                uri = uri + "?page=" + page + "&size=" + size;
            return $http.get(uri).then(
                function (response) {
                    return response.data;
                }
            );
        }

        this.createPanel = function (panel) {
            return $http.post(PANEL_RESTFUL_ENDPOINT, panel)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        this.updatePanel = function (panel) {
            return $http.put(panel.uri, panel)
                .then(function (response) { console.log(response); });
        }


        this.deletePanel = function (panel) {
            return $http.delete(panel.uri)
                .then(function (response) { console.log(response); });
        }

        this.getPanelsCount = function () {
            return $http.get(PANEL_RESTFUL_ENDPOINT + "/count").then(
                function (response) {
                    return response.data;
                }
            );
        }

        this.getHourlyElectricities = function (hourlyUri, page, size) {
            var uri = hourlyUri;
            if (page != null && size != null)
                uri = uri + "?page=" + page + "&size=" + size;
            return $http.get(uri).then(
                function (response) {
                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        data[i].readingAt = ArrayDateService.toLocaleDate(data[i].readingAt);
                    }
                    return data;
                }
            );
        }

        this.getHourlyElectricitiesCount = function (panel) {
            return $http.get(panel.hourlyCountUri).then(
                function (response) {
                    return response.data;
                }
            );
        }

        this.createHourlyElectricity = function (panel, hourlyElectricity) {
            return $http.post(panel.hourlyUri, hourlyElectricity)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        this.updateHourlyElectricity = function (hourlyElectricity) {
            return $http.put(hourlyElectricity.uri, hourlyElectricity)
                .then(function (response) { console.log(response); });
        }

        this.deleteHourlyElectricity = function (hourlyElectricity) {
            return $http.delete(hourlyElectricity.uri)
                .then(function (response) { console.log(response); });
        }

        this.getDailyElectricities = function (dailyUri) {
            return $http.get(dailyUri).then(
                function (response) {
                    return response.data;
                }
            );
        }
    }
})();