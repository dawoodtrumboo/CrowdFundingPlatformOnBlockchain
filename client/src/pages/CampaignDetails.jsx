import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';


import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, HomeNav} from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb , logo} from '../assets';

const CampaignDetails = ({darkTheme}) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div>
      <div className='hidden md:block'>
      <HomeNav darkTheme={darkTheme} />
      </div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className={`relative w-full h-[5px]  mt-2 ${darkTheme? "bg-[#3a3a43]" : "bg-white"}`}>
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} darkTheme={darkTheme} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} darkTheme={darkTheme} />
          <CountBox title="Total Backers" value={donators.length} darkTheme={darkTheme} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] uppercase  ${darkTheme? "text-white" : "text-black"}`}>Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className={`font-epilogue font-semibold text-[14px] break-all ${darkTheme? "text-white" : "text-black"}`}>{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] uppercase ${darkTheme? "text-white" : "text-black"}`}>Story</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"  style={{
    whiteSpace: 'pre-line',
    fontFamily: 'Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Arial, sans-serif', // Fonts that include emoji characters
  }}>{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] uppercase ${darkTheme? "text-white" : "text-black"}`}>Donators</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll truncate">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                )}
              </div>
          </div>
        </div>

        <div className="flex-1">
          {/* <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>    */}

          <div className={`mt-[20px] flex flex-col p-4  rounded-[10px] ${darkTheme? "bg-[#1c1c24]" : "bg-white"}`}>
            <p className={`font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191] ${darkTheme? "text-[#808191]" : "text-black"}`}>
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className={`w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] ${darkTheme? "text-white":"text-black"}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className={`my-[20px] p-4 rounded-[10px] ${darkTheme? "bg-[#13131a]" : "bg-[#F3F2F9]"}`}>
                <h4 className={`font-epilogue font-semibold text-[14px] leading-[22px]  ${darkTheme? "text-white " : "text-black"}`}>Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails