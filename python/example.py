import json
from py2http import mk_app, run_app
from py2http.config import BOTTLE

def mk_service_config(logger=None):
    return {
        'enable_cors': True,
        # 'framework': BOTTLE,
        # 'header_inputs': {},
        # 'openapi': {
        #     'title': 'OtoSense Reusable tools',
        #     'version': '0.0.1',
        #     'base_url': 'http://localhost:3030',
        # },
        'publish_openapi': True,
        'openapi_insecure': True,
        # 'port': 3030,
        # 'plugins': [],
        # 'logger': logger,
    }

def add(a, b):
    return a + b

def test_post():
    return 'success!'

func_list = [add, test_post]

# app = mk_app(func_list)
# openapi_spec = app.openapi_spec

# with open('~/openapi.json', 'w') as fp:
    # json.dump(openapi_spec, fp)
config = mk_service_config()
run_app(func_list, **config)