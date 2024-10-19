'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'

import { Button } from '@/app/components/ui/button'
import { Banner } from '@prisma/client'
import { BannerItem } from './Banner-item'
import TemplateCardFooter from './CardFooter'
import { usePagination } from './_hooks/usePagination'
import SelectItems from './Select-items'

export function BannersTable({
  banners,
  totalBanners,
  filter,
}: {
  banners: Banner[] | []
  totalBanners: number
  filter: string
}) {
  const {
    handleSelectChange,
    nextPage,
    prevPage,
    itemsPerPage,
    maxOffset,
    offset,
    paginatedItems,
  } = usePagination({
    filter,
    totalItems: totalBanners,
    items: banners,
    itemsPerPageDefault: 2,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle>Banners</CardTitle>
            <CardDescription>Gerencie aqui seus banners</CardDescription>
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

              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((banner) => (
              <BannerItem key={banner.id} banner={banner} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <TemplateCardFooter
        offset={offset}
        prevPage={prevPage}
        nextPage={nextPage}
        totalItems={totalBanners}
        itemsPerPage={itemsPerPage}
        maxOffset={maxOffset}
      />
    </Card>
  )
}
