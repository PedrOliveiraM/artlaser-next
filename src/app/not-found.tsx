import Image from 'next/image'
import ImageError from '@/assets/image.png'

export default function Custom404() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image src={ImageError} width={500} height={500} alt="Not found" />
      <Image
        src="/api/uploads/CopoGGstanley.png" // Usa a API route para servir a imagem
        alt="Copo GG Stanley"
        width={500}
        height={500}
      />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    </div>
  )
}
