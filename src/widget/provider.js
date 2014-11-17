/* global moment, gapi, gadgets, config, _ */
/* exported init */

var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Provider = {};

RiseVision.Calendar.Provider = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function get(params, callbacks) {
    var timeMin = moment().hour(0).minute(0).second(0).format(),
      timeMax = moment().hour(0).minute(0).second(0).add(1, "days"),
      request;

    // Filtering
    switch (params.dateRange) {
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
    request = gapi.client.calendar.events.list({
      "calendarId":   params.calendar,
      "singleEvents": true,
      "timeMin":      timeMin,
      "timeMax":      timeMax,
      "orderBy":      "startTime"
    });

    request.then(function(resp) {
      var startTime;

      if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
        timeMin = moment(timeMin);
        timeMax = moment(timeMax);

        // Check to ensure the events fall within the specified date range, as
        // the API is erroneously returning all-day events that fall outside of it.
        resp.result.items = _.filter(resp.result.items, function(item) {
          if (item.start.dateTime) {
            return true;
          }
          // All day event
          else if (item.start.date) {
            startTime = moment(item.start.date);

            // Check that start date falls within the specified date range.
            if (startTime.isSame(timeMin) || (startTime.isBefore(timeMax) &&
              startTime.isAfter(timeMin))) {
              return true;
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
        });

        callbacks.success(resp);
      }
    }, function(reason) {
        if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
          callbacks.error(reason);
        }
      }
    );
  }

  return {
    "getEventsList": get
  };
})();

function init() {
  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  gapi.client.setApiKey(config.apiKey);

  gapi.client.load("calendar", "v3").then(function() {
    gadgets.rpc.register("rsparam_set_" + id, RiseVision.Calendar.getAdditionalParams);
    gadgets.rpc.call("", "rsparam_get", null, id, ["additionalParams"]);
  });
}
