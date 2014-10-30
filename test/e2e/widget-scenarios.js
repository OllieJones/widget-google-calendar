casper.test.begin("Google Calendar Widget - e2e Testing", function (test) {
  var system = require("system");
  var e2ePort = system.env.E2E_PORT || 8099;

  casper.options.waitTimeout = 5000;

  casper.start("http://localhost:"+e2ePort+"/src/widget-e2e.html",
    function () {
      test.assertTitle("Google Calendar Widget", "Test page has loaded");
    }
  );

  casper.waitFor(
    function check() {
      return this.evaluate(function() {
        return document.querySelectorAll(".day").length === 1;
      });
    },
    function then() {
      test.assertExists(".day");
      test.assertElementCount(".day", 1, "Check that there are only events for one day");
      test.assertElementCount(".event", 1, "Check that there is only one event");
    }
  );

  casper.run(function() {
    test.done();
  });
});
