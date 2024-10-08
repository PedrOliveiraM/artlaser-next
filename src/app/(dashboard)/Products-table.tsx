'use client'

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { ProductItem } from './Product-item'

export function ProductsTable({
  products,
  offset,
  totalProducts,
}: {
  products: Product[] | []
  offset: number
  totalProducts: number
}) {
  const router = useRouter()
  const productsPerPage = 5

  function prevPage() {
    router.back()
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos</CardTitle>
        <CardDescription>Gerencie aqui seus produtos</CardDescription>
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
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex w-full items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Mostrando{' '}
            <strong>
              {Math.min(offset - productsPerPage, totalProducts) + 1}-{offset}
            </strong>{' '}
            de <strong>{totalProducts}</strong> produtos
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Próximo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
