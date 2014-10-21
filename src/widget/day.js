var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Day = {};

RiseVision.Calendar.Day = function(params) {
  "use strict";

  var events;

  /*
   *  Public Methods
   */
  function set(calendarEvents) {
    events = calendarEvents;
  }

  function add(params, pos) {
    var i,
      length,
      date,
      $day;

    switch (params.dateRange) {
      case "day":
        date = "Today";
        break;
      case "week":
        // TODO
        break;
      case "month":
        // TODO
        break;
      case "6months":
        // TODO
        break;
      case "12months":
        // TODO
        break;
      default:
        date = "Today";
    }

    $day = $(".day").eq(pos);
    $day.find(".date").text(date);

    // Clone the UI for each additional event after the first.
    for (i = 1, length = events.length; i < length; i++) {
      $day.find(".event:first").clone().appendTo($day.find(".events"));
    }

    // Add all of the events for the current day.
    $.each(events, function(index, value) {
      RiseVision.Calendar.Event.addEvent($day, index, value);
    });
  }

  return {
    addEvents: add,
    setEvents: set
  };
};
