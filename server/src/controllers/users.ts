import { Response, Request } from "express"
import { generateToken } from '../services/services'
import bcrypt from "bcrypt"
import model from "../models/users"

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
    getByEmail:  async (req: Request, res: Response) => {
        let { email } = req.params

        try { 
            let data = await model.getByEmail(email)

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
    search:  async (req: Request, res: Response) => {
        let { query, id } = req.body

        try { 
            let data = await model.search(String(query), parseInt(id))

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
    filterByType:  async (req: Request, res: Response) => {
        let { type } = req.body

        try { 
            let data = await model.filterByType(type)

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
    getLogin: async (req: Request, res: Response) => {
        let { email, password } = req.body

        try {
            let user = await model.getByEmail(email)
            if(user) {
                let psw = String(user.password)
                bcrypt.compare(password, psw, function(err: any, verified: any){
                    if (err) return res.status(403).send("Incorrect Password");
                    if (verified) {
                        const token = generateToken(user?.id , user?.email);
                        res.send({
                            user,
                            token
                        });
                    }
                    else {
                        res.status(403).send("Incorrect Password")
                    }
                })
            }
            else {
                res.status(500).send("This user doesn't exist")
            }
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    create: async (req: Request, res: Response) => {
        let { name, last_name, email,shop_name, password, type ,} = req.body

        try {
            let find = await model.getByEmail(email)
            if(find) {
                res.status(403).send("This email is already in use")
            }
            else {
                let saltRounds = 10
                bcrypt.hash(password, saltRounds, async function(err: any, hash: any) {
                    if(err){
                        res.status(403).send("Registration failed")
                    }
                    else {
                        let user = await model.create(name, last_name, email,shop_name, type, hash)
                        if(user) {
                            let token = generateToken(user.id, user.email)
                            let response  = {
                                user,
                                token
                            }
                            res.status(200).send(response)
                        }
                        else res.status(500).send("Registration failed")
                    }
                })
            }
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    update: async (req: Request, res: Response) => {
        let {name, last_name, password, shop_name } = req.body
        let id = parseInt(req.body.id)
        try { 
            let saltRounds = 10
            bcrypt.hash(password, saltRounds, async function(err: any, hash: any) {
                if(err){
                    res.status(403).send("Registration failed")
                }
                else {
                    let data = await model.update(name, last_name, hash,password,shop_name )
                    res.status(200).send(data)
                }
            })
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    updateNoPass: async (req: Request, res: Response) => {
        let { name, last_name } = req.body
        let id = parseInt(req.body.id)
        try { 
            let data = await model.updateNoPass(name, last_name, id)
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