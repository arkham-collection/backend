import { Prisma, PrismaClient } from "@prisma/client"

export type Transaction = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">
export type Json = Prisma.InputJsonValue
