import { Response, Request } from "express"
import model from "../models/products"
import { parse } from "path";

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            const { shopId } = req.query;
            let data;
    
            if (shopId) {
                data = await model.getAllByShop(parseInt(shopId as string));
            } else {
                data = await model.getAll();
            }
    
            res.status(200).send(data || []);
        } catch (error: any) {
            console.log(error);
            res.status(500).send(error.message);
        }
    },    
    actualQty:  async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        try {
            const data = await model.getOne(id);

            if(data) {
                res.status(200).send({
                    id: data.id,
                    actualQty: data.quantity
                })
            }
            else
                res.status(200).send([])
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    create: async (req: Request, res: Response) => {
        let { 
            name,
            quantity,
            price,
            shopId
         } = req.body

        try {
            let data = await model.create(
                name,
                parseInt(quantity),
                parseFloat(price),
                parseInt(shopId)
            )
            res.status(200).send(data)
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    update: async (req: Request, res: Response) => {
        let { 
            name,
            quantity,
            price
         } = req.body
        let id = parseInt(req.body.id)
        try { 
            let data = await model.update(
                name,
                parseInt(quantity),
               parseFloat (price),
                id
            )
            res.status(200).send(data)
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    delete: async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        try { 
            let data = await model.delete(id)
            res.status(200).send(data)
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
}

export default controller