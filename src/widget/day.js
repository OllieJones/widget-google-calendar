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
      todaysMoment = moment(currentDate),
      weekday = todaysMoment.format("dddd").toLowerCase(),
      daynn =  "day" + todaysMoment.format("D"),
      monthname = todaysMoment.format("MMMM").toLowerCase(),
      daysaway = todaysMoment.diff(moment().hour(0).minute(0).second(0).millisecond(0), "days");


    switch(daysaway) {
      case 0: $day.addClass("today"); break;
      case 1: $day.addClass("tomorrow"); break;
      case 7: $day.addClass("nextweek"); break;
    }
    if (daysaway > 0) {
      $day.addClass("nottoday");
    }
    if (daysaway > 1) {
      $day.addClass("future");
    }

    $day.addClass(weekday);    /* we give each day a class named for its weekday */
    $day.addClass(daynn);      /* we give each day a class named for the day of the month */
    $day.addClass(monthname);  /* we give each day a class named for the month */

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
