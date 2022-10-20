import Http2jsClient from '@otosense/http2js';
/**
 * To allow accessing app from another computer through redirect
 */
export const getBaseUrl = () => {
  return 'http://localhost'
  // if (process.env.API_BASE_URL) {
  //   return process.env.API_BASE_URL;
  // }
}
const replaceBaseUrl = (url: string) => {
  const parts = url.split(':');
  const suffix = parts[parts.length - 1];
  console.log(`how this formatted? - ${getBaseUrl()}:${suffix}`)
  // return getBaseUrl()
  return `${getBaseUrl()}:${suffix}`;
};
const jsonObj = {
  "openapi": "3.0.2",
  "info": {
      "title": "OtoSense Reusable tools",
      "version": "0.0.1"
  },
  "servers": [
      {
          "url": "http://localhost:3030"
      }
  ],
  "paths": {
      "/add": {
          "post": {
              "x-method_name": "add",
              "description": "",
              "requestBody": {
                  "required": true,
                  "content": {
                      "application/json": {
                          "schema": {
                              "type": "object",
                              "properties": {
                                  "a": {
                                      "type": "{}"
                                  },
                                  "b": {
                                      "type": "{}"
                                  }
                              },
                              "required": [
                                  "a",
                                  "b"
                              ]
                          }
                      }
                  }
              },
              "responses": {
                  "200": {
                      "description": "",
                      "content": {
                          "application/json": {
                              "schema": {}
                          }
                      }
                  }
              }
          }
      },
      "/test_post": {
          "post": {
              "x-method_name": "test_post",
              "description": "",
              "requestBody": {
                  "required": true,
                  "content": {
                      "application/json": {
                          "schema": {
                              "type": "object",
                              "properties": {}
                          }
                      }
                  }
              },
              "responses": {
                  "200": {
                      "description": "",
                      "content": {
                          "application/json": {
                              "schema": {}
                          }
                      }
                  }
              }
          }
      }
  }
}

let client: any;
export const makeClient= (): Promise<any>  => {

  return fetch('http://localhost:3030/openapi')
  .then((openApiResponse: Response) => openApiResponse.json())
    .then((openApiSpec: any) => {
      openApiSpec.servers.forEach((s: any, i: any) => {
        openApiSpec.servers[i]['url'] = replaceBaseUrl(
          openApiSpec.servers[i]['url']
        );
      });
      console.log('openApiSpec run', {openApiSpec});
      client = new Http2jsClient(openApiSpec, {}, {}, { persistKey: 'otosense-qc-api' });
      console.log('after client created')
      console.log('client created', client)
    })
  .catch(res => console.error)
};

export const testFunc = () => {
  const client = makeClient();
  console.log('test func', {client})
  return client;
}

export const apiRequest = (methodName: APIS, args: any = {}): Promise<any> => {
  
  const ready: Promise<void> = makeClient();
  console.log({ready})
  return ready
    .then(() => {
      console.log('client apiRequest', client)
      return client.endpoints[methodName](args)
    })
    .catch((reason) => {
      console.error('apiRequest Error', methodName, reason);
      return reason;
    });
};


export const isErrorResponse = (response: any) => {
  if (response) {
    return response.success === false || response.error != null;
  }
};

export enum APIS {
  SOUND_DATA = 'sound_data',
  ADD = 'add',
  TEST_POST = 'test_post',
  OUTPUT = 'output'
}

export const openApi = async () => {
  const url = 'http://localhost:3030/openapi';
  return await fetch(url
  //   {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-type': 'application/json',
  //     'Access-Control-Allow-Methods': 'OPTIONS, GET, HEAD, POST'
  //   }
  // }
  )
  .then(res => {
    console.log('openapi', {res})
    return res.json
  })
}
