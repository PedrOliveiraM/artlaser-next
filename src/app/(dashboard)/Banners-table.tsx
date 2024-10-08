'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Banner } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BannerItem } from './Banner-item'

export function BannersTable({
  banners,
  offset,
  totalBanners,
}: {
  banners: Banner[] | []
  offset: number
  totalBanners: number
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
        <CardTitle>Banners</CardTitle>
        <CardDescription>Gerencie aqui seus banners</CardDescription>
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
            {banners.map((banner) => (
              <BannerItem key={banner.id} banner={banner} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex w-full items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - productsPerPage, totalBanners) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalBanners}</strong> banners
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
              disabled={offset + productsPerPage > totalBanners}
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
