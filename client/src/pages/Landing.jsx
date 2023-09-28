import React from 'react';
import { useStateContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components';




const Landing = ({darkTheme}) => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();


  const divStyle = {
    backgroundImage: darkTheme ? "url('https://i.imgur.com/vlwBDHh.png')" : "url('https://i.imgur.com/Q9IEnkD.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className=' ml-[-15px] w-[110%] mt-[-75px]  lg:w-[117%] lg:ml-[-138px] lg:mt-[-17px] md:w-[127%] md:ml-[-138px] md:mt-[-17px] ' style={divStyle}>
      



      <div className='flex flex-col justify-center items-center h-screen bg-opacity-50'>
        <h1 className={` text-[40px] max-w-[490px] text-center font-sans font-semibold ${darkTheme?"text-white":"text-black"}`}>
          Start a <span style={{ color: '#13B77C' }}>fundraiser</span> for{' '}
          <span style={{ color: '#13B77C' }}>people</span> that you{' '}
          <span style={{ color: '#13B77C' }}>care</span> about.
        </h1>
        <p className={`font-sans font-thin text-[11px] ${darkTheme?"text-white":"text-black"}`}>
          Be a part of the breakthrough and make someone’s dream come true.
        </p>
        <div className={`flex justify-between ${address?"w-[360px]":" w-[300px]"}`}>
        <CustomButton
        btnType='button'
        title={'Go to Dashboard'}
        styles={'bg-[#1dc071] rounded-[50px] mt-[20px] font-sans font-light text-[11px] leading-[0px]'}
        handleClick={() => {
            navigate('/dashboard'); 
         
        }}
      />
      <CustomButton
         btnType="button"
         title={address ? 'Create a campaign' : 'Connect'}
         styles={`border-solid border-[1px] hover:bg-[#1dc071] transition delay-50
          hover:delay-100  border-[#1dc071] bg-transparent rounded-[50px] mt-[20px] 
          font-sans font-light text-[11px] leading-[0px] text-black  ${(address?"":"px-[30px]")}`}
         handleClick={() => {
           if(address) navigate('create-campaign')
           else connect();
         }}
      />
      </div>
      <p onClick={() => {
         navigate('/profile'); // Navigate to the profile page
        }}
        className={`font-thin text-[11px] underline underline-offset-2 decoration-0  transition delay-50 mt-[10px] cursor-pointer ${darkTheme? "hover:text-[#67ff7b] text-[#1dc071]":"text-black"} `}>See your existing fundraisers</p>
      
      </div>
    
    </div>
  );
};

export default Landing;
