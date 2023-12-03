import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Firstpage from './component/firstpage/firstpage';
import Auth from './component/account/auth';
import Home from './component/main/home';
import { createContext } from "react";
import { LogedContext, ProfileImgContext, ShowSignOutContext, UidContext, UserDataContext } from './component/context/context';
import Feedback from './component/feedback/feedback';
import Upload from './component/create/upload';

export const NameContext = createContext();


function App() {

  const [onLoading, setOnLoading] = useState();

  // ---- context variable ------- 
  const [loged, setLoged] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userData, setUserData] = useState();
  const [uid, setUid] = useState(null);
  const [profileImg, setProfileImg] = useState();
  const [showSignOut, setShowSignOut] = useState(true)

  useEffect(() => {
    setOnLoading(true)
    setTimeout(() => {
      setOnLoading(false)
    }, 5000);
  }, [])

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <UidContext.Provider value={{ uid, setUid }}>
        <LogedContext.Provider value={{ loged, setLoged }}>
          <NameContext.Provider value={{ userName, setUserName }}>
            <ProfileImgContext.Provider value={{ profileImg, setProfileImg }}>
              <ShowSignOutContext.Provider value={{showSignOut,setShowSignOut}} >
                <div className="App">
                  {
                    onLoading ? <Firstpage /> :
                      <div>
                        <BrowserRouter>
                          <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/auth' element={<Auth />} />
                            <Route path='/upload' element={<Upload />} />
                            <Route path='/feedback' element={<Feedback />} />
                          </Routes>
                        </BrowserRouter>
                      </div>
                  }
                </div>
              </ShowSignOutContext.Provider>
            </ProfileImgContext.Provider>
          </NameContext.Provider>
        </LogedContext.Provider>
      </UidContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

// ----- complete ----- 
