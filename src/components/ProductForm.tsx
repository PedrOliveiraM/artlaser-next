'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'

// Zod schema for form validation
const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  retailPrice: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: 'Retail price must be positive' }),
  ),
  wholesalePrice: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: 'Wholesale price must be positive' }),
  ),
  minQuantity: z.preprocess(
    (value) => Number(value),
    z.number().int().positive({ message: 'Minimum quantity must be positive' }),
  ),
  imageTitle: z.string().min(1, { message: 'Image title is required' }),
  imagePath: z.string().optional(), // This will be set after file upload
  status: z.enum(['ativo', 'pausado']).default('ativo'), // Status as enum
  file: z.instanceof(File).optional(), // File input for image upload
})

export type ProductFormInputs = z.infer<typeof productSchema>

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  })
  const { toast } = useToast()

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const formData = new FormData()

      // Adiciona os campos do formulário ao FormData
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('category', data.category)
      formData.append('retailPrice', data.retailPrice.toString())
      formData.append('wholesalePrice', data.wholesalePrice.toString())
      formData.append('minQuantity', data.minQuantity.toString())
      formData.append('imageTitle', data.imageTitle)

      // Adiciona o arquivo se ele foi enviado
      if (data.file) {
        formData.append('file', data.file)
      }

      const response = await fetch('/api/uploads/add-product', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar o produto.')
      }

      const result = await response.json()
      console.log('Upload bem-sucedido:', result)
      toast({
        title: 'Success',
        description: 'Produto adicionado com sucesso!',
      })
    } catch (error) {
      toast({ title: 'Erro', description: (error as Error).message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4 p-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Cadastrar Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label htmlFor="name">Nome do produto</label>
            <Input
              required
              id="name"
              {...register('name')}
              placeholder="Product Name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="description">Descrição do produto</label>
            <Textarea
              required
              id="description"
              {...register('description')}
              placeholder="Product Description"
              maxLength={100}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="category">Categoria</label>
            <Input
              required
              id="category"
              {...register('category')}
              placeholder="Category"
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="retailPrice">Preço de Varejo</label>
            <Input
              required
              id="retailPrice"
              type="number"
              {...register('retailPrice')}
              placeholder="Retail Price"
            />
            {errors.retailPrice && (
              <span className="text-red-500">{errors.retailPrice.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="wholesalePrice">Preço de Atacado</label>
            <Input
              required
              id="wholesalePrice"
              type="number"
              {...register('wholesalePrice')}
              placeholder="Wholesale Price"
            />
            {errors.wholesalePrice && (
              <span className="text-red-500">
                {errors.wholesalePrice.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="minQuantity">Quantidade Mínima</label>
            <Input
              required
              id="minQuantity"
              type="number"
              {...register('minQuantity')}
              placeholder="Minimum Quantity"
            />
            {errors.minQuantity && (
              <span className="text-red-500">{errors.minQuantity.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="imageTitle">Título da Imagem</label>
            <Input
              required
              id="imageTitle"
              {...register('imageTitle')}
              placeholder="Image Title"
            />
            {errors.imageTitle && (
              <span className="text-red-500">{errors.imageTitle.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="file">Upload da Imagem</label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <Input
                  required
                  id="file"
                  type="file"
                  accept="image/*" // Limit file type to images
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null // Use optional chaining and fallback to null
                    field.onChange(file) // Pass the file to the onChange function
                  }}
                />
              )}
            />
            {errors.file && (
              <span className="text-red-500">{errors.file.message}</span>
            )}
          </div>

          <div className="flex items-center">
            <span className="mr-4">Status:</span>
            <div className="flex items-center">
              <Input
                required
                type="radio"
                value="ativo"
                {...register('status')}
                id="ativo"
              />
              <label htmlFor="ativo" className="ml-2">
                Ativo
              </label>
            </div>
            <div className="ml-4 flex items-center">
              <Input
                required
                type="radio"
                value="pausado"
                {...register('status')}
                id="pausado"
              />
              <label htmlFor="pausado" className="ml-2">
                Pausado
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={'/pages/dashboard'}>
            <Button type="button" variant={'alert'}>
              Voltar
            </Button>
          </Link>

          <Button type="submit">Adicionar Produto</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
