'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Zod schema for form validation
const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  retailPrice: z
    .number()
    .positive({ message: 'Retail price must be positive' }),
  wholesalePrice: z
    .number()
    .positive({ message: 'Wholesale price must be positive' }),
  minQuantity: z
    .number()
    .int()
    .positive({ message: 'Minimum quantity must be positive' }),
  imageTitle: z.string().min(1, { message: 'Image title is required' }),
  imagePath: z.string().optional(), // This will be set after file upload
  status: z.enum(['ativo', 'pausado']).default('ativo'), // Status as enum
  file: z.instanceof(File).optional(), // File input for image upload
})

type ProductFormInputs = z.infer<typeof productSchema>

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
      console.log(data)
      // Implement API call to add product here
      toast({ title: 'Success', description: 'Product added successfully!' })
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-3">
      <div>
        <label htmlFor="name">Nome do produto</label>
        <Input id="name" {...register('name')} placeholder="Product Name" />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="description">Descrição do produto</label>
        <Textarea
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
        <Input id="category" {...register('category')} placeholder="Category" />
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="retailPrice">Preço de Varejo</label>
        <Input
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
          id="wholesalePrice"
          type="number"
          {...register('wholesalePrice')}
          placeholder="Wholesale Price"
        />
        {errors.wholesalePrice && (
          <span className="text-red-500">{errors.wholesalePrice.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="minQuantity">Quantidade Mínima</label>
        <Input
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

      <Button type="submit">Adicionar Produto</Button>
    </form>
  )
}
