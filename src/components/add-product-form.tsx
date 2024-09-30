import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ChooseFile from './choose-file'

// Definindo o schema de validação com Zod
const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  retailPrice: z
    .number({ invalid_type_error: 'Retail Price must be a number' })
    .positive({ message: 'Retail Price must be greater than 0' }),
  wholesalePrice: z
    .number({ invalid_type_error: 'Wholesale Price must be a number' })
    .positive({ message: 'Wholesale Price must be greater than 0' }),
  minQuantity: z
    .number({ invalid_type_error: 'Minimum Quantity must be a number' })
    .int()
    .positive({ message: 'Minimum Quantity must be greater than 0' }),
  imageTitle: z.string().min(1, { message: 'Image Title is required' }),
})

type ProductFormValues = z.infer<typeof productSchema>

const AddProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form Data: ', data)
    // Aqui você pode lidar com a submissão do formulário
  }

  return (
    <div className="mx-auto mt-4 rounded-lg bg-white p-6 shadow-md md:w-96 md:max-w-96">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Adicionar Produto
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-1 text-gray-600">
            Image
          </label>
          <ChooseFile />
        </div>
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-600">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 text-gray-600">
            Category
          </label>
          <input
            id="category"
            type="text"
            {...register('category')}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Retail Price */}
        <div className="flex flex-col">
          <label htmlFor="retailPrice" className="mb-1 text-gray-600">
            Retail Price
          </label>
          <input
            id="retailPrice"
            type="number"
            step="0.01"
            {...register('retailPrice', { valueAsNumber: true })}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.retailPrice && (
            <p className="text-sm text-red-500">{errors.retailPrice.message}</p>
          )}
        </div>

        {/* Wholesale Price */}
        <div className="flex flex-col">
          <label htmlFor="wholesalePrice" className="mb-1 text-gray-600">
            Wholesale Price
          </label>
          <input
            id="wholesalePrice"
            type="number"
            step="0.01"
            {...register('wholesalePrice', { valueAsNumber: true })}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.wholesalePrice && (
            <p className="text-sm text-red-500">
              {errors.wholesalePrice.message}
            </p>
          )}
        </div>

        {/* Minimum Quantity */}
        <div className="flex flex-col">
          <label htmlFor="minQuantity" className="mb-1 text-gray-600">
            Minimum Quantity
          </label>
          <input
            id="minQuantity"
            type="number"
            {...register('minQuantity', { valueAsNumber: true })}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.minQuantity && (
            <p className="text-sm text-red-500">{errors.minQuantity.message}</p>
          )}
        </div>

        {/* Image Title */}
        <div className="flex flex-col">
          <label htmlFor="imageTitle" className="mb-1 text-gray-600">
            Image Title
          </label>
          <input
            id="imageTitle"
            type="text"
            {...register('imageTitle')}
            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
          />
          {errors.imageTitle && (
            <p className="text-sm text-red-500">{errors.imageTitle.message}</p>
          )}
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}

export default AddProductForm
