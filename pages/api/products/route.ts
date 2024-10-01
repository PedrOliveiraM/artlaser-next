import { db } from '@/lib/db'
// import { PrismaClient, Product } from '@prisma/client'
import { NextResponse } from 'next/server'

// import { NextResponse } from 'next/server'
// import prisma from '@/lib/db'

// const prisma = new PrismaClient()

// export const db = prisma

// export async function createProduct(product: Product) {
//   const newProduct = await db.product.create({ data: product })
//   return newProduct
// }

// export async function getProductById(id: number) {
//   const product = await db.product.findUnique({ where: { id } })
//   return product
// }

// export async function getProducts() {
//   const listProducts = await db.product.findMany()
//   return listProducts
// }

// export async function updateProductById(id: number, product: Product) {
//   await db.product.update({ where: { id }, data: product })
// }

// export async function deleteProductById(id: number) {
//   await db.product.delete({ where: { id } })
// } // Importe o PrismaClient

export async function GET() {
  try {
    const products = await db.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.error() // Retorne um erro se algo falhar
  }
}
