angular.module("risevision.widget.googleCalendar.settings")
  .controller("calendarSettingsController", ["$scope",
    function (/*$scope*/) {

    }])
  .value("defaultSettings", {
    params: {},
    additionalParams: {
      calendar: "",
      scroll: {},
      dateRange: "week", // default
      dateFont: {},
      timeFont: {
        type: "standard",
        font: "Verdana",
        family: "Verdana, Geneva, sans-serif"
      },
      timeFormat: "12hour" // default
    }
  });
