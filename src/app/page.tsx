'use client'
import LayoutPage from '@/components/template/LayoutPage'
import { ProductsTable } from './(dashboard)/Products-table'
import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { BannersTable } from './(dashboard)/Banners-table'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]) // Inicializa o estado como um array vazio
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products/get-products') // Faz a chamada à API
      if (res.ok) {
        const data = await res.json() // Converte a resposta para JSON
        setProducts(data) // Atualiza o estado com os produtos obtidos
      } else {
        console.error('Failed to fetch products') // Lida com erro na chamada da API
      }
    }

    fetchProducts() // Chama a função para buscar os produtos
  }, []) // O array vazio [] garante que a chamada seja feita apenas uma vez quando o componente é montado

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
    <LayoutPage>
      {banners && products && (
        <div className="space-y-2">
          <ProductsTable
            products={products}
            offset={5}
            totalProducts={products.length}
          />

          <BannersTable
            banners={banners}
            offset={5}
            totalBanners={banners.length}
          />
        </div>
      )}
    </LayoutPage>
  )
}
