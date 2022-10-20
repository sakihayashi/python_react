from taped import WfChunks
import numpy as np
from py2http.service import run_app

# def sound_data():
#     with WfChunks() as wf_chks:
#         for chk in wf_chks:
#             yield np.std(chk)

def sound_data(a, b):
  return a + b
# for char in gen():
#     print(char)

def add(a, b):
  return a + b
# Make a list of functions or instance methods
func_list = [sound_data, add]

# Create an HTTP server
run_app(func_list)