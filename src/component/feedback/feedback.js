import React, { useEffect, useState } from 'react'
import Backbtn from '../utility/backBtn'
import './feedback.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { datastore } from '../../firebaseConf'
import { useContext } from 'react'
import { NameContext } from '../../App'
import { LogedContext, UidContext } from '../context/context'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Feedback() {

  const userName = useContext(NameContext);
  const uidValue = useContext(UidContext)
  const logedValue = useContext(LogedContext)
  const [feedback, setFeedback] = useState();
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setFeedback(e.target.value)
  }

  const uplaodFeedback = async () => {
    const collectionRef = collection(datastore, "feedback/")
    await addDoc(collectionRef, { name: `${userName.userName}`, feedback: feedback, uid: `${uidValue.uid}` })
    console.log("done")
  }
  const getData = async () => {
    const storeRef = collection(datastore, "feedback/")
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map((data) =>
      ({ ...data.data(), fullName: data.name, docId: data.id })
    )
    setData(allData)
  }

  useEffect(() => {
    getData()
  })

  return (
    <div className='feedbackContainer'>
      <motion.div
      animate={{y:0,opacity:1}}
      initial={{y:-50,opacity:0}}
      transition={{duration:.3,type:"spring"}}
      >
        <Backbtn/>
      </motion.div>
      {
        logedValue.loged ? 
      <motion.div className='feedback-input'
      animate={{opacity:1}}
      initial={{opacity:0}}
      transition={{duration:.3,delay:.3}}
      >
        <input className='input' onChange={handleChange} type='text' placeholder='Feedback'/>
        <button className='btn'>
          <FontAwesomeIcon onClick={uplaodFeedback} className='icon' icon={faPaperPlane} />
        </button>
      </motion.div>
      :
      <motion.div className='feedback-input'
       style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <p style={{color:"red",fontSize:"22px"}}>Please logIn to review</p>
        <Link to="/auth" className='btn'>Login</Link>
      </motion.div>
      }
      <div className='feedbackHome'>
        <div className='header'>
          <h2>What's your review</h2>
        </div>
        <div className='feedbackHolder'>
          {
            data.map(data => {
              return (
                <motion.div className='feedback-wrapper'>
                  <div className='feedback'>
                    <h1>{data.name}</h1>
                    <p>{data.feedback}</p>
                  </div>
                  <div className='delete-btn'>
                    {
                      uidValue.uid === data.uid ?
                        <FontAwesomeIcon className='icon' icon={faClose}
                          onClick={async () => {
                            await deleteDoc(doc(datastore, `feedback/${data.docId}`))
                          }}/>
                      :
                        ""
                    }
                  </div>
                </motion.div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Feedback