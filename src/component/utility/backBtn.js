import React from 'react'
import './allUtility.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Backbtn() {
  return (
    <Link to="/" className='backBtn'>
        <FontAwesomeIcon icon={faArrowLeft} className='arrowIcon'/>
    </Link>
  )
}

export default Backbtn