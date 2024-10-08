import { PrismaClient } from '@prisma/client'

interface GlobalForPrisma {
  prisma?: PrismaClient
}

const globalForPrisma = global as typeof globalThis & GlobalForPrisma

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
