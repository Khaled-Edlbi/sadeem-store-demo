'use client'

import Link from 'next/link'

import Cookies from 'js-cookie'

import { facebookLink, instagramLink, telegramLink } from '@/app/static-texts'
import { phoneNumber, githupAccount } from '@/app/static-texts'


function Footer() {

  const translateTo = Cookies.get('translateTo') === 'En'
  
  let followUs;
  let contactUs;
  let developedBy;
  let developer;
  let contactUsDir;

  if (translateTo) {
    followUs = 'تابعنا'
    contactUs = ':تواصل معنا'
    developedBy = 'تطوير الموقع من قبل:'
    developer = 'خالد إدلبي'
    contactUsDir = 'text-right'

  } else {
    followUs = 'Follow Us'
    contactUs = 'Contact Us:'
    developedBy = 'Developed By:'
    developer = 'Khaled Edlbi'
  };

  const socialMediaIcon = "flex justify-center items-center w-12 h-12 \
  bg-glass p-2 rounded hover:bg-grayCard-600 hover:scale-105 duration-200"

  return (
    <footer id='footer' 
      className="flex flex-col justify-center items-center 
      p-8 bg-gradient-to-b from-blackHole to-lightBlack"
    >
      <h2 className="text-xl mb-4">{followUs}</h2>
      
      <div className="flex gap-2 mb-3">

        <Link href={facebookLink} 
          className={`text-2xl ${socialMediaIcon}`}
        >
          <i className="fa-brands fa-meta"></i>
        </Link>

        <Link href={instagramLink}
          className={`text-[30px] ${socialMediaIcon}`}
        >
          <i className="fa-brands fa-instagram"></i>
        </Link>

        <Link href={telegramLink}
          className={`text-[30px] ${socialMediaIcon}`}
        >
          <i className="fa-brands fa-telegram"></i>
        </Link>

      </div>

      <div className="m-5">
        <h2 className={contactUsDir}>{contactUs}</h2>
        <span>{phoneNumber}</span>
      </div>

      <h2 className='text-lg'>
        {developedBy} ©&nbsp;
        <Link 
          href={githupAccount} 
          className="hover:text-sky-400"
        >
          {developer}
        </Link>
      </h2>
    </footer>
  )
}

export default Footer