import 'server-only'

import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

export const db = prisma

export async function createProduct(product: Product) {
  const newProduct = await db.product.create({ data: product })
  return newProduct
}

export async function getProductById(id: number) {
  const product = await db.product.findUnique({ where: { id } })
  return product
}

export async function getProducts() {
  const listProducts = await db.product.findMany()
  return listProducts
}

export async function updateProductById(id: number, product: Product) {
  await db.product.update({ where: { id }, data: product })
}

export async function deleteProductById(id: number) {
  await db.product.delete({ where: { id } })
}
