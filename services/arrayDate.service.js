(function () {
    var app = angular.module("panelModule");
    app.service("ArrayDateService", ArrayDateService);

    function ArrayDateService() {
        var self = this;

        function converToLocaleDate(date) {
            if (date == null) return null;
            return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        }

        self.toDate = function (arr) {
            if (arr == null)
                return null;

            var year = null;
            var month = null;
            var day = null;
            var hours = null;
            var minutes = null;
            var seconds = null;
            var milliseconds = null;

            if (arr.length >= 1) {
                year = arr[0];
            }
            if (arr.length >= 2) {
                month = arr[1];
            }
            if (arr.length >= 3) {
                day = arr[2];
            }
            if (arr.length >= 4) {
                hours = arr[3];
            }
            if (arr.length >= 5) {
                minutes = arr[4];
            }
            if (arr.length >= 6) {
                seconds = arr[5];
            }
            if (arr.length >= 7) {
                milliseconds = arr[6];
            }

            if (year != null && month != null && day != null)
                return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
            return null;
        }

        self.toLocaleDate = function (arr) {
            return converToLocaleDate(self.toDate(arr));
        }
    }
})();