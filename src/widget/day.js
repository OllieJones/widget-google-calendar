/* global moment */

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

  function add(pos) {
    var i,
      length,
      date,
      currentDate = events[0].start.dateTime ? events[0].start.dateTime : events[0].start.date,
      $day = $(".day").eq(pos),
      weekday = moment(currentDate).format("dddd").toLowerCase(),
      daynn =  "day" + moment(currentDate).format("D"),
      datemmmnn = "date" + moment(currentDate).format("MMMD").toLowerCase();


    switch(pos) {
      case 0: $day.addClass("today"); break;
      case 1: $day.addClass("tomorrow"); break;
      case 7: $day.addClass("nextweek"); break;
    }

    $day.addClass(weekday);    /* we give each day a class named for its weekday */
    $day.addClass(daynn);      /* we give each day a class named for the day of the month */
    $day.addClass(datemmmnn);  /* we give each day a class named for the date in the year */

    if (params.dateRange === "day") {
      date = "Today";
    }
    else if (params.dateRange === "week") {
      if (moment(currentDate).isSame(moment(), "day")) {
        date = "Today";
      }
      else {
        date = moment(currentDate).format("dddd");
      }
    }
    else {
      date = moment(currentDate).format(params.dateFormat);
    }

    $day.find(".date").text(date);

    // Clone the UI for each additional event after the first.
    for (i = 1, length = events.length; i < length; i++) {
      $day.find(".event:first").clone().appendTo($day.find(".events"));
    }

    // Add all of the events for the current day.
    $.each(events, function(index, value) {
      RiseVision.Calendar.Event.addEvent($day, index, value, params.timeFormat, params.concealEndTime);
    });
  }

  return {
    addDay: add,
    setEvents: set
  };
};
