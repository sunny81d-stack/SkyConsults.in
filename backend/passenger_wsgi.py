import sys
import os

# Point to the folder that contains app.py
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app import app as application
EOF