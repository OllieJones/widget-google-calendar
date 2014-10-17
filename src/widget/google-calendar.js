/* global gadgets, moment, gapi */

var RiseVision = RiseVision || {};
RiseVision.Calendar = {};

RiseVision.Calendar = (function (gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs();
  var dateRange;

  /*
   *  Private Methods
   */
  function bind(resp) {
    $.each(resp.result.items, function(index, value) {
      // TODO: Show the events.
    });
  }

  function ready() {
    gadgets.rpc.call("", "rsevent_ready", null, prefs.getString("id"), true,
      true, true, true, true);
  }

  function done() {
    gadgets.rpc.call("", "rsevent_done", null, prefs.getString("id"));
  }

  /*
   *  Public Methods
   */
  function getAdditionalParams(name, value) {
    if (name === "additionalParams" && value) {
      var params = JSON.parse(value);
      var calendarId = params.calendar;
      var timeMin = moment().hour(0).minute(0).format();
      var timeMax = moment().hour(23).minute(59);

      dateRange = params.dateRange;

      // Filtering
      switch (dateRange) {
        case "day":
          timeMax = timeMax.format();
          break;
        case "week":
          timeMax = timeMax.add(6, "days").format();
          break;
        case "month":
          timeMax = timeMax.add(1, "months").format();
          break;
        case "6months":
          timeMax = timeMax.add(6, "months").format();
          break;
        case "12months":
          timeMax = timeMax.add(12, "months").format();
          break;
        default:
          timeMax = timeMax.format();
      }

      // Get events on the specified calendar.
      var request = gapi.client.calendar.events.list({
        "calendarId": calendarId,
        "timeMin": timeMin,
        "timeMax": timeMax
      });

      request.then(function(resp) {
        bind(resp);
        ready();
      }, function(reason) {
        console.log("Error: " + reason.result.error.message);
        ready();
      });
    }
  }

  function play() {

  }

  function pause() {

  }

  return {
    getAdditionalParams: getAdditionalParams,
    play               : play,
    pause              : pause
  };
})(gadgets);
