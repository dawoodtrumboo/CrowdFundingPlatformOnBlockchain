import React,{useState} from 'react';
import { Route, Routes,useNavigate,Link  } from 'react-router-dom';
import { Sidebar} from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import Landing from './pages/Landing';
import { useStateContext } from './context';
import { CustomButton } from './components';
import { logo, menu} from './assets';
import { navlinks } from './constants';


const App = () => {

  const [darkTheme, setDarkTheme] = useState(true);
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const navigate = useNavigate();

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
     
      <div className="sm:hidden flex justify-between items-center relative mb-5">
         <Link to="/">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
          </Link>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
            
            </div>
          </div>
        </div>

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