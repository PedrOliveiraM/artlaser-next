'use server'

import { revalidatePath } from 'next/cache'

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get('id'))
  return id
  // await deleteProductById(id)
  revalidatePath('/')
}
