import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns, searchTerm, darkTheme }) => {
  const navigate = useNavigate();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCampaigns(campaigns);
    } else {
      const matchingCampaigns = campaigns.filter((element) =>
        element.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCampaigns(matchingCampaigns);
    }
  }, [searchTerm, campaigns]);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className={`font-epilogue font-semibold text-[18px] text-left ${darkTheme ? 'text-white' : 'text-black'}`}>
        {title} ({campaigns.length})
      </h1>
      {searchTerm && searchTerm.length > 0 && (
        <h1 className={`font-epilogue font-normal text-[15px] text-left ${darkTheme ? 'text-white' : 'text-black'}`}>
          Search Result ({filteredCampaigns.length})
        </h1>
      )}

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className={`font-epilogue font-semibold text-[14px] leading-[30px] ${darkTheme ? 'text-white' : 'text-black'}`}>
            You have not created any campaigns yet
          </p>
        )}

        {filteredCampaigns.length > 0 &&
          filteredCampaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              darkTheme={darkTheme}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}

        {filteredCampaigns.length === 0 && !isLoading && campaigns.length > 0 && (
          <p className={`font-epilogue font-semibold text-[14px] leading-[30px] ${darkTheme ? 'text-white' : 'text-black'}`}>
            No matching campaigns found
          </p>
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
