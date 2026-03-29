"""
passenger_wsgi.py – cPanel Phusion Passenger entry point.
Place this in your application root alongside app.py.
"""
import sys
import os

# Make sure the app directory is on the path
sys.path.insert(0, os.path.dirname(__file__))

from app import app as application  # noqa: F401
