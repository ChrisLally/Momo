#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print commands and their arguments as they are executed
set -x

# Install dependencies (if needed)
npm install

# Compile the extension
npm run compile

# Package the extension
npm run package

# Close all VS Code windows
osascript -e 'quit app "Visual Studio Code"'

# Define the folder to open
TEST_FOLDER="/Users/chrislally/vsc-test/"

# Define the file to open
TEST_FILE="test.py"

# Launch VS Code Insiders with the extension
"/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron" --extensionDevelopmentPath=$PWD --disable-extensions -n "$TEST_FOLDER" -g "$TEST_FOLDER/$TEST_FILE" --enable-proposed-api --inspect-extensions=9229 --open-devtools-for-views &

# Wait for VS Code to start
sleep 2  # Increase from 1 to 2 seconds

# Open DevTools using AppleScript
osascript -e 'tell application "Visual Studio Code - Insiders" to activate'
# sleep 1
# osascript -e 'tell application "System Events" to keystroke "i" using {command down, option down}'