import LayoutPage from '@/components/template/LayoutPage'
import { ProductsTable } from './(dashboard)/Products-table'
import { Product } from '@prisma/client'

export default function Home() {
  const products: Product[] = []
  return (
    <LayoutPage>
      <ProductsTable products={products} offset={5} totalProducts={10} />
    </LayoutPage>
  )
}
