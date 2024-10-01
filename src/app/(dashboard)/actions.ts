'use server'

import { deleteProductById } from '../../../pages/api/products/route'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get('id'))
  await deleteProductById(id)
  revalidatePath('/')
}
