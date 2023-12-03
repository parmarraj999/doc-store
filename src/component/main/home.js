import React, { useContext } from 'react'
import './main.css'
import Header from '../header/header'
import { NameContext } from '../../App'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LogedContext, ShowSignOutContext } from '../context/context';
import Imglist from '../nestroute/imglist';
import Request from '../utility/request';
import Signout from '../profile/signout';
import { motion } from 'framer-motion';

function Home() {

  const userName = useContext(NameContext);
  const loged = useContext(LogedContext)
  const signOutData = useContext(ShowSignOutContext)

  return (
    <div className='main-container'>
      <Header />
      <div className='section2'>
        <motion.h1 className='name-text'
        animate={{x:0,opacity:1}}
        initial={{x:-50,opacity:0}}
        transition={{duration:.5}}
        >Hello ,<span>{userName.userName}</span></motion.h1>
        {
          loged.loged ?
            <Link to="/upload" className='createBtn'>Add Document <FontAwesomeIcon className='icon' icon={faPlus} /></Link> :
            <motion.div style={{
              display: "flex",
              flexDirection: "column",
              gap:"1rem",
              alignItems:"center"
            }}
            animate={{opacity:1}}
            initial={{opacity:0}}
            transition={{duration:.5,delay:.5}}
            >
              <Link to="/" className='createBtn disable'>Add Document <FontAwesomeIcon className='icon' icon={faPlus} /></Link>
              <p style={{ color: "red" }}>Log In to Add Document</p>
            </motion.div>
        }
      </div>
      {
        loged.loged ? <Imglist/> : <Request/>
      }
      {
        signOutData.showSignOut ? " " : <Signout/>
      }
      
    </div>
  )
}

export default Home