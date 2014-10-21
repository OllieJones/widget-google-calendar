/* global gadgets, moment, gapi */

var RiseVision = RiseVision || {};
RiseVision.Calendar = {};

RiseVision.Calendar = (function (gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs(),
    params;

  /*
   *  Private Methods
   */
  function addEvents(resp) {
    var i,
      length,
      lastDay,
      currentDay,
      currentEvents,
      calendarDay,
      calendarDays = [],
      events = resp.result.items;

    if (events.length > 0) {
      lastDay = moment(events[events.length - 1].start.dateTime);

      // Process all events that fall on or before lastDay.
      while (events.length > 0) {
        currentDay = moment(events[0].start.dateTime);

        // Get all events for the current day.
        currentEvents = _.filter(events, function(event) {
           return moment(event.start.dateTime).isSame(currentDay, "day");
        });

        if (currentEvents.length > 0) {
          // Create RiseVision.Calendar.Day object and set events for it.
          calendarDay = new RiseVision.Calendar.Day(params);
          calendarDay.setEvents(currentEvents);
          calendarDays.push(calendarDay);

          // Remove all events for the current day from the remaining events.
          events = _.filter(events, function(event) {
            return !moment(event.start.dateTime).isSame(currentDay, "day");
          });
        }
        else {
          // This should never happen, but exit loop just in case.
          break;
        }
      }
    }

    // Clone the UI for each day less one.
    for (i = 1, length = calendarDays.length; i < length; i++) {
      $(".day:first").clone().appendTo(".days");
    }

    // Add events for each day.
    for (i = 0, length = calendarDays.length; i < length; i++) {
      calendarDays[i].addDay(params, i);
    }

    $("#container").autoScroll(params.scroll)
    .on("done", function() {
      done();
    });

    ready();
  }

  function getEventsList() {
    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": addEvents,
      "error": function(reason) {
        console.log("Error: " + reason.result.error.message);
        ready();
      }
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
    var i,
      length;

    if (name === "additionalParams" && value) {
      params = JSON.parse(value);

      $("#container").height(prefs.getInt("rsH"));
      getEventsList();
    }
  }

  function play() {
    $("#container").data("plugin_autoScroll").play();
  }

  function pause() {
    $("#container").data("plugin_autoScroll").pause();
  }

  function stop() {
    $("#container").data("plugin_autoScroll").stop();
  }

  return {
    getAdditionalParams: getAdditionalParams,
    play               : play,
    pause              : pause,
    stop               : stop
  };
})(gadgets);
