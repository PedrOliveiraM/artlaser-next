import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register('description')} />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input id="category" type="text" {...register('category')} />
          {errors.category && (
            <p className="error">{errors.category.message}</p>
          )}
        </div>

        {/* Retail Price */}
        <div className="form-group">
          <label htmlFor="retailPrice">Retail Price</label>
          <input
            id="retailPrice"
            type="number"
            step="0.01"
            {...register('retailPrice', { valueAsNumber: true })}
          />
          {errors.retailPrice && (
            <p className="error">{errors.retailPrice.message}</p>
          )}
        </div>

        {/* Wholesale Price */}
        <div className="form-group">
          <label htmlFor="wholesalePrice">Wholesale Price</label>
          <input
            id="wholesalePrice"
            type="number"
            step="0.01"
            {...register('wholesalePrice', { valueAsNumber: true })}
          />
          {errors.wholesalePrice && (
            <p className="error">{errors.wholesalePrice.message}</p>
          )}
        </div>

        {/* Minimum Quantity */}
        <div className="form-group">
          <label htmlFor="minQuantity">Minimum Quantity</label>
          <input
            id="minQuantity"
            type="number"
            {...register('minQuantity', { valueAsNumber: true })}
          />
          {errors.minQuantity && (
            <p className="error">{errors.minQuantity.message}</p>
          )}
        </div>

        {/* Image Title */}
        <div className="form-group">
          <label htmlFor="imageTitle">Image Title</label>
          <input id="imageTitle" type="text" {...register('imageTitle')} />
          {errors.imageTitle && (
            <p className="error">{errors.imageTitle.message}</p>
          )}
        </div>

        {/* Botão de envio */}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddProductForm
