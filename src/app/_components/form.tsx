import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function Form() {
  async function uploadImage(formData: FormData) {
    'use server'
    const imageFile = formData.get('image') as File
    if (!imageFile) return // Verifica se o arquivo de imagem existe antes de prosseguir
    await put(imageFile.name, imageFile, {
      access: 'public',
    })
    revalidatePath('/')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Evita o envio padrão do formulário
    const formData = new FormData(event.currentTarget) // Obtém os dados do formulário
    await uploadImage(formData) // Chama a função para fazer o upload
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button type="submit">Upload</button>
    </form>
  )
}
