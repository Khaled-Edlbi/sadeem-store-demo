import Cookies from 'js-cookie'

import { SearchBarProps } from '@/types'
import { CustomBtn } from '@/components'


function SearchBar(
  { searchQuery, handleChange, handleSearch }: SearchBarProps
  ) {

  const translateToArbic = Cookies.get('translateTo') === 'En'
  const searchLabel = translateToArbic ? 'ابحث' : 'Search'
  const texthDir = translateToArbic && 'text-right'

  return (
    <div className="w-[300px] h-[45px] 
      flex items-center justify-between
      bg-gray-800/60 rounded shadow
      border border-transparent
      hover:border-glass duration-200
      pl-3 py-1.5 md:w-[400px]"
    >
      <input
        type="text" 
        maxLength={100}
        placeholder={searchLabel}
        value={searchQuery}
        onChange={handleChange}
        className={`w-full bg-transparent outline-none ${texthDir}`}
      />

      <CustomBtn
        btnType='submit'
        handleClick={handleSearch}
        containerStyles="text-gray-500 p-3"
        icon="fa-solid fa-magnifying-glass"
      />

    </div>
  )
}

export default SearchBar