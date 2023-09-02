import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick, darkTheme }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && ( darkTheme?'bg-[#2c2f32]':"bg-white shadow-secondary")} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = ({handleTheme, darkTheme}) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('/');

  const handleLogoClick = () => {
    setIsActive('/'); // Reset isActive to 'dashboard' when clicking on the logo icon
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles={`w-[52px] h-[52px] ${darkTheme?"bg-[#2c2f32]":"bg-white"}`} imgUrl={logo} handleClick={handleLogoClick} />
      </Link>

      {/* <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12"> */}
      <div className={`flex-1 flex flex-col justify-between items-center rounded-[20px] w-[76px] py-4 mt-12 ${darkTheme? 'bg-[#1c1c24]' : 'bg-white'} `}>
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              darkTheme={darkTheme}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles={` ${darkTheme?"bg-[#1c1c24] shadow-secondary":"bg-white shadow-secondary"}`} imgUrl={sun} handleClick={handleTheme} />
      </div>
    </div>
  )
}

export default Sidebar