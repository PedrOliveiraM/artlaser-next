'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import TemplateCardFooter from './CardFooter'
import { ProductItem } from './Product-item'
import SelectItems from './Select-items'

export function ProductsTable({
  products,
  totalProducts,
  filter,
}: {
  products: Product[] | []
  totalProducts: number
  filter: string
}) {
  const [itemsPerPage, setItemsPerPage] = useState(2)

  const handleSelectChange = (value: string) => {
    setItemsPerPage(Number(value))
    setOffset(1)
  }

  const minOffset = 1

  const pages = () => {
    return Math.ceil(totalProducts / itemsPerPage) || minOffset
  }

  const [maxOffset, setMaxOffset] = useState(pages())

  useEffect(() => {
    setMaxOffset(pages())
  }, [itemsPerPage, totalProducts])

  function validOffset(offset: number): boolean {
    return offset > 0 && offset <= maxOffset
  }

  const searchParams = useSearchParams()

  const initialOffset = () => {
    const offsetParams = Number(searchParams?.get('offset'))
    return validOffset(offsetParams) ? offsetParams : minOffset
  }

  const [offset, setOffset] = useState(initialOffset)

  const paginatedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(filter?.toLowerCase() || ''),
    )
    return filtered.slice((offset - 1) * itemsPerPage, offset * itemsPerPage)
  }, [products, filter, offset, itemsPerPage])

  useEffect(() => {
    setOffset(1)
  }, [products])

  const router = useRouter()

  function nextPage() {
    const newOffset = offset + 1
    if (validOffset(newOffset)) {
      setOffset(newOffset)
      router.push(`/?offset=${newOffset}`, { scroll: false })
    }
  }

  function prevPage() {
    const newOffset = Math.max(1, offset - 1)
    if (validOffset(newOffset)) {
      setOffset(newOffset)
      router.push(`/?offset=${newOffset}`, { scroll: false })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Gerencie aqui seus produtos</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button>Cadastrar</Button>
            <SelectItems handleSelectChange={handleSelectChange} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] text-center sm:table-cell">
                Image
              </TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Preço de varejo
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Preço de atacado
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Categoria
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <TemplateCardFooter
        offset={offset}
        prevPage={prevPage}
        nextPage={nextPage}
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
        maxOffset={maxOffset}
      />
    </Card>
  )
}
