import React from 'react';

import { tagType, thirdweb, logo } from '../assets';
import { daysLeft } from '../utils';
import CustomButton from './CustomButton';

const CampaignCard = ({ title, target, deadline, amountCollected, image, handleClick, darkTheme }) => {
    const remainingDays = daysLeft(deadline);
    
    return (
      <div className={`w-full cursor-pointer ${darkTheme ? "bg-[#1c1c24]" : "bg-white"}`} onClick={remainingDays>0? handleClick:''}>
        <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center w-[350px] '>
          <img className='w-[45px] h-[45px] rounded-[50%]' src={image} />
          <h3 className={`font-epilogue font-normal text-[16px] text-left leading-[26px] truncate  ${darkTheme ? "text-white" : "text-black"}`}>{title}</h3>
          </div>
          <h3 className={`font-epilogue font-normal w-[150px] text-[16px] text-center leading-[26px] truncate ${darkTheme ? "text-white" : "text-black"}`}>{amountCollected} ETH / {target} ETH</h3>
          <h3 className={`font-epilogue font-normal text-[16px]  leading-[26px] truncate w-[60px] border-solid text-center ${darkTheme ? "text-white  " : "text-black"}`}>{remainingDays>=1 ? remainingDays : '0'}</h3>
          <CustomButton 
          btnType="button"
          title={remainingDays>1 ? ' Active' : 'Inactive'}
          styles={`text-[10px] w-[90px] rounded-full  ${remainingDays>1 ? (darkTheme?'bg-[#49D8A3]/[0.15] text-[#1bb87e] ' : 'bg-[#49D8A3]/[0.35] text-[#1bb87e] ' ) :  (darkTheme?'bg-[#E03C3C]/[0.15] text-[#e03c3c]' : 'bg-[#E03C3C]/[0.35] text-[#e03c3c]' ) } `}
        />
        </div>
      </div>
    );
  };

export default CampaignCard