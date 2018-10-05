describe("ArrayDateService", function () {
    var arrayDateService;

    beforeEach(module("panelModule"));

    beforeEach(inject(function (ArrayDateService) {
        arrayDateService = ArrayDateService;
    }));

    it("should convert an array of integers to a date", function () {
        var now = new Date();

        var date = arrayDateService.toDate([now.getFullYear(), now.getMonth(), now.getDate(),
        now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()]);

        expect(date.getFullYear()).toBe(now.getFullYear());
        // We assume that the months passed in the array are in the range [1, 12].
        // This means 1 represents January, and 12 represents December.
        // This implies that the arrayDateService.toDate method will have the responsibility
        // to decrement the month value so that it matches how JavaScript deals with months.
        expect(date.getMonth() + 1).toBe(now.getMonth());
        expect(date.getDate()).toBe(now.getDate());
        expect(date.getDate()).toBe(now.getDate());
        expect(date.getHours()).toBe(now.getHours());
        expect(date.getMinutes()).toBe(now.getMinutes());
        expect(date.getSeconds()).toBe(now.getSeconds());
        expect(date.getMilliseconds()).toBe(now.getMilliseconds());
    });

});