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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Product } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import TemplateCardFooter from './CardFooter'
import { ProductItem } from './Product-item'
import { Button } from '@/components/ui/button'

export function ProductsTable({
  products,
  totalProducts,
  filter,
}: {
  products: Product[] | []
  totalProducts: number
  filter: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [itemsPerPage, setItemsPerPage] = useState(2)

  const handleSelectChange = (value: string) => {
    setItemsPerPage(Number(value))
    setOffset(1) // Reseta para a primeira página quando os itens por página mudam
  }

  const minOffset = 1
  const pages = () => {
    return Math.ceil(totalProducts / itemsPerPage) || 1 // Para garantir pelo menos uma página
  }

  const [maxOffset, setMaxOffset] = useState(pages())

  useEffect(() => {
    setMaxOffset(pages())
  }, [itemsPerPage, totalProducts]) // Atualiza quando totalProducts ou itemsPerPage muda

  function validOffset(offset: number): boolean {
    return offset > 0 && offset <= maxOffset
  }

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
  }, [products, filter, offset, itemsPerPage]) // Adicione itemsPerPage aqui

  useEffect(() => {
    setOffset(1) // Reseta o offset quando a lista de produtos mudar
  }, [products])

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
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Itens" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
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
