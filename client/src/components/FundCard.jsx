import React from 'react';

import { tagType, thirdweb, logo } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick, darkTheme }) => {
  const remainingDays = daysLeft(deadline);
  
  return (
    <div className={`sm:w-[288px] w-full rounded-[15px]  cursor-pointer ${darkTheme?"bg-[#1c1c24]":"bg-white"}`} onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
        </div> */}

        <div className="block">
          <h3 className={`font-epilogue font-semibold text-[16px] text-left leading-[26px] truncate ${darkTheme?" text-white":"text-black"}`}>{title}</h3>
          <p className={`mt-[5px] font-epilogue font-normal text-left leading-[18px] truncate ${darkTheme?" text-[#808191]":"text-black"}`}>{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className={`font-epilogue font-semibold text-[14px] leading-[22px] ${darkTheme?" text-[#b2b3bd]":"text-black"}`}>{amountCollected}</h4>
            <p className={`mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate ${darkTheme?" text-[#808191]":"text-black"}`}>Raised of {target}</p>
          </div>
          <div className="flex flex-col">
            <h4 className={`font-epilogue font-semibold text-[14px] leading-[22px] ${darkTheme?" text-[#b2b3bd]":"text-black"}`}>{remainingDays}</h4>
            <p className={`mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate ${darkTheme?" text-[#808191]":"text-black"}`}>Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className={`w-[30px] h-[30px] rounded-full flex justify-center items-center  ${darkTheme?" bg-[#13131a]":"bg-[#F3F2F9]"}`}>
            <img src={logo} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className={`flex-1 font-epilogue font-normal text-[12px]  truncate ${darkTheme?" text-[#808191]":"text-black"}`}>by <span className={`${darkTheme?" text-[#b2b3bd]":"text-black"}`}>{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard