// pages/api/products/get-products.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db' // Verifique se o caminho para db está correto

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await db.product.findMany()
      return res.status(200).json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .end(`Method ${req.method} Not Allowed`)
  }
}

// A exportação padrão deve ser removida, ou se você quiser manter a estrutura, faça assim:
export default handler
