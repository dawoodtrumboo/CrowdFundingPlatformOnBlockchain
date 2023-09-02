import React from 'react'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick, darkTheme }) => {
  return (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && ( darkTheme?'bg-[#2c2f32]':"bg-white shadow-secondary")} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
    </div>
  )
}

export default Icon