/* global moment */

var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Event = {};

RiseVision.Calendar.Event = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function add($day, pos, event) {
    if (event.start && event.end && event.start.dateTime && event.end.dateTime) {
      $day.find(".time").eq(pos).text(moment(event.start.dateTime).format("h:mma") +
        " - " + moment(event.end.dateTime).format("h:mma"));
    }

    if (event.summary) {
      $day.find(".summary").eq(pos).html(event.summary);
    }

    if (event.location) {
      $day.find(".location").eq(pos).html(event.location);
    }

    if (event.description) {
      $day.find(".description").eq(pos).html(event.description);
    }
  }

  return {
    addEvent: add
  };
})();
