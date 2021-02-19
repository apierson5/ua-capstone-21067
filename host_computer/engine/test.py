#!/usr/bin/python

import sys
import os
import time
import threading
import serial  # for serial communication


# these values are specified by the user from the GUI
running = True
test_name = sys.argv[1]
board_number = sys.argv[2]
axis_type = sys.argv[3]


def monitor_stdin_for_quit():
    ''' This function will terminate the script when "Stop" is pressed from javascript.
    '''
    global running
    while True:
        command = sys.stdin.readline()
        command = command.split('\n')[0]
        print(command)
        if command == "quit":
            sys.stdout.flush()
            running = False
            break
        else:
            print("Time_str: " + command)
            sys.stdout.flush()


# program will exit if this thread remains (i.e the main script has terminated)
stop_thread = threading.Thread(target=monitor_stdin_for_quit, daemon=True)
stop_thread.start()


# assume that the script is running initially
while running:
    print(
        f"Test Name: {test_name},\nBoard Number: {board_number},\nAxis Type: {axis_type}")
    time.sleep(1)
    sys.stdout.flush()

print("Test stopped!\n--------------")
sys.exit(1)
