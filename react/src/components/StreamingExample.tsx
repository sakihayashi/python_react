import React, { useEffect, useState } from 'react';
import { APIS, apiRequest, makeClient, testFunc } from '../api'

const StreamingExample = () => {
  const [data, setData] = useState<number>(0);
  const getData = () => {
    return apiRequest(APIS.OUTPUT, {})
  }
  useEffect(() => {
    
    apiRequest(APIS.ADD, {a: 10, b: 3})
    .then((res) => {
      console.log('streamingExample result', {res})
    })
    apiRequest(APIS.OUTPUT, null)
    .then((res) => {
      console.log('streamingExample result', {res})
    })
      
    // const res = getData();
    // console.log({res})
    // const interval = setInterval(() => {
    //   getData()
    //   .then(data => {
    //     console.log({data})
    //     setData(data)
        
    //   })

    // }, 1000);
    // return () => clearInterval(interval);
  }, []);
  return(
    <>
    <h1>data will be shown here: {data && data} </h1>
    </>
    
  )
}

export default StreamingExample;