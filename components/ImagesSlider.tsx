'use client'

import { useState } from "react"

import { ImageProps } from '@/types'

interface ImagesProps {
  images: ImageProps[]
}


function ImagesSlider({ images }: ImagesProps) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative flex flex-col min-h-[px] group">
      
      <div className="absolute top-[50%] translate-y-[-50%]
        w-full hidden justify-between group-hover:flex text-2xl"
      >
        <button className="w-8 bg-glass rounded" type="button" onClick={prevSlide}>
          <i className="fa-solid fa-angle-left"></i>
        </button>

        <button className="w-8 bg-glass rounded" type="button" onClick={nextSlide}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>

      <div
        style={{ backgroundImage: `url(${images[currentIndex].imageUrl})` }}
        className="w-[260px] sm:w-[350px] h-[260px] sm:h-[350px]
        self-center bg-center bg-cover rounded-xl duration-300
        group-hover:scale-95"
      ></div>

      <div className="self-center flex justify-center mt-5 gap-2">
        {images.map((_, slideIndex) => {
          let currentSlideStyle = currentIndex === slideIndex ? 'w-6 bg-milk' : 'w-2 bg-milk/20'
          return (
            <div 
              key={slideIndex}
              onClick={() => {goToSlide(slideIndex)}}
              className={`
                h-2 rounded-full
                cursor-pointer duration-300
                ${currentSlideStyle}
              `}
            ></div>
          );
        })}
      </div>

    </div>
  )
}

export default ImagesSlider