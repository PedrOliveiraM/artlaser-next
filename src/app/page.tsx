'use client'
import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { BannersTable } from './(dashboard)/Banners-table'
import { ProductsTable } from './(dashboard)/Products-table'
import { LayoutPage } from '@/components/template/LayoutPage'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products/get-products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      } else {
        console.error('Failed to fetch products')
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch('/api/banners/get-banners')
      if (res.ok) {
        const data = await res.json()
        setBanners(data)
      } else {
        console.error('Failed to fetch banners')
      }
    }
    fetchBanners()
  }, [])

  return (
    <LayoutPage onFilterChange={setFilter}>
      <div className="space-y-2">
        <ProductsTable
          products={products}
          offset={5}
          totalProducts={products.length}
          filter={filter}
        />
        <BannersTable
          banners={banners}
          offset={5}
          totalBanners={banners.length}
        />
      </div>
    </LayoutPage>
  )
}
