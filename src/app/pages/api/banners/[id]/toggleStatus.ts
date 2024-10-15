import { db } from '@/lib/db' // Certifique-se de que o caminho está correto
import { NextApiRequest, NextApiResponse } from 'next'

// Manipulador da rota para alterar o status do banner
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query // Obtenha o ID do banner da URL

  // Verifique se o método é PUT
  if (req.method === 'PUT') {
    try {
      // Procure o banner pelo ID
      const banner = await db.banner.findUnique({
        where: { id: Number(id) },
      })

      // Verifique se o banner existe
      if (!banner) {
        return res.status(404).json({ message: 'Banner não encontrado.' })
      }

      // Atualize o status do banner
      const updatedBanner = await db.banner.update({
        where: { id: Number(id) },
        data: { status: !banner.status }, // Toggling the status
      })

      // Retorne o banner atualizado
      return res.status(200).json(updatedBanner)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Erro ao atualizar o status.', error })
    }
  } else {
    return res
      .status(405)
      .json({ message: `Método ${req.method} não permitido.` })
  }
}
