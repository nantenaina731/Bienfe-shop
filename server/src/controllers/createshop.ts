import { Response, Request } from "express"
import model from "../models/createshop"

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            let data = await model.getAll()

            if(data)
                res.status(200).send(data)
            else
                res.status(200).send([])
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    getOne: async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        try { 
            let data = await model.getOne(id)
           
            if(data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    create: async (req: Request, res: Response) => {
        const { name } = req.body;
        const logo = req.file ? `/uploads/${req.file.filename}` : ""; // optionnel
    
        try {
            const data = await model.create(name, logo);
            res.status(200).send(data);
        } catch (error: any) {
            console.log(error);
            res.status(500).send(error.message);
        }
    },
    
    update: async (req: Request, res: Response) => {
        let { name,logo } = req.body
        let id = parseInt(req.body.id)
        try { 
            let data = await model.update(name, id,logo)
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