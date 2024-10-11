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
import { Product } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import TemplateCardFooter from './CardFooter'
import { ProductItem } from './Product-item'

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
  const productsPerPage = 2

  const minOffset = 1
  const maxOffset = () => {
    if (totalProducts % productsPerPage === 0) {
      return totalProducts / productsPerPage
    } else {
      return Math.floor(totalProducts / productsPerPage) + 1
    }
  }

  function validOffset(offset: number): boolean {
    return offset > 0 && offset <= maxOffset()
  }

  const initialOffset = () => {
    const offsetParams = Number(searchParams?.get('offset'))

    if (validOffset(offsetParams)) return offsetParams
    else return minOffset
  }

  const [offset, setOffset] = useState(initialOffset)

  function nextPage() {
    const newOffset = offset + 1
    setOffset(newOffset)
    router.push(`/?offset=${newOffset}`, { scroll: false })
  }

  function prevPage() {
    const newOffset = Math.max(1, offset - productsPerPage)
    setOffset(newOffset)
    router.push(`/?offset=${newOffset}`, { scroll: false })
  }

  const paginatedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(filter?.toLowerCase() || ''),
    )

    return filtered.slice(
      (offset - 1) * productsPerPage,
      offset * productsPerPage,
    )
  }, [products, filter, offset])

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
        itemsPerPage={productsPerPage}
        maxOffset={maxOffset()} // Aqui você chama a função maxOffset
      />
    </Card>
  )
}
