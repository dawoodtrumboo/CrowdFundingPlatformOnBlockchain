import React,{useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar} from './components';

import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import Landing from './pages/Landing';


const App = () => {

  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    console.log('in')
    setDarkTheme(!darkTheme);
  };
  return (
    <div className={`relative sm:-8 p-4 min-h-screen flex flex-row ${
      darkTheme ? 'bg-[#13131a]' : 'bg-[#e6e5ec]'
    }`}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar handleTheme={toggleTheme} darkTheme = {darkTheme} />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5"> 
  

        <Routes>
          <Route path="/" element ={<Landing darkTheme={darkTheme}/>}/>
          <Route path="/dashboard" element={<Home darkTheme={darkTheme}/>} />
          <Route path="/profile" element={<Profile darkTheme={darkTheme} />} />
          <Route path="/create-campaign" element={<CreateCampaign darkTheme={darkTheme} />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails darkTheme={darkTheme} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App