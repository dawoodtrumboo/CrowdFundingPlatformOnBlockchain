import React from 'react'

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange, darkTheme }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className={`font-epilogue font-medium text-[14px] leading-[22px] mb-[10px] ${ darkTheme? "text-[#808191]" : "text-black"}`}>{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${ darkTheme? "text-white" : "text-black"}`}
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${ darkTheme? "text-white" : "text-black"}`}
        />
      )}
    </label>
  )
}

export default FormField