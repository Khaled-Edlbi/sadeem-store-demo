'use client'

import Cookies from 'js-cookie'

import {
    enTitle, arTitle, 
    enSubTitle, arSubTitle,
    enHeroBtn, arHeroBtn
} from '@/app/static-texts'

import { CustomBtn } from '@/components'


function Hero() {

  let mainTitle;
  let mainSubTitle;
  let mainHeroBtn;

  if (Cookies.get('translateTo') === 'En') {
    mainTitle = arTitle
    mainSubTitle = arSubTitle
    mainHeroBtn = arHeroBtn

  } else {
    mainTitle = enTitle
    mainSubTitle = enSubTitle
    mainHeroBtn = enHeroBtn
  };

  return (
    <section className='hero-section'>
      
      <div className="flex flex-col items-center md:items-start
        mt-4 mx-12 md:ml-44"
      >
        <h2 className="text-5xl text-center">
          {mainTitle}
        </h2>

        <h3 className="text-xl text-center mt-4 mb-8 md:ml-7">
          {mainSubTitle}
        </h3>

        <a href='#all-products'>
          <CustomBtn
            btnType='button'
            title={mainHeroBtn}
            containerStyles="
            w-36 text-lg p-2 bg-glassy-gradient
            border border-glass backdrop-blur rounded
            hover:scale-105 duration-200
            shadow-xl hover:shadow-2xl md:ml-7"
          />
        </a>
      </div>

    </section>
  )
}

export default Hero