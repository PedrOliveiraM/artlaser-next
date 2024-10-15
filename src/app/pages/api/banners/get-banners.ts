// pages/api/products/get-products.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const banners = await db.banner.findMany()
      return res.status(200).json(banners)
    } catch (error) {
      console.error('Error fetching banners:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
