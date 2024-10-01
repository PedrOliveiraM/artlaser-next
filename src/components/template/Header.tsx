import User from '@/app/(dashboard)/User'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-1 p-4">
      <h1 className="text-4xl font-bold">Artlaser Dashboard</h1>
      <form className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          name="q"
          type="search"
          placeholder="Procurar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </form>
      <User />
    </header>
  )
}
