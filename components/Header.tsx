'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Cookies from 'js-cookie'

import { enStoreName, arStoreName } from '@/app/static-texts'
import { CustomBtn } from '@/components'


function Header () {

  const currentTranslateValue = Cookies.get('translateTo') === 'En' ? 'En' : 'Ar'
  const [translateTo, setTranslateTo] = useState(currentTranslateValue)
  const router = useRouter()

  const handleTranslate = () => {
    const newTranslateTo = translateTo === 'En' ? 'Ar' : 'En';
    setTranslateTo(newTranslateTo);
    Cookies.set('translateTo', newTranslateTo, { expires: 1 });
    router.refresh();
  };

  return (
    <header className="
      fixed top-0 left-0 right-0 z-10
      flex justify-between items-center
      backdrop-blur shadow-md
      px-2 sm:px-5 md:px-10 py-1 sm:py-2.5"
    >
      <Link href="#" className="flex items-center text-3xl -tracking-tighter">
        <Image
          src="/Logo.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full shadow-md mr-3"
        />
        {translateTo === 'En' ? arStoreName  : enStoreName}
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/dashboard" 
          className="text-xl border-b border-transparent hover:border-milk"
        >
          {translateTo === 'En' ? "لوحة القيادة"  : "Dashboard"}
        </Link>

        <CustomBtn
          btnType='button'
          handleClick={handleTranslate}
          title={translateTo}
          containerStyles="bg-glass p-2 rounded 
          hover:scale-105 duration-100"
          icon="fa-solid fa-globe"
          iconStyle="mr-2"
        />
      </div>

    </header>
  )
}
  
export default Header