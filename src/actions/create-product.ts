'use server'

import { prisma } from '@/lib/prisma'

interface ProductDto {
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  imageTitle: string
  imagePath: string
}

export async function createProduct(data: ProductDto) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        retailPrice: data.retailPrice,
        wholesalePrice: data.wholesalePrice,
        minQuantity: data.minQuantity,
        imageTitle: data.imageTitle,
        imagePath: data.imagePath,
      },
    })

    return { success: true, product }
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return { success: false, error: (error as Error).message }
  }
}
