import React, { useState, useEffect } from 'react'

import { DisplayCampaigns, HomeNav } from '../components';
import { useStateContext } from '../context'

const Profile = ({darkTheme}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <>
    <HomeNav darkTheme={darkTheme}/>
    <DisplayCampaigns 
      title="Your Campaigns"
      darkTheme={darkTheme}
      isLoading={isLoading}
      campaigns={campaigns}
    />
    </>
  )
}

export default Profile