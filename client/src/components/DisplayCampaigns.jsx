import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';


const DisplayCampaigns = ({ title, isLoading, campaigns, searchTerm, darkTheme }) => {
  const navigate = useNavigate();
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  useEffect(()=>{
    // setFilteredCampaigns([]);
    if(searchTerm==='') 
    {setFilteredCampaigns(campaigns);}
    else{
    campaigns.map((element)=>{
            if(element.title.toLowerCase().includes(searchTerm.toLowerCase())) setFilteredCampaigns([element])
    
        })
    }},[searchTerm])
  
  // const handleFilter = ()=>{
  //   filteredCampaigns.length===0 ? (campaigns) : (filteredCampaigns);

  //   campaigns.map((element)=>{
  //       if(element.title.includes(searchTerm)) setFilteredCampaigns([...filteredCampaigns,element])
        
  //   })
  // }
  

  
  return (
    <div>
      <h1 className={`font-epilogue font-semibold text-[18px] text-left ${darkTheme? "text-white" : "text-black"}`}>{title} ({campaigns.length})</h1>
     {searchTerm && searchTerm.length>0 ?<h1 className={`font-epilogue font-normal text-[15px] text-left ${darkTheme? "text-white" : "text-black"}`}> Search Result ({filteredCampaigns.length})</h1>:""}


      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        {filteredCampaigns.length>0 && filteredCampaigns.map((filteredCampaigns)=> <FundCard
        key={uuidv4()}
        darkTheme={darkTheme}
        {...filteredCampaigns}
        handleClick={() => handleNavigate
        (filteredCampaigns)} />)}

        {filteredCampaigns.length === 0 && !isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
          darkTheme={darkTheme}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns