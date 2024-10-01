import Image from 'next/image'
import AsideMenu from './AsideMenu'
import Footer from './Footer'
import Header from './Header'

interface LayoutPageProps {
  children: React.ReactNode
}

export default function LayoutPage({ children }: LayoutPageProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <AsideMenu />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
          {children}
        </main>
      </div>
      <Footer />
      <div className="flex items-center justify-center">
        <Image
          src={'/uploads/CopoGGstanley.png'}
          alt="Photo Stanley"
          width={500}
          height={500}
        />
      </div>
    </main>
  )
}
