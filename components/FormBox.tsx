import Cookies from 'js-cookie'

import { FormBoxProps } from '@/types'


function FormBox(
  { boxStyle='h-[50px]', inputStyle, labelStyle, labelName,
    inputId, inputType, setMaxLength=100, required=true, 
    pattern, value, setValue, isTextArea=false
  }: FormBoxProps ) {
  
  const translateToArbic = Cookies.get('translateTo') === 'En'
  const inputTextDir = translateToArbic && 'text-right'

  const inputBoxStyle = `w-full h-full text-xl p-4 
  bg-glass border border-glass outline-none rounded
  hover:border-graySec focus:border-graySec 
  peer placeholder-transparent duration-200
  ${inputTextDir} ${inputStyle}`

  return (
    <div className={`relative ${boxStyle}`}>

      {isTextArea ? 
        <textarea
          rows={10}
          cols={40}
          id={inputId}
          name={inputId}
          required={required}
          value={value}
          onChange={setValue}
          placeholder='invisible'
          className={inputBoxStyle}
        /> : 
        
        <input
          id={inputId}
          name={inputId}
          type={inputType}
          maxLength={setMaxLength}
          required={required}
          pattern={pattern}
          value={value}
          onChange={setValue}
          placeholder='invisible'
          className={inputBoxStyle}
        />
      }

      <label
        htmlFor={inputId} 
        className={`text-graySec text-lg duration-200
        absolute top-[-15px] left-[16px] translate-y-[-16px]
        peer-placeholder-shown:top-[50%]
        peer-placeholder-shown:translate-y-[-50%]
        peer-placeholder-shown:text-xl
        peer-focus:text-lg
        peer-focus:text-milk
        peer-focus:top-[-15px]
        peer-focus:translate-y-[-16px]
        ${labelStyle}`}
      >
        {labelName}
      </label>

    </div>
  )
}

export default FormBox