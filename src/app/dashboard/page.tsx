'use client'

import { BannersTable } from '@/app/_components/dashboard/Banners-table'
import { ProductsTable } from '@/app/_components/dashboard/Products-table'
import { LayoutPage } from '@/app/_components/template/LayoutPage'
import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function DashBoard() {
  const [products, setProducts] = useState<Product[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      //            `/api/avatar/upload?filename=${file.name}`,
      const res = await fetch('/api/products')
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
      const res = await fetch('/api/banners')
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
          totalProducts={products.length}
          filter={filter}
        />
        <BannersTable
          banners={banners}
          totalBanners={banners.length}
          filter={filter}
        />
      </div>
    </LayoutPage>
  )
}
