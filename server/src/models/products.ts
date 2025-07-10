import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import Papa from 'papaparse';

const prisma = new PrismaClient();

const model = {
  getAll: async () => {
    return await prisma.products.findMany({
      where: { isDelete: false },
      orderBy: { id: 'desc' }
    });
  },
  getOne: async (id: number) => {
    return await prisma.products.findUnique({ where: { id } });
  },

  getAllByDate: async (startDate: Date, endDate: Date) => {
    return await prisma.products.findMany({
      where: {
        isDelete: false,
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  },

  getAllIndexed: async (index: number, take: number) => {
    return await prisma.products.findMany({
      where: { isDelete: false },
      skip: index,
      take: take,
      orderBy: { id: 'desc' }
    });
  },

  getAllByShop: async (shopId: number) => {
    return await prisma.products.findMany({
      where: { shopId, isDelete: false },
      orderBy: { id: 'desc' }
    });
  },

  create: async (
    name: string,
    quantity: number,
    price: number,
    shopId: number
  ) => {
    return await prisma.products.create({
      data: {
        name,
        quantity,
        price,
        shop: {
          connect: { id: shopId }
        }
      }
    });
  },

  update: async (
    name: string,
    quantity: number,
    price: number,
    id: number
  ) => {
    return await prisma.products.update({
      where: { id },
      data: { name, quantity, price }
    });
  },

  updateQuantity: async (id: number, quantity: number) => {
    return await prisma.products.update({
      where: { id },
      data: { quantity }
    });
  },

  updatePrice: async (id: number, price: number) => {
    return await prisma.products.update({
      where: { id },
      data: { price }
    });
  },

  delete: async (id: number) => {
    return await prisma.products.update({
      where: { id },
      data: { isDelete: true }
    });
  },
  importFromCSV: async (filePath: string, shopId: number) => {
    return new Promise((resolve, reject) => {
      const file = fs.readFileSync(filePath, 'utf8');

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results:any) => {
          try {
            const data = results.data as {
              name: string;
              quantity: string;
              price: string;
            }[];

            const inserted = [];

            for (const item of data) {
              if (item.name && item.quantity && item.price) {
                const product = await prisma.products.create({
                  data: {
                    name: item.name,
                    quantity: parseInt(item.quantity),
                    price: parseFloat(item.price),
                    shop: { connect: { id: shopId } },
                  },
                });
                inserted.push(product);
              }
            }

            resolve(inserted);
          } catch (e) {
            reject(e);
          }
        },
        error: (error:any) => reject(error),
      });
    });
  }
};

export default model;
