import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { Banner } from '@prisma/client'
import { MoreHorizontal, Pencil, ToggleRight, Trash2 } from 'lucide-react'
import Image from 'next/image'

export function BannerItem({ banner }: { banner: Banner }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={banner.name}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={`/api/uploads/${banner.imagePath}`}
          width="64"
        />
      </TableCell>

      <TableCell className="text-center font-medium">{banner.name}</TableCell>

      <TableCell className="text-center">
        <Badge
          variant={banner.status ? 'success' : 'destructive'}
          className="capitalize"
        >
          {banner.status ? 'Ativo' : 'Pausado'}
        </Badge>
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
            <DropdownMenuLabel className="border-b-2 border-solid">
              Ações
            </DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <ToggleRight size={20} />
              {banner.status ? 'Desativar' : 'Ativar'}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Pencil size={20} />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form>
                <button type="submit" className="flex items-center gap-2">
                  <Trash2 size={20} />
                  Remover
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
