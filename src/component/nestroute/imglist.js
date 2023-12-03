import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { datastore, storage } from '../../firebaseConf'
import { useState } from 'react'
import "./imglist.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteObject, ref } from 'firebase/storage'
import { UidContext } from '../context/context'

function Imglist() {

  const userId = useContext(UidContext)

  const [data, setData] = useState([]);

  const getImgData = async () => {
    const storeRef = collection(datastore, `${userId.uid}/`)
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
   ({ ...data.data(), id: data.id }))
    setData(allData)
  }
  useEffect(() => {
    getImgData()
  })

  

  return (
    <div className='image-container'>
      {
        data.map((data, key) => {
          return (
            <div className='img-wrapper'>
              <img key={key} src={data.imgUrl} />
              <div className='wrapper-bottom'>
                <h1>{data.name}</h1>
                <div style={{ background: "transparent",display:"flex",gap:".4rem" }}>
                  <a style={{background:"transparent"}} href={data.imgUrl} download={data.name}>
                    <FontAwesomeIcon className='utility-btn' icon={faDownload} />
                  </a>
                  
                  <FontAwesomeIcon className='utility-btn' icon={faTrash} onClick={async () => {
                    let imgRef = ref(storage, `files/${userId.uid}/${data.name}`)
                    await deleteDoc(doc(datastore, `${userId.uid}/${data.id}`))
                    deleteObject(imgRef).then(async () => {
                      console.log("delete successfully")
                    })
                  }} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Imglist