'use client';

import { useState, useEffect, ChangeEvent } from 'react'

import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { ProductProps } from '@/types'
import { ProductCard, SearchBar, Loader, Astronaut } from '@/components'
import getProducts from '@/api-req/getProducts'


function ProductsList() {

  let allProducts;
  let lostSignal;
  let errorMsg: string;

  if (Cookies.get('translateTo') === 'En') {
    allProducts = 'جميع المنتجات'
    lostSignal = 'أووه... لقد فقدنا إشارتك'
    errorMsg = '!فشل الحصول على المنتجات'

  } else {
    allProducts = 'All Products'
    lostSignal = 'Oops... we lost your signal'
    errorMsg = 'Failed to get products!'
  };

  const [searchQuery, setSearchQuery] = useState('')
  const [goSearch, setGoSearch] = useState('')
  const [products, setProducts] = useState<ProductProps[]>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    setProducts(undefined);

    getProducts(goSearch)
      .then((data) => {
        setProducts(data);
        setSearchQuery('');
      })

      .catch((error) => {
        console.error('Error with creating order:', error);
        toast.error(errorMsg);
        setProducts([]);
        setSearchQuery('');
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goSearch]);
  
  return (
    <section id='all-products'
      className="min-h-[100svh] flex flex-col px-7 py-28 
      bg-gradient-to-b from-navy to-lightBlack"
    >
      
      <div className='flex flex-wrap justify-center items-center mb-[100px]'>
        <h1 className='text-4xl sm:text-5xl mr-0 sm:mr-5 mb-7 md:mb-0'>
          {allProducts}
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          handleChange={handleChange}
          handleSearch={() => {setGoSearch(searchQuery)}}
        />
      </div>

      <div className="flex justify-center flex-wrap gap-10">
        {typeof products !== 'undefined' && products.length > 0 ?
          products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
            />
          )) :

          typeof products !== 'undefined' ? 
          <div className="relative w-full md:w-[800px] h-[60vh] overflow-hidden flex">
            <span className="w-full text-center text-2xl text-graySec">
              {lostSignal}
            </span>
            <Astronaut/>
          </div> :
          
          <div className="w-full text-center mt-32">
            <Loader width='w-[50px]' height='h-[50px]' borderWidth='border-[4px]'/>
          </div>
        }
      </div>

    </section>
  );
}

export default ProductsList