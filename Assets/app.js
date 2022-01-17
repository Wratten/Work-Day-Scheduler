// Load everything when it's ready
$(document).ready(function () {
  // DATE AT TOP OF PAGE
  // display day at top of page
  const updateDay = function () {
    // grab the <p> html element with the id of currentDay and create a variable
    const currentDateElement = $("#currentDay");
    // create a variable that equals the current time and format it
    const today = moment().format("dddd, MMMM Do YYYY, h:mm:ss");
    // update the text inside the p element to the current time
    currentDateElement.text(today);
  };
  // Updates the clock every second with the new time
  setInterval(updateDay, 1000);

  // TIMEBLOCK CHANGE BY REAL TIME
  // create variable that equals a function
  var checkTime = function () {
    // Get current hour
    var currentTime = moment().hour();

    // For every time block element, run this function that:
    $(".time-block").each(function () {
      // gets the id of the timeblock eg 9 and takes the hour from it and converts it to an integer, so it can be later used and compared to current time.
      var timeBlock = parseInt($(this).attr("data-hour"));
      // Check the time and add classes
      //if the timeblock's id is a smaller number than the current hour
      if (timeBlock < currentTime) {
        // remove future and present classes
        $(this).removeClass("future");
        $(this).removeClass("present");
        //add past class
        $(this).addClass("past");
        // if the timeblock's id is the same number as the current hour
      } else if (timeBlock === currentTime) {
        // remove future and past class
        $(this).removeClass("future");
        $(this).removeClass("past");
        // add present class
        $(this).addClass("present");
        // otherwise
      } else {
        // remove class present and past
        $(this).removeClass("present");
        $(this).removeClass("past");
        // add class future
        $(this).addClass("future");
      }
    });
  };

  // runs check time on page load
  checkTime();
  // and every minute after
  setInterval(checkTime, 60000);

  // LOCALSTORAGE

  //event listener for save button on click
  $(".saveBtn").on("click", function () {
    // creates a variable that is the text inside the description of the save button that is pressed
    var eventText = $(this).siblings(".description").val();
    // and the data id of the time block
    var eventTime = $(this).parent().attr("data-hour");
    // save to local storage using the event time as the key and the event text as the value
    localStorage.setItem(eventTime, eventText);
  });

  // load events from local storage
  // for each time block run the function that
  $(".time-block").each(function () {
    // creates the variable eTime as the data hour attribute value
    var eTime = $(this).attr("data-hour");
    // creates the variable existing event as the local storage time key
    const existingEvent = localStorage.getItem(eTime);
    // if there are existing events in local storage
    if (existingEvent) {
      // then update the values of the description text field to the text held in local storage
      $(this).find(".description").val(existingEvent);
    }
  });

  // when clicking the clear stored tasks button
  $(".btn-danger").on("click", function () {
    // clear the local storage
    localStorage.clear();
    // reload the page
    location.reload();
  });
});
