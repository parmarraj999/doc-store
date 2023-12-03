import React from 'react'
import './firstpage.css'
import Loader from '../utility/loader'
import { motion } from 'framer-motion'

function Firstpage() {
  return (
    <div className='welcome-page-container'>
      <h1><span>Doc </span>Store</h1>
      <Loader />
    </div>
  )
}

export default Firstpage