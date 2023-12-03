import React, { useContext } from 'react'
import './allUtility.css'
import { UidContext } from '../context/context'

function Token() {

  const uidValue = useContext(UidContext);

  return (
    <div style={{background:"transparent"}}>
    <h1 className='token-container'>{uidValue.uid}</h1>
    </div>
  )
}

export default Token