import React from 'react'
import "./allUtility.css"
import { motion } from 'framer-motion'

function Request() {
  return (
    <div className='blank-container'>
      <div className='desktop-show'>
        <motion.p style={{ fontSize: "24px" }}
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.6}}
        >welcome to <span>Doc Store</span></motion.p>
        <motion.p style={{ paddingTop: "1.2rem" }}
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.8}}
        >doc store is use to store important document and download document any time ,</motion.p>
        <motion.p
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.8}}
        >any device by just login into doc store and add documents</motion.p>
        <motion.p style={{ paddingTop: "1.2rem" }}
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.8}}
        >product by <a href='https://github.com/parmarraj999' style={{color:"rgb(222,243,88)",textDecoration:"underline"}}>@Raj Parmar</a></motion.p>
      </div>
      <div className='mobile-show'>
        <motion.p style={{ fontSize: "24px" }}
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.6}}
        >welcome to <span>Doc Store</span></motion.p>
        <motion.p style={{ paddingTop: "1.2rem" }}
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.8}}
        >doc store is use to store important document and download document any time ,any device by just login into doc store and add documents</motion.p>
        <motion.p style={{ paddingTop: "1.2rem" }}
        animate={{x:0,opacity:1}}
        initial={{x:-60,opacity:0}}
        transition={{duration:.3,delay:.8}}
        >product by <a href='https://github.com/parmarraj999' >@ Raj Parmar</a></motion.p>
      </div>
    </div>
  )
}

export default Request