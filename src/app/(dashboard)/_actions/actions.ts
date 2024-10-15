'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get('id'))
  return id
  // await deleteProductById(id)
  revalidatePath('/')
}

export async function updateStatusBanner(id: number) {
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
