import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetTrigger } from './ui/sheet'
import SideMenuAdm from './side-menu-adm'

export default function HeaderAdm() {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div>
        <h1 className="text-2xl font-bold">Artlaser</h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'ghost'}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SideMenuAdm />
      </Sheet>
    </header>
  )
}
