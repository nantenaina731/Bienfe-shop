import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async () => {
        let result = await prisma.products.findMany({
            where: {
                isDelete: false
            },
            orderBy: {
                id: 'desc'
            }
        })
        return result
    },
    getOne: async (id: number) => {
        let result = await prisma.products.findUnique({
            where: {
                id
            }
        })
        return result
    },
    getAllByDate: async (startDate: Date,  endDate: Date) => {
        let result = await prisma.products.findMany({
            where: {
                isDelete: false,
                createdAt: {
                  gte: startDate,
                  lt: endDate,
                },
            },
        })
        return result
    },
    getAllIndexed: async (index: number, take: number) => {
        let result = await prisma.products.findMany({
            where: {
                isDelete: false
            },
            skip: index,
            take: take,
            orderBy: {
                id: 'desc'
            }
        })
        return result
    },
    getAllByShop: async (shopId: number) => {
        let result = await prisma.products.findMany({
            where: {
                shopId: shopId,
                isDelete: false
            },
            orderBy: {
                id: 'desc'
            }
        });
        return result;
    },
    
    create: async (
        name: string,
        quantity: number,
        price: number,
        shopId:number,
        
    ) => {

        const result = await prisma.products.create({
            data: {
                name,
                quantity,
                price,
                shop: {
                    connect: { id: shopId }
                }
            },
        })

        return result
    },
    update:  async (
        name: string,
        quantity: number,
        price: number,
        id:number
    ) => {

        const result = await prisma.products.update({
            where: { id: Number(id) },
            data: {
                name,
                quantity,
                price
            },
        })

        return result
    },
    updateQuantity: async (
        id:number,
        quantity: number
    ) => {

        const result = await prisma.products.update({
            where: { id: Number(id) },
            data: {
                quantity
            },
        })

        return result
    },
    updatePrice: async (
        id:number,
        price: number
    ) => {

        const result = await prisma.products.update({
            where: { id: Number(id) },
            data: {
                price
            },
        })

        return result
    },
    delete: async (id : number) => {

        let result = await prisma.products.update({
            where: { id: Number(id) },
            data: {
                isDelete: true
            }
        })

        return result
    },
}

export default model