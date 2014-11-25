var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var totalEvents = 10;

casper.test.begin("Google Calendar Widget - e2e Testing", function (test) {
  casper.options.waitTimeout = 5000;

  casper.start("http://localhost:"+e2ePort+"/src/widget-e2e.html",
    function () {
      test.assertTitle("Google Calendar Widget", "Test page has loaded");
    }
  );

  casper.waitFor(
    function check() {
      return this.evaluate(function() {
        return document.querySelectorAll(".day").length === 6;
      });
    },
    function then() {
      casper.then(function() {
        var singleStartTime, singleEndTime;

        this.evaluate(function() {
          singleStartTime = moment().hour(6).minute(30).second(0).format();
          singleEndTime = moment().hour(7).minute(30).second(0).format();
        })

        var date = this.evaluate(function() {
          return moment(singleStartTime).format("D/M/YYYY");
        });

        var singleTime = this.evaluate(function() {
          return moment(singleStartTime).format("h:mma") + " - " + moment(singleEndTime).format("h:mma");
        });

        test.assertElementCount(".day", 6, "There are 6 days");
        test.assertElementCount(".event", totalEvents, "There are " + totalEvents + " events");
        test.assertSelectorHasText(".day:nth-child(1) .date", date, "Date is correct");

        casper.test.comment("Single event");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .time", singleTime, "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .summary", "Secure welcomes Raytheon", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .location", "Gymnasium", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(3) .description", "Gen. Johnson Col. Smith Mr. John Adams Mrs. Susan Johnson", "Description is correct");

        casper.test.comment("Single Day Event (All Day)");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .summary", "Single Day Event (All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .location", "Conference Room B", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(2) .description", "This occurs all day today.", "Description is correct");

        casper.test.comment("Multi-Day Event (All Day)");
        casper.test.comment("Today");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .summary", "Multi-Day Event (All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .location", "Everywhere", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(1) .description", "This occurs all day today and tomorrow.", "Description is correct");

        casper.test.comment("Tomorrow");

        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .summary", "Multi-Day Event (All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .location", "Everywhere", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(1) .description", "This occurs all day today and tomorrow.", "Description is correct");

        casper.test.comment("Multi-Day Event (not All Day)");
        casper.test.comment("Today");

        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .summary", "Multi-Day Event (not All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .location", "Here", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(1) .event:nth-child(4) .description", "This occurs today and tomorrow from 10 to 11.", "Description is correct");

        casper.test.comment("Tomorrow");

        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .time", "", "Time is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .summary", "Multi-Day Event (not All Day)", "Summary is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .location", "Here", "Location is correct");
        test.assertSelectorHasText(".day:nth-child(2) .event:nth-child(2) .description", "This occurs today and tomorrow from 10 to 11.", "Description is correct");
      });
    }
  );

  casper.run(function() {
    test.done();
  });
});
