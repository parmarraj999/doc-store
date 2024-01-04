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
  const [isLogin, setIsLogin] = useState(true);

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
        console.log("error in login", err.code)
        if(err.code === "auth/missing-password"){
          setError("Enter Password")
        }
        if(err.code === "auth/missing-email"){
          setError("Enter Email")
        }
        if(err.code === "auth/user-not-found"){
          setError("Please Make Account")
        }
      })
  } 
 
  function onSignUp(e) {
    console.log(email, password)
    if(name !== ""){
      setError("Enter Your Name")
    }
    if(password !== confirmPassword){
      setError("Password Not Match")
    }
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password) 
        .then((userCredentials) => {
          const user = userCredentials.user;
          // console.log("user in signin", user)
          updateProfile(auth.currentUser, {
            displayName: `${name}`
          }) 
          signInWithEmailAndPassword(auth, email, password)
          .then(()=>{
            navigate("/")
          })
        })
        .catch((err) => {
          // console.log("error in sign up", err.code)
          if(err.code === "auth/email-already-in-use"){
            setError("email already used")
          }
          if(err.code === "auth/admin-restricted-operation"){
            setError("Enter Email")
          }
          if(err.code === "auth/missing-password"){
            setError("Enter Password")
          }
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
              {
                error ?
                <motion.p
                animate={{x:0,opacity:1}}
                initial={{x:80,opacity:0}}
                transition={{duration:.5}}
                style={{
                  color:"tomato",
                  fontWeight:"700",
                  padding:".8rem 1.2rem",
                  background:"#eeeeee20",
                  borderRadius:"15px"
                }}
                >{error}</motion.p>
                : ""
              }
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
              {
                error ?
                <motion.p
                animate={{y:0,opacity:1}}
                initial={{y:80,opacity:0}}
                transition={{duration:.3,delay:1.1}}
                style={{
                  color:"tomato",
                  fontWeight:"700",
                  padding:".8rem 1.2rem",
                  background:"#eeeeee20",
                  borderRadius:"15px"
                }}
                >{error}</motion.p>
                : ""
              }
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