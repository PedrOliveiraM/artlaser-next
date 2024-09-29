import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from './ui/button'
import { Package, Users, Image, LogOut } from 'lucide-react' // Adicionei mais ícones

export default function SideMenuAdm() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <div className="mt-4 flex flex-col gap-4">
        {/* Botão de Produtos */}
        <Button className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span className="font-bold">Produtos</span>
        </Button>

        {/* Botão de Banners */}
        <Button className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          <span className="font-bold">Banners</span>
        </Button>

        {/* Botão de Usuários */}
        <Button className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="font-bold">Usuários</span>
        </Button>

        {/* Botão de Sair */}
        <Button className="flex items-center justify-center gap-2">
          <LogOut className="h-5 w-5" />
          <span className="font-bold">Sair</span>
        </Button>
      </div>
    </SheetContent>
  )
}
