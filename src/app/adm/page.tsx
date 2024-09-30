'use client'
import AddProductForm from '@/components/choose-file'
import HeaderAdm from '@/components/header-adm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ImageIcon, Package } from 'lucide-react'
import { useState } from 'react'

export default function Adm() {
  const [productForm, setProductForm] = useState(false)
  const [section, setSection] = useState(true)
  const handleAddProductBtnClick = () => {
    setProductForm(true)
    setSection(false)
  }

  return (
    <div className="">
      <HeaderAdm />
      <h1 className="p-5 text-center text-xl font-bold">
        Tela de administração
      </h1>

      {section && (
        <section className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Card className="max-h-80 max-w-80">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Package></Package>Produtos
              </CardTitle>
              <CardDescription className="text-center">
                Adicione, Altere ou remova seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button onClick={handleAddProductBtnClick} variant={'success'}>
                Adicionar
              </Button>
              <Button variant={'alert'}>Alterar</Button>
              <Button variant={'destructive'}>Remover</Button>
            </CardContent>
          </Card>

          <Card className="max-w-80">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <ImageIcon />
                Banners
              </CardTitle>
              <CardDescription className="text-center">
                Adicione, Altere ou remova seus Banners
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button variant={'success'}>Adicionar</Button>
              <Button variant={'alert'}>Alterar</Button>
              <Button variant={'destructive'}>Remover</Button>
            </CardContent>
          </Card>
        </section>
      )}

      <main className="flex flex-col items-center justify-center gap-3">
        {productForm && <AddProductForm />}
      </main>
    </div>
  )
}
