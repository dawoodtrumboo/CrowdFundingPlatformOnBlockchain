import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { CountBox, DisplayCampaigns, HomeNav, CampaignCard, Icon} from '../components';
import { useStateContext } from '../context'
import { copy } from '../assets';


const Profile = ({darkTheme}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();


  const { address, contract, getUserCampaigns } = useStateContext();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
  };
  setTimeout(() => {
      setCopied(false);
    }, 3000);


  const totalAmountCollected = campaigns.reduce((total, campaign) => total + parseFloat(campaign.amountCollected), 0);  console.log("total = "+totalAmountCollected)
  return (
    <>
    <HomeNav darkTheme={darkTheme}/>
    <h1 className={`text-[32px] font-epilogue font-semibold mb-10 ${darkTheme?" text-white":"text-black"}`}>Profile</h1>
    <div className='flex justify-between mb-12'>
      <div>
    <h3 className={`text-[20px] font-epilogue mb-3 ${darkTheme?" text-[#808191]":"text-black"}`}>Account Address</h3>
    <div className={`relative flex items-center text-[12px] px-4 py-2 rounded-full ${darkTheme? "text-[#808191] bg-[#28282e]" : "text-[#1D2C3C]  bg-[#F3F2F9]"}`}>
      <span>{address}</span>
      <Icon styles={`w-[22px] h-[22px] `} imgUrl={copy} handleClick={copyToClipboard }  />
        {copied && (
          <div className="left-[340px] absolute z-10 ml-2 bg-green-400 text-white rounded p-1 text-xs animate-bounce">
            Copied!
          </div>
        )}
      
    </div>
     </div>
     <div className='flex'>
    <CountBox title="Campaigns" value={campaigns.length} darkTheme={darkTheme} />
    <div  className="ml-4">
    <CountBox title="Fund Raised" value={totalAmountCollected} darkTheme={darkTheme} />
    </div>
    </div>
    </div>
    <h3 className={`text-[20px] mb-5 ${darkTheme?" text-[#808191]":"text-black"} `}>My campaigns</h3>
    <table className='w-full rounded-t-lg overflow-hidden '>
        <thead className={`font-epilogue font-normal text-[16px] p-6 ${darkTheme? "text-white bg-[#28282e]" : "text-[#1D2C3C]  bg-[#F3F2F9]"} `}>
          <th className='text-start px-8 py-3 w-[673px]'>Campaign Name</th>
          <th >Fund Raised</th>
          <th className='text-end px-8 py-3'>Days Left</th>
        </thead>  
        <tbody className={`${darkTheme? "bg-[#1c1c24]" : "bg-white"}`}>
        {campaigns.map((campaign) => (
    <tr className='mb-1' key={campaign.id} >
      <td colSpan="3" className='px-8 py-3' >
        <CampaignCard
          title={campaign.title}
          target={campaign.target}
          deadline={campaign.deadline}
          amountCollected={campaign.amountCollected}
          image={campaign.image}
          handleClick={() => handleNavigate(campaign)}
          darkTheme={darkTheme}
        />
      </td>
    </tr>
  ))}
        </tbody>
      
    </table>

    {/* <DisplayCampaigns 
      title="Your Campaigns"
      darkTheme={darkTheme}
      isLoading={isLoading}
      campaigns={campaigns}
    /> */}
    </>
  )
}

export default Profile