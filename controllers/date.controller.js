(function () {
    var app = angular.module("panelModule");
    app.controller("DateController", DateController);

    function DateController() {
        var self = this;

        self.toLocaleDate = function (year, month, day, hours, minutes, seconds, milliseconds) {
            var date = self.toDate(year, month, day, hrs, mins, secs, millisecs);

            return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        }

        self.toDate = function (year, month, day, hours, minutes, seconds, milliseconds) {
            var hrs = 0;
            var mins = 0;
            var secs = 0;
            var millisecs = 0;
            if (hours >= 0)
                hrs = hours;
            if (minutes >= 0)
                mins = minutes;
            if (seconds >= 0)
                secs = seconds;
            if (milliseconds >= 0)
                millisecs = milliseconds;

            return new Date(year, month, day, hrs, mins, secs, millisecs);
        }

    }
})();