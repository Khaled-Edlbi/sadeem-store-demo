'use client'

import { CustomBtnProps } from '@/types'


function CustomBtn (
  { btnType, handleClick, title, containerStyles, icon, iconStyle }
  : CustomBtnProps ) {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className={`flex justify-center items-center
      ${containerStyles}`}
    >
      {icon && (
        <span className={iconStyle}>
          <i className={icon}></i>
        </span>
      )}
      
      {title}
    </button>
  )
}

export default CustomBtn