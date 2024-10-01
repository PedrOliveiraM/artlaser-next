import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function seed(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const products = [
      {
        name: 'Chaveiro Personalizado',
        description: 'Chaveiro personalizado com design único.',
        category: 'Acessórios',
        retailPrice: new Prisma.Decimal(29.99),
        wholesalePrice: new Prisma.Decimal(19.99),
        minQuantity: 1,
        imageTitle: 'Chaveiro Personalizado Imagem',
        imagePath: 'ChaveiroPersonalizado.png',
        status: true,
      },
      {
        name: 'Copo GG Stanley',
        description: 'Copo GG Stanley para bebidas quentes e frias.',
        category: 'Copa e Cozinha',
        retailPrice: new Prisma.Decimal(39.99),
        wholesalePrice: new Prisma.Decimal(29.99),
        minQuantity: 5,
        imageTitle: 'Copo GG Stanley Imagem',
        imagePath: 'CopoGGstanley.png',
        status: true,
      },
      {
        name: 'São Cosmo e Damião',
        description: 'Produto em homenagem a São Cosmo e Damião.',
        category: 'Religioso',
        retailPrice: new Prisma.Decimal(49.99),
        wholesalePrice: new Prisma.Decimal(39.99),
        minQuantity: 10,
        imageTitle: 'São Cosmo e Damião Imagem',
        imagePath: 'SaoCosmoDamiao.png',
        status: true,
      },
      {
        name: 'Troféu Personalizado',
        description: 'Troféu personalizado para eventos e premiações.',
        category: 'Eventos',
        retailPrice: new Prisma.Decimal(59.99),
        wholesalePrice: new Prisma.Decimal(49.99),
        minQuantity: 2,
        imageTitle: 'Troféu Personalizado Imagem',
        imagePath: 'TrofeuPersonalizado.png',
        status: true,
      },
    ]

    try {
      // Adicionando cada produto ao banco de dados
      for (const product of products) {
        await prisma.product.create({
          data: product,
        })
      }
      res.status(200).json({ message: 'Seeding completed successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error seeding data.' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default seed

/*
async function seedDatabase() {
  const response = await fetch('/api/seed', {
    method: 'POST',
  });
  const data = await response.json();
  console.log(data);
}

Rota para chamar o seed
/api/seed
*/
