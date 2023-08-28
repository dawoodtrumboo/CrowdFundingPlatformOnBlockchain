import React from 'react'

const CountBox = ({ title, value, darkTheme }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className={`font-epilogue font-bold text-[30px] p-3 rounded-t-[10px] w-full text-center truncate ${darkTheme? "text-white  bg-[#1c1c24]" : "text-black  bg-white"} `}>{value}</h4>
      <p className={`font-epilogue font-normal text-[16px]   px-3 py-2 w-full rouned-b-[10px] text-center ${darkTheme? "text-[#808191] bg-[#28282e]" : "text-[#1D2C3C]  bg-[#F3F2F9]"} `}>{title}</p>
    </div>
  )
}

export default CountBox