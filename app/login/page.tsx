'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { FormBox, CustomBtn, Loader, ToastContainerAbs} from '@/components'
import { auth } from '@/api-req'


function Login() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: 'demo',
    password: '123456',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    auth(formData.username, formData.password)
      .then((authToken) => {
        Cookies.set('authToken', authToken.token, { expires: 1 });
        router.push('/dashboard');
      })

      .catch((error) => {
        setIsProcessing(false);
        console.error('Error with auth api:', error);
        toast.error('Wrong credentials!');
      })
  };
  
  return (
    <main className="h-[100svh] bg-blackBg 
      flex justify-center items-center"
    >
      <div className="w-[420px] h-[520px]
        flex flex-col items-center rounded-md 
        m-4 p-8 bg-grayCard-400"
      >
        <h2 className="text-4xl mt-4 mb-24">
          Sign In
        </h2>

        <form 
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-12"
        >
          <FormBox
            inputId='username'
            inputType='text'
            value={formData.username}
            setValue={handleChange}
            labelName='Username'
            boxStyle='w-full h-[50px]'
            inputStyle='bg-grayCard-800'
            labelStyle='text-milk'
          />

          <FormBox
            inputId='password'
            inputType='password'
            value={formData.password}
            setValue={handleChange}
            labelName='Password'
            boxStyle='w-full h-[50px]'
            inputStyle='bg-grayCard-800'
            labelStyle='text-milk'
          />

          <div className="w-full h-[1px] bg-glass"></div>

          <div className="w-full h-[50px] 
            bg-grayCard-800/80 text-xl rounded 
            shadow-themeCyan animate-RGB ease duration-300
            hover:shadow-neonCyan active:bg-themeCyan"
          >
            {isProcessing ?
              <div className="w-full flex justify-center items-center p-3 gap-2">
                <Loader width='w-[22px]' height='h-[22px]'/>Logging...
              </div> :

              <CustomBtn
                btnType='submit'
                title='Login'
                containerStyles='w-full p-3'
              />
            }
          </div>
        </form>
      </div>

      <ToastContainerAbs/>
    </main>
  )
}

export default Login