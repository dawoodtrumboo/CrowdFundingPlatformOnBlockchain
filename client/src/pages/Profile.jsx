import React, {useState} from 'react'

import { HomeNav,ProfileCampaigns} from '../components';
import { useStateContext } from '../context'




const Profile = ({darkTheme}) => {

    const { address } = useStateContext();

  return (
    <>
    <div className='hidden sm:block'>
    <HomeNav darkTheme={darkTheme}/>
    </div>
    {address ? (
        <ProfileCampaigns darkTheme={darkTheme} />
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
        <h1 className={`text-[40px] font-epilogue mt-[-140px] font-semibold ${darkTheme?" text-white":"text-black"} `} >Wallet is not connected</h1>
        </div>
      )}
  
    </>
  )
}

export default Profile