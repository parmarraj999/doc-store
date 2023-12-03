import React, { useContext } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { LogedContext, ProfileImgContext, ShowSignOutContext } from '../context/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function Header() {

  const value = useContext(LogedContext);
  const profileValue = useContext(ProfileImgContext)
  const signOutData = useContext(ShowSignOutContext)

  const showSignOutHandle = () => {
    signOutData.setShowSignOut(false)
  }

  return (
    <div className='header'>
      <div className='logo'>
        <h1
        ><motion.span
          animate={{ color: " rgb(222,243,88)" }}
          initial={{ color: " rgb(0,0,0)" }}
          transition={{ duration: 1, delay: 1 }}
        >Doc </motion.span>Store</h1>
      </div>
      {
        value.loged ?
          <motion.div style={{ display: "flex", gap: "1.2rem" }}
          animate={{y:0,opacity:1}}
          initial={{y:50,opacity:0}}
          transition={{duration:.3}}
          >
            <Link onClick={showSignOutHandle} className='profileBtn'>

              <FontAwesomeIcon icon={faArrowRight} className='icon' style={{ color: "white" }} />
            </Link>
            <Link to="/feedback">
              <FontAwesomeIcon className='btn' style={{ padding: ".8rem" }} icon={faComment} />
            </Link>
          </motion.div>
          :
          <motion.div style={{ display: "flex", gap: "1.2rem" }}
          animate={{y:0,opacity:1}}
          initial={{y:-50,opacity:0}}
          transition={{duration:.3}}>
            <Link to="/feedback" className='btn' style={{ padding: ".6rem", display: "flex", alignItems: "center" }} >
              <FontAwesomeIcon className='icon' icon={faComment} />
            </Link>
            <Link className='btn' to="/auth">Login</Link>
          </motion.div>
      }
    </div>
  )
}

export default Header