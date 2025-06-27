import { Response, Request } from "express"
import model from "../models/vente"
import productModel from "../models/products"

const controller = {
    getAll: async (req: Request, res: Response) => {
        let {
            index,
            take
        } = req.params

        try {
            let data = await model.getAllIndexed(parseInt(index), parseInt(take))
           
            if(data) {
                let all = await model.getAll()
                let response : any= {
                    data,
                    all: all.length
                }
                res.status(200).send(response)
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
            oldQuantity,
            quantity,
            product_id,
            amount,
            shopId
        } = req.body

        try {
            const newQuantity = parseFloat(oldQuantity) - quantity
            const totalAmount = amount * quantity
            let product = await productModel.updateQuantity(
                parseInt(product_id), 
                newQuantity
            )
            if(product) {
                let data = await model.create(
                    parseInt(quantity),
                    parseInt(product_id),
                    parseFloat(amount),
                    totalAmount,
                    parseInt(shopId)
                )
                res.status(200).send(data)
            } else {
                res.status(400).send(new Error("Erreur de requête"))
            }
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    filter: async (req: Request, res: Response) => {
        let { day, month, year, shopId } = req.body;
    
        try {
            const startOfDay = day == "Tout" ? new Date(year, month, 1, 0, 0, 0) : new Date(year, month, day, 0, 0, 0);
            const endOfDay = day == "Tout" ? new Date(year, month + 1, 1, 0, 0, 0) : new Date(year, month, day + 1, 0, 0, 0);
    
            let data = await model.filter(startOfDay, endOfDay, shopId);
    
            res.status(200).send(data);
        } catch (error: any) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    update: async (req: Request, res: Response) => {
        let { 
            createdAt,
            quantity,
            totalAmount,
            id
        } = req.body
        
        try { 
            let data = await model.update(
                createdAt,
                parseInt(quantity),
                parseFloat(totalAmount),    
                parseInt(id), 
            
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
