const { timers } = require("jquery");

let running = false;

$(function() {
    $('#sidebarCollapse').on('click', function () {
        $("#sidebar").toggleClass("active");
  });
  $('#stoprunbtn').on('click', run);
});

function run() {
  $("#stoprunbtn").toggleClass("run-active");
  if (running) {
    running = false;

    // these functions are in the linkers folder -> test.js
    stop_test(); // this function is in the linkers folder -> test.js
    stop_timer();
    $('#stoprunbtn').html('<b>Run</b><i class="fa fa-play" aria-hidden="true"></i>');
  } else {
    running = true;
    $('#stoprunbtn').html('<b>Stop</b><i class="fas fa-stop" aria-hidden="true"></i>');

    // these functions are in the linkers folder -> test.js
    start_timer();
    start_test(); // this function is in the linkers folder -> test.js
  }
}

