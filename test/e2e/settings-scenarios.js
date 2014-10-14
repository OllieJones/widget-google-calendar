/* jshint expr: true */

(function () {
  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Google Spreadsheet Settings - e2e Testing", function() {
    beforeEach(function () {
      browser.get("/src/settings-e2e.html");
    });

    it("Should load all components", function () {
      // scroll setting component
      expect(element(by.id("scroll-by")).isPresent()).
        to.eventually.be.true;

    });

    it("Should correctly load default settings", function () {
      //scroll disabled
      expect(element(by.id("scroll-by")).getAttribute("value")).
        to.eventually.equal("none");

      expect(element(by.id("dateRange")).getAttribute("value")).
        to.eventually.equal("week");

    });

    it("Should show invalid form", function () {
      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).
        to.eventually.be.true;

      expect(element(by.css("form[name=settingsForm].ng-valid")).isPresent()).
        to.eventually.be.false;

      expect(element(by.css(".text-danger")).isDisplayed()).
        to.eventually.be.true;

      // save button should be disabled
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).
        to.eventually.be.true;
    });

    xit("Should correctly save settings", function (done) {

    });

  });

})();
