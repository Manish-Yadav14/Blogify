import React from 'react'
import { useOutletContext } from 'react-router-dom';

function About() {
  const data = useOutletContext();

  return (
    <>
    <div className='m-4 p-4'>
        <h1 className='text-2xl font-bold py-4'>About</h1>
        <div className='text-xl'>{data.bio}</div>
    </div>
    </>
  )
}

export default About