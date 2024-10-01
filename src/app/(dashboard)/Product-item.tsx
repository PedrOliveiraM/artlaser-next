import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Product } from '@prisma/client'

export function ProductItem({ product }: { product: Product }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={`/api/uploads/${product.imagePath}`}
          width="64"
        />
      </TableCell>

      <TableCell className="text-center font-medium">{product.name}</TableCell>

      <TableCell className="text-center">
        <Badge
          variant={product.status ? 'success' : 'destructive'}
          className="capitalize"
        >
          {product.status ? 'Ativo' : 'Pausado'}
        </Badge>
      </TableCell>

      <TableCell className="hidden text-center md:table-cell">{`$${product.retailPrice}`}</TableCell>

      <TableCell className="hidden text-center md:table-cell">
        {`$${product.wholesalePrice}`}
      </TableCell>
      <TableCell className="hidden text-center md:table-cell">
        {product.category}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>
              <form>
                <button type="submit">Remover</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
