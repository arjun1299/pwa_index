#! /usr/bin/python3.6

import logging
import sys
#logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/home/arjun/Cassandra/indexdbTest/')
from flask_store import app as application
application.secret_key = 'anything you wish'
