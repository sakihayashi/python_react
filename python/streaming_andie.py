"""Webservice for Volume and Zero Crossing"""
from itertools import count

import numpy as np
from audiostream2py import PyAudioSourceReader
from py2http.service import run_app
from taped import LiveWf

def mk_service_config(logger=None):
    return {
        'enable_cors': True,
        'publish_openapi': True,
        'openapi_insecure': True,
    }

def chunk_indices(chk_size=2048, chk_step=None, *, start=0, stop=None):
    """
    >>> list(chunk_indices(10, 5, stop=30))
    [(0, 10), (5, 15), (10, 20), (15, 25), (20, 30), (25, 35)]
    """
    chk_step = chk_step or chk_size
    i_gen = range(start, stop, chk_step) if stop is not None else count(start, chk_step)
    for i in i_gen:
        yield i, i + chk_size

def volume(chk):
    return np.std(chk)

def zero_crossing_ratio(chk):
    return sum(np.diff(np.array(chk) > 0).astype(int)) / (len(chk) - 1)

def go(stop=10_000):
    live_wf = LiveWf(input_device_index='NexiGo N930AF FHD Webcam Audio')

    with live_wf:
        # TODO: zip is not the right chunker merger (one will out-pace the other eventually!)
        for i, (idx1, idx2) in enumerate(
            zip(chunk_indices(2048, 512, stop=stop), chunk_indices(1000, stop=stop),)
        ):
            wf1 = live_wf[slice(*idx1)]
            wf2 = live_wf[slice(*idx2)]
            yield {
                'volume': volume(wf1),
                'zero_crossing_ratio': zero_crossing_ratio(wf2),
                'index': [i, idx1, idx2],
            }

_stream = go(stop=None)

def output():
    return next(_stream)

def add(a, b):
    return a + b

# Make a list of functions or instance methods
func_list = [output, PyAudioSourceReader.list_recording_devices, add]

# Create an HTTP server
config = mk_service_config()
run_app(func_list, **config)