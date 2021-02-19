let { PythonShell } = require('python-shell');
let path = require('path');

// global shell object
let pyshell;

// for timer
let start = Date.now();
let interval = 10; // ms 
let timer;
let expected;
let millis;
let seconds;
let minutes;
let time_str; // this will be sent to python upon pressing the 'stop' button

// called when user presses 'Run'
function start_test() {
    let $board_number = $('#boardnumber').val();
    let $test_name = $('#testname').val();
    let $axis_type = $('input[name="axis"]:checked').val();

    let options = {
        scriptPath: path.join(__dirname, '/engine/'),
        args: [$test_name, $board_number, $axis_type] // python arguments
    };

    $(".real-time-response").empty();

    // create a new python shell everytime "Run" is pressed
    pyshell = new PythonShell('test.py', options);

    pyshell.on('message', updateResponseSection);
}

// this function assumes that pyshell has already been instantiated
function stop_test() {
    pyshell.send(time_str);
    pyshell.send("quit");
    pyshell.end();
    // delete pyshell;
    // setTimeout(updateResponseSection('Test stopped!<br>-----<br>'), 1500);
}

function start_timer() {
    start = Date.now();
    expected = start + interval;
    timer = setTimeout(step, interval);
}

function stop_timer() {
    clearTimeout(timer);
}

function step() {
    let delta = Date.now() - expected;
    if (delta > interval) {
        // browser possible froze..?
        console.log("Timer error!");
    }
    else {
        let time_elapsed = Date.now() - start; // in ms
        millis = time_elapsed;
        seconds = Math.floor(millis / 1000);
        minutes = Math.floor(seconds / 60);
        millis = millis % 1000;
        time_str = ('00' + minutes).substr(-2) + ':' + ('00' + seconds).substr(-2) + '.' + ('000' + millis).substr(-3);
        // let minutes = Math.floor(millis * 60000);
        $('#time').text(time_str);
    }

    expected += interval;
    timer = setTimeout(step, Math.max(0, interval - delta)); // take into account drift
}

// function update_timer() {
//     ticks++;
//     let milliseconds = ticks % 100;
//     let seconds = Math.floor(ticks / 100);
//     let minutes = Math.floor(ticks / 6000);

//     $('#time').text(minutes.toString() + ':' + seconds.toString() + '.' + milliseconds.toString());
// }

// this function updates the real time response section with a message
function updateResponseSection(message) {
    let curr_html = $('.real-time-response').html();
    $('.real-time-response').html(curr_html + message + '<br>');
}
