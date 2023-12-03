import React, { useContext, useState, } from 'react'
import './create.css'
import Backbtn from '../utility/backBtn';
import { storage } from "./../../firebaseConf"
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { datastore } from './../../firebaseConf';
import { collection, addDoc } from "firebase/firestore"
import { UidContext } from '../context/context';
import { motion } from 'framer-motion';

function Upload() {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [percent, setPercent] = useState();
    const [error, setError] = useState();
    const [url, setUrl] = useState();

    const userId = useContext(UidContext)

    const navigate = useNavigate();

    const fileType = ["image/png", "image/jpeg"]

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && fileType.includes(selectedFile?.type)) {
            setFile(selectedFile);
            setFileName(`${selectedFile?.name}`)
            setError("")
        } else {
            setFile(null)
            setFileName(null)
            setError("please select only PNG and JPEG")
        }
    }

    const upload = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `/files/${userId.uid}/${file?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            async (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setPercent(percent);
                if (percent === 100) {
                }
            },
            (err) => console.log("error in upload ", err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                    console.log("url", url)
                    setUrl(url)
                    if (url !== null) {
                        const collectionRef = collection(datastore, `${userId.uid}/`)
                        await addDoc(collectionRef, { imgUrl: url, name: fileName })
                        console.log("added to database")
                        setTimeout(() => {
                            navigate("/")
                        }, 3000);
                    }
                })
            }
        )
    }

    return (
        <form className='create-container' id="upload-form">
            <Backbtn />
            <div className='create'>
                {
                    percent === 100 ?
                        <motion.h2
                        animate={{}}
                        >Well Done !</motion.h2> :
                        <>
                            <motion.h1
                            animate={{x:0,opacity:1}}
                            initial={{x:80,opacity:0}}
                            transition={{duration:.3}}
                            >Add Document</motion.h1>
                        </>
                }
                <motion.input type='file' onChange={handleChange} className='input' 
                animate={{opacity:1}}
                initial={{opacity:0}}
                transition={{duration:.3,delay:.3}}
                />
                <motion.div style={{ display: "flex", justifyContent: "center" }}
                animate={{x:0,opacity:1}}
                initial={{x:50,opacity:0}}
                transition={{duration:.3,delay:.4}}
                >
                    <h2>{fileName === "" ? "no file" : fileName}</h2>
                </motion.div>
                <motion.div className='progressBox'
                animate={{x:0,opacity:1}}
                initial={{x:50,opacity:0}}
                transition={{duration:.3,delay:.5}}
                >
                    <div className='progressBar' style={{ width: `${percent}%` }}><p>{percent}%</p></div>
                </motion.div>
                <p style={{ color: "red", fontSize: "18px", fontWeight: "600" }}>{error}</p>
                <motion.button className='btn' onClick={upload}
                animate={{x:0,opacity:1}}
                initial={{x:50,opacity:0}}
                transition={{duration:.3,delay:.6}}
                > upload </motion.button>
            </div>

        </form>
    )
}

export default Upload