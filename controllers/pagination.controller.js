(function () {
	var app = angular.module('panelModule');

	app.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;
				return input.slice(start);
			}
			return [];
		};
	});

	app.controller('PageController', ['filterFilter', function (filterFilter) {
		var self = this;
		self.items = [];

		// create empty search model (object) to trigger $watch on update
		self.search = {};

		self.resetFilters = function () {
			// needs to be a function or it won't trigger a $watch
			self.search = {};
		};

		// pagination controls, ['paginationModule']
		self.currentPage = 1;
		self.totalItems = self.items.length;
		self.pageSize = 4; // items per page


	}]);
})();