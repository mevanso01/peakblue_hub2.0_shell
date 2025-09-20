import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_COREAPI_JWT } from '@/lib/cookies'
import { coreapiGetOtp } from '@/lib/coreapi'

export async function POST(req: NextRequest){
  const jwt = req.cookies.get(COOKIE_COREAPI_JWT)?.value
  if(!jwt) return NextResponse.json({error:'Not authenticated'}, {status:401})
  try{
    const data = await coreapiGetOtp(jwt)
    const otp = data?.otp || data?.content?.otp || data?.data?.otp
    if(!otp) return NextResponse.json({error:'No OTP in response'}, {status:400})
    return NextResponse.json({ otp })
  }catch(e:any){
    return NextResponse.json({error: e.message || 'OTP error'}, {status: 400})
  }
}
