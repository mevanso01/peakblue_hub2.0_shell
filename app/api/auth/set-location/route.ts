import { NextRequest, NextResponse } from 'next/server'
import { coreapiSetLocation } from '@/lib/coreapi'
import { COOKIE_COREAPI_JWT } from '@/lib/cookies'

export async function POST(req: NextRequest){
  const { lid, token } = await req.json()
  if(!lid || !token) return NextResponse.json({error:'Missing lid or token'}, {status:400})
  try{
    const data = await coreapiSetLocation(token, Number(lid))
    const jwt = data?.token || data?.content?.token || data?.access_token
    if(!jwt) return NextResponse.json({error:'No JWT returned from CoreAPI'}, {status:400})
    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_COREAPI_JWT, jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 6
    })
    return res
  }catch(e:any){
    return NextResponse.json({error: e.message || 'Set location failed'}, {status: 400})
  }
}
