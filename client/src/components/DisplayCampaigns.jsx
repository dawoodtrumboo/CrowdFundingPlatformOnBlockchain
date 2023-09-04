import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';
import categories from '../constants/categories.json'; // Import your categories JSON
import CategoryButton from './CategoryButton';

import { daysLeft } from '../utils';

const DisplayCampaigns = ({ title, isLoading, campaigns, searchTerm, darkTheme }) => {
  const navigate = useNavigate();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default selected category


  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  }

  // useEffect(() => {

  //   if (searchTerm === '') {
  //     setFilteredCampaigns(campaigns);
  //   } else {
  //     const filtered = campaigns.filter((element) =>
  //       element.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredCampaigns(filtered);
  //   }
  // }, [searchTerm, campaigns]);
  useEffect(() => {
    let filtered = campaigns;
  
    if (selectedCategory !== 'All') {
      const selectedKeywords = categories[selectedCategory.toLowerCase()];
  
      if (selectedKeywords) {
        filtered = filtered.filter((element) =>
          selectedKeywords.some(keyword =>
            element.title.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      }
    }
  
    if (searchTerm) {
      filtered = filtered.filter((element) =>
        element.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredCampaigns(filtered);
  }, [searchTerm, selectedCategory, campaigns]);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter out campaigns with a deadline less than 1 day
  const filteredCampaignsToRender = filteredCampaigns.filter((campaign) => {
    const remainingDays = daysLeft(campaign.deadline);
    return remainingDays >= 1;
  });

  const countToDisplay = campaigns.length - (campaigns.length - filteredCampaignsToRender.length);
  return (
    <div>

<div className="flex justify-between items-center">
        <h1 className={`font-epilogue font-semibold text-[18px] text-left ${darkTheme ? 'text-white' : 'text-black'}`}>
          {title} ({countToDisplay})
        </h1>
        {/* Category Dropdown */}
        <select
          className={`px-3 py-1 text-sm rounded-md mr-[30px] ${darkTheme? " bg-[#1c1c24] text-white": " bg-white text-gray-700"}`}
          value={selectedCategory}
          onChange={handleCategorySelect}
        >
          <option value="All">All</option>
          {Object.keys(categories).map((category) => (
            <CategoryButton key={category} category={category} />
          ))}
        </select>
      </div>      {searchTerm && searchTerm.length > 0 ? <h1 className={`font-epilogue font-normal text-[15px] text-left ${darkTheme ? "text-white" : "text-black"}`}> Search Result ({filteredCampaigns.length})</h1> : ""}

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}
        {filteredCampaignsToRender.length > 0 && filteredCampaignsToRender.map((filteredCampaign) => <FundCard
          key={uuidv4()}
          darkTheme={darkTheme}
          {...filteredCampaign}
          handleClick={() => handleNavigate(filteredCampaign)}
        />)}

        {filteredCampaignsToRender.length === 0 && !isLoading && campaigns.length > 0 && campaigns.map((campaign) => {
          const remainingDays = daysLeft(campaign.deadline);
          // Only render campaigns with a deadline greater than or equal to 1 day
          if (remainingDays >= 1) {
            return (
              <FundCard
                key={uuidv4()}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
                darkTheme={darkTheme}
              />
            );
          }
          return null; // Skip rendering campaigns with a deadline less than 1 day
        })}
      </div>
    </div>
  )
}

export default DisplayCampaigns;
