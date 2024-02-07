import { NextResponse } from 'next/server'


function middleware(req: any) {
  const verify = req.cookies.get('authToken')
  const url = req.url

  if (!verify && url.includes('/dashboard')) {
    return NextResponse.redirect('http://sadeem-store-demo.vercel.app/login')
  }
}

export default middleware