import React, { useContext, useEffect, useState } from 'react'
import './create.css'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConf';
import Backbtn from '../utility/backBtn';
import { useNavigate } from 'react-router-dom';
import { UidContext } from '../context/context';


function Create() {

  const uiValue = useContext(UidContext)

  const [file, setfile] = useState();
  const [percent, setPercent] = useState(0);

  const [presentFile,setPresentFile] = useState("");


  const [imgUrl, setImageUrl] = useState();

  const navigate = useNavigate();

  const handleFile = (e) => {
    setfile(e.target.files[0])
    setPresentFile(`${file.name}`)
    console.log(presentFile)
  }

  // useEffect(()=>{
  //   setPresentFile(`${file.name}`)
  // },[handleUpload])

  // ------ uploading image ------- 

  function handleUpload() {
    if (!file) {
      alert('please select image')
    }
    const storageRef = ref(storage, `/files/${uiValue.uid}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    uploadTask.on("state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
        if (percent === 100) {
          setTimeout(() => {
            navigate("/")
          }, 4000);
        }
      },
      (err) => console.log("error in upload ", err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url)
          setImageUrl(url)
        })
      }
    )
  }
  console.log(presentFile)

  
  return (
    <div className='create-container'>
      <Backbtn />
      <div className='create'>
        {
          percent === 100 ?
            <h2>Well Done !</h2> :
            <h1>Add Document</h1>
        }
        <input type='file' placeholder='choose document' onChange={handleFile} className='input' />
        <div style={{display:"flex",justifyContent:"center"}}>
        <h2>{ presentFile === "" ? "no file selected" : presentFile}</h2>
        </div>
        <div className='progressBox'>
          <div className='progressBar' style={{ width: `${percent}%` }}><p>{percent}%</p></div>
        </div>
        <button className='createBtn' onClick={handleUpload}>Upload</button>
        {/* <button onClick={showList} className='btn' >show images</button> */}
      </div>
    </div>
  )
}

export default Create
