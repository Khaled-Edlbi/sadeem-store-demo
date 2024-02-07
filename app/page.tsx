import React from 'react'

import {
   Header, Hero, ProductsList, Footer, ToastContainerAbs
} from '@/components'


function Home() {
  return (
    <main className='relative'>
      <Header/>
      <Hero/>
      <ProductsList/>
      <Footer/>
      <ToastContainerAbs/>
    </main>
  )
}

export default Home