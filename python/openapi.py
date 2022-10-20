import requests
from py2http.config import BOTTLE

SERVER_URL = 'http://localhost:3030'
OPENAPI_URL = f'{SERVER_URL}/openapi'

HEADERS = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Authorization': 'undefined',
    'Connection': 'keep-alive',
    'Content-type': 'application/json',
    'Origin': 'http://localhost:3000',
    'Referer': 'http://localhost:3000/',
    'User-Agent': (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    ),
}

def mk_service_config(logger=None):
    return {
        'enable_cors': True,
        'framework': BOTTLE,
        'header_inputs': {},
        'openapi': {
            'title': 'OtoSense Reusable tools',
            'version': '0.0.1',
            'base_url': 'http://localhost:3030',
        },
        'publish_openapi': True,
        'openapi_insecure': True,
        'port': 3030,
        'plugins': [],
        'logger': logger,
    }
