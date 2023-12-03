import React, { useContext, useState } from 'react'
import './auth.css'
import { auth } from '../../firebaseConf';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Backbtn from '../utility/backBtn';
import { NameContext } from '../../App';
import { LogedContext, UidContext, UserDataContext } from '../context/context';
import { motion } from 'framer-motion';

function Auth() {

  const value = useContext(NameContext);
  const LogedValue = useContext(LogedContext)
  const UiValue = useContext(UidContext)
  const userDataValue = useContext(UserDataContext)

  const [logEmail, setLogEmail] = useState();
  const [logPassword, setLogPassword] = useState();

  const [name ,setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error,setError] = useState()
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  function onLoginClick(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, logEmail, logPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        userDataValue.setUserData(user)
        console.log("user in login ", user)
        navigate("/")
        value.setUserName(user?.displayName)
        LogedValue.setLoged(true)
        UiValue.setUid(user?.uid)
      })
      .catch((err) => {
        console.log("error in login", err)
        setError(err)
      })
  } 
 
  function onSignUp(e) {
    console.log(email, password)
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password) 
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("user in signin", user)
          updateProfile(auth.currentUser, {
            displayName: `${name}`
          }) 
        })
        .catch((err) => {
          console.log("error in sign up", err)
          setError(err)
        })
    }
  }


  return (
    <div className='auth-container'>
      <Backbtn />
      <div className='login-container'>
        {
          isLogin ?
            <>
              <h1>Welcome</h1>
              <motion.input className='input' type='text' placeholder='Email' onChange={(e) => setLogEmail(e.target.value)} 
              animate={{x:0,opacity:1}}
              initial={{x:50,opacity:0}}
              transition={{duration:.3}}
              />
              <input className='input' type='password' placeholder='Password' onChange={(e) => setLogPassword(e.target.value)} />
              <button className='btn' onClick={onLoginClick}>LogIn</button>
              {/* <button className='btn' onClick={quickLoginClick}>LogIn</button> */}
              <p>create new account ? <span onClick={() => setIsLogin(false)} >SignUp</span></p>
            </>
            :
            <>
              <motion.h1>Create an account</motion.h1>
              <motion.input className='input' type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}
               animate={{y:0,opacity:1}}
               initial={{y:80,opacity:0}}
               transition={{duration:.3}}
              />
              <motion.input className='input' type='teyt' placeholder='Email' onChange={(e) => setEmail(e.target.value)} 
               animate={{y:0,opacity:1}}
               initial={{y:80,opacity:0}}
               transition={{duration:.3,delay:.2}}
              />
              <motion.input className='input' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} 
              animate={{y:0,opacity:1}}
              initial={{y:80,opacity:0}}
              transition={{duration:.3,delay:.4}}
              />
              <motion.input className='input' type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} 
              animate={{y:0,opacity:1}}
              initial={{y:80,opacity:0}}
              transition={{duration:.3,delay:.6}}
              />
              <motion.button className='btn' onClick={onSignUp}
              animate={{opacity:1}}
              initial={{opacity:0}}
              transition={{duration:.3,delay:.9}}
              >SignUp</motion.button>
              <motion.p
              animate={{y:0,opacity:1}}
              initial={{y:80,opacity:0}}
              transition={{duration:.3,delay:1}}
              >already have account ? <span onClick={() => setIsLogin(true)}>Login</span></motion.p>
            </>
        }
      </div>
    </div>
  )
}

export default Auth