#!/bin/bash

# Get the directory of the script
SCRIPT_DIR=$(dirname "$0")

# Activate the virtual environment
source "$SCRIPT_DIR/.venv/bin/activate"

# Run the server
python3 "$SCRIPT_DIR/back-end/server.py"