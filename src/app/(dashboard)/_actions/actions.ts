'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get('id'))
  return id
  // await deleteProductById(id)
  revalidatePath('/')
}

export async function updateBannerStatus(id: number) {
  const banner = await db.banner.findUnique({
    where: { id },
  })

  if (!banner) throw new Error(`The Id banner ${id} not found`)

  const updatedBanner = await db.banner.update({
    where: { id },
    data: {
      status: !banner.status,
    },
  })

  return {
    status: true,
    msg: 200,
    data: updatedBanner,
  }
}
export async function updateProductStatus(id: number) {
  try {
    const product = await db.product.findUnique({ where: { id } })

    if (!product) {
      throw new Error(`Product with Id ${id} not found`)
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        status: !product.status,
      },
    })

    return {
      success: true,
      message: 'Product status updated successfully',
      data: updatedProduct,
    }
  } catch (error) {
    throw new Error(`Failed to update product status: ${error}`)
  }
}
