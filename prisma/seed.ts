import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Adicionando produtos
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

  // Adicionando cada produto ao banco de dados
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
