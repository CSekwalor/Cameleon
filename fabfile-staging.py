from fabric.api import env
from fabs.deploy import *

env.hosts = ['54.217.222.62',]
env.user = 'mindsmeetafrica-frontend'

env.home_dir = '/home/mindsmeetafrica-frontend'
env.local_src_name = 'dist'
env.local_snapshot_name = 'snapshots'
env.www_src_dir = '/home/mindsmeetafrica-frontend/dist'
env.health_check_urls = ('',)
env.mode = 'staging'