import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(): Promise<NextResponse> {
  try {
    const banners = await db.banner.findMany()
    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
