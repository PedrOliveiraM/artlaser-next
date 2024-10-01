import LayoutPage from '@/components/template/LayoutPage'
import { ProductsTable } from './(dashboard)/Products-table'

export default async function ProductsPage() {
  const res = await fetch('/api/products') // Chamada à API
  const products = await res.json() // Obtendo os produtos da API

  return (
    <LayoutPage>
      <ProductsTable
        products={products}
        offset={5}
        totalProducts={products.length}
      />
    </LayoutPage>
  )
}
