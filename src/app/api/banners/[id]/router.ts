// app/api/banners/[id]/route.ts
import { db } from '@/lib/db' // Certifique-se de que o caminho está correto
import { NextResponse } from 'next/server'

// Manipulador da rota para alterar o status do banner
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { id } = params // Obtenha o ID do banner da URL

  try {
    // Procure o banner pelo ID
    const banner = await db.banner.findUnique({
      where: { id: Number(id) },
    })

    // Verifique se o banner existe
    if (!banner) {
      return NextResponse.json(
        { message: 'Banner não encontrado.' },
        { status: 404 },
      )
    }

    // Atualize o status do banner
    const updatedBanner = await db.banner.update({
      where: { id: Number(id) },
      data: { status: !banner.status }, // Toggling the status
    })

    // Retorne o banner atualizado
    return NextResponse.json(updatedBanner)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Erro ao atualizar o status.', error },
      { status: 500 },
    )
  }
}
