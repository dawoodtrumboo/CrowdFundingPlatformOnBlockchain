import React from 'react';

import { tagType, thirdweb, logo } from '../assets';
import { daysLeft } from '../utils';

const CampaignCard = ({ title, target, deadline, amountCollected, image, handleClick, darkTheme }) => {
    const remainingDays = daysLeft(deadline);
    
    return (
      <div className={`w-full cursor-pointer ${darkTheme ? "bg-[#1c1c24]" : "bg-white"}`} onClick={handleClick}>
        <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center w-[350px]'>
          <img className='w-[45px] h-[45px] rounded-[50%]' src={image} />
          <h3 className={`font-epilogue font-normal text-[16px] text-left leading-[26px] truncate ${darkTheme ? "text-white" : "text-black"}`}>{title}</h3>
          </div>
          <h3 className={`font-epilogue font-normal w-[100px] text-[16px] text-center leading-[26px]  truncate ${darkTheme ? "text-white" : "text-black"}`}>{amountCollected}/{target}</h3>
          <h3 className={`font-epilogue font-normal text-[16px] text-left leading-[26px] truncate ${darkTheme ? "text-white" : "text-black"}`}>{remainingDays}</h3>
        </div>
      </div>
    );
  };

export default CampaignCard