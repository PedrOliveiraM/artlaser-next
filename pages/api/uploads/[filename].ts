import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query

  // Verifica se 'filename' é uma string
  if (typeof filename !== 'string') {
    return res.status(400).json({ message: 'Invalid filename' })
  }

  const filePath = path.join(process.cwd(), 'src', 'uploads', filename)

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Definir o tipo de conteúdo como PNG (ajuste conforme o tipo do arquivo)
    res.setHeader('Content-Type', 'image/png')
    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
  })
}

// Rota para servir arquivos estáticos
// /api/uploads/CopoGGstanley.png
