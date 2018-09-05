(function () {
    var app = angular.module("panelModule");
    app.controller('DatepickerController', DatepickerController);

    function DatepickerController() {
        var self = this;

        self.today = function () {
            self.dt = new Date();
        };
        self.today();

        self.clear = function () {
            self.dt = null;
        };

        self.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        self.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(1970, 1, 1),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        self.toggleMin = function () {
            self.inlineOptions.minDate = self.inlineOptions.minDate ? null : new Date();
            self.dateOptions.minDate = self.inlineOptions.minDate;
        };

        self.toggleMin();

        self.open = function () {
            self.popup.opened = true;
        };

        self.setDate = function (year, month, day) {
            self.dt = new Date(year, month, day);
        };

        self.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        self.format = self.formats[0];
        self.altInputFormats = ['M!/d!/yyyy'];

        self.popup = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        self.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < self.events.length; i++) {
                    var currentDay = new Date(self.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return self.events[i].status;
                    }
                }
            }

            return '';
        }
    }
})();