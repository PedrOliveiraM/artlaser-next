import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(): Promise<NextResponse> {
  try {
    const products = await db.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
