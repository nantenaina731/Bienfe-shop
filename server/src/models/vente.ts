import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async () => {
        let result = await prisma.vente.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        return result
    },

    getAllByDate: async (startDate: Date, endDate: Date) => {
        let result = await prisma.vente.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        })
        return result
    },

    getAllIndexed: async (index: number, take: number) => {
        let result = await prisma.vente.findMany({
            skip: index,
            take: take,
            orderBy: {
                id: 'desc'
            }
        })
        return result
    },

    create: async (
        quantity: number,
        product_id: number,
        amount: number,
        totalAmount: number,
        shopId: number     
    ) => {
        const result = await prisma.vente.create({
            data: {
                quantity,
                product_id,
                amount,
                totalAmount,
                shopId       
            },
        })

        return result
    },

    filter: async (startOfDay: Date, endOfDay: Date) => {
        const result = await prisma.vente.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
            include: {
                product: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        });
        return result
    },

    update: async (
        createdAt: Date,
        quantity: number,
        totalAmount: number,
        id: number
    ) => {
        const result = await prisma.vente.update({
            where: { id: Number(id) },
            data: {
                totalAmount,
                quantity,
                createdAt,
            },
        })

        return result
    },

    delete: async (id: number) => {
        let result = await prisma.vente.delete({
            where: { id: Number(id) },
        })

        return result
    },
}

export default model
