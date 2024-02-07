'use client'

import { useEffect } from 'react'

import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { TokenProps } from '@/types'

import {
  getImgurToken,
  checkImgurToken,
  generateImgurToken,
  updateImgurToken,
} from '@/api-req'


function PrepareToken() {
  
  useEffect(() => {
    if (!Cookies.get("imgurAccessToken")) {

      getImgurToken()
      .then((token) => {
        isValidToken(token)
      })
      
      .catch((error) => {
        console.error('Error with get token api', error);
        toast.error('Failed to get imgur token!');
      })
    };
  });

  const isValidToken = (token: TokenProps) => {

    checkImgurToken(token.accessToken)
      .then(() => {
        Cookies.set('imgurAccessToken', token.accessToken, { expires: 1 });
      })

      .catch((error => {
        console.error('Error with get feedback api', error);
        generateNewToken(token.user, token.refreshToken);
      }))
  };
  
  const generateNewToken = (user:number, refreshToken: string) => {

    generateImgurToken(refreshToken)
      .then((response) => {
        storeNewToken({
            user: user,
            accessToken: response.access_token, 
            refreshToken: response.refresh_token
          });
      })

      .catch((error) => {
        console.error('Error with generate imgur token api', error);
        toast.error('Failed to generate imgur token!');
      })
  };

  const storeNewToken = (newToken: TokenProps) => {

    updateImgurToken(newToken)
      .then((storedToken) => {
        Cookies.set('imgurAccessToken', storedToken.accessToken, { expires: 1 });
      })

      .catch((error) => {
        console.error('Error with update imgur token api', error);
        toast.error('Failed to update imgur token!');
      })
  };

  return <></>
}

export default PrepareToken