import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async () => {
        let result = await prisma.shop.findMany({
            where: {
                isDelete: false
            },
            orderBy: {
                id: 'desc'
            }
        })
        return result
    },
    getOne: async (id : number) => {
        let result = await prisma.shop.findUnique({
            where: { id: Number(id) },
           
        })
        
        return result 
    },
    create: async (name:string,logo:string) => {

        const result = await prisma.shop.create({
            data: {
                name,
                logo
              },
        })

        return result
    },
    update:  async (name:string, id:number,logo:string) => {

        const result = await prisma.shop.update({
            where: { id: Number(id) },
            data: {
                name,
                logo
            },
        })

        return result
    },
    delete: async (id : number) => {

        let result = await prisma.shop.update({
            where: { id: Number(id) },
            data: {
                isDelete: true
            }
        })

        return result
    },
}

export default model