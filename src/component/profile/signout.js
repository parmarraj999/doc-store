import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogedContext, ProfileImgContext, ShowSignOutContext, UserDataContext } from '../context/context';
import { NameContext } from '../../App';
import { signOut } from 'firebase/auth';
import { auth  } from '../../firebaseConf';
import './signout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';

function Signout() {

    const navigate = useNavigate();

    const value = useContext(LogedContext);
    const nameValue = useContext(NameContext)
    const profileValue = useContext(ProfileImgContext);
    const signOutData = useContext(ShowSignOutContext)


    const handleSignOut = (e) => {
        signOut(auth)
            .then(() => {
                console.log("sign out in header")
                value.setLoged(false)
                navigate("/auth")
                nameValue.setUserName("User")
                profileValue.setProfileImg(null)

            })
            .catch((err) => {
                console.log("error in header signout", err)
            })
    }
    
    const closeShowPopHandle = () => {
        signOutData.setShowSignOut(true)
    }

    return (
        <motion.div className='profile-container'
        animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{duration:.3,}}
        >
            <div className='signout-card'>
                <motion.div className='close-btn' onClick={closeShowPopHandle}
                 animate={{y:0,opacity:1}}
                 initial={{y:40,opacity:0}}
                 transition={{duration:.3,delay:.1}}
                >
                    <FontAwesomeIcon className='btn' icon={faClose} />
                </motion.div>
                <motion.h2
                 animate={{y:0,opacity:1}}
                 initial={{y:30,opacity:0}}
                 transition={{duration:.3,delay:.2}}
                >are you sure ?</motion.h2>
                <motion.button className='btn' onClick={handleSignOut}
                 animate={{y:0,opacity:1}}
                 initial={{y:30,opacity:0}}
                 transition={{duration:.3,delay:.2}}
                >Sign Out </motion.button>
            </div>
        </motion.div>
    )
}

export default Signout