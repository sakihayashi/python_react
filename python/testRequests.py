# Test the server in a separate process
import requests

url = 'http://localhost:3030/add'
add_args = {'a': 20, 'b': 22}
print(requests.post(url, json=add_args).json())
# should return 42