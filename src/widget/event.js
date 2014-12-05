/* global moment */

var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Event = {};

RiseVision.Calendar.Event = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function add($day, pos, event, timeFormat, concealEndTime) {
    if (timeFormat === "12hour") {
      timeFormat = "h:mma";
    }
    else {
      timeFormat = "HH:mm";
    }

    /* here the time gets formatted. */
    if (event.start && event.end && event.start.dateTime && event.end.dateTime) {

      /* stick a "current" class on events currently in progress */
      if (!(moment().isBefore(moment(event.start.dateTime))) &&
        moment().isBefore(moment(event.end.dateTime))) {
        $day.find(".event").eq(pos).addClass("current");
      }

      /* stick a "past" class on completed events */
      if (!moment().isBefore(moment(event.end.dateTime))) {
        $day.find(".event").eq(pos).addClass("past");
      }


      if (concealEndTime !== "always") {
        if (concealEndTime !== "never") {
          /* how long in minutes is the event ? */
          var len = Math.round(moment(event.end.dateTime).diff(moment(event.start.dateTime))/60000);
          if (concealEndTime === "hour" && len === 60)  {concealEndTime = "always";}
          if (concealEndTime === "hourorless" && len <= 60)  {concealEndTime = "always";}
        }
      }
      if (concealEndTime === "always") {
        $day.find(".time").eq(pos).text(moment(event.start.dateTime).format(timeFormat));
      }
      else {
        $day.find(".time").eq(pos).text(moment(event.start.dateTime).format(timeFormat) +
          " - " + moment(event.end.dateTime).format(timeFormat));
      }
    }
    else {
      /* conceal the time element, because there's nothing to put into it. */
      $day.find(".time").eq(pos).hide();
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
