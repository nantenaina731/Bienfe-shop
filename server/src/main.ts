require('dotenv').config()
import { Response, Request } from "express"
import express from "express"
import cors from "cors"
import userRoute from './routes/users'
import createShopRoute from './routes/createshop'
import fileUpload from "express-fileupload";
import compression from 'compression';
import path from 'path';

const app = express()

app.use(cors())

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(fileUpload({
  createParentPath: true
}));
app.use(compression());

app.get('/',(req:Request, res:Response) => {
  res.send('Hello from Bienfe-chop API')
})

app.use('/api/users', userRoute)
app.use ('/api/createshop',createShopRoute)
const localImages = process.env.ENV && process.env.ENV == "developpement" ? '../logo' : '../../logo'
console.log(path.join(__dirname, localImages))
app.use('/logo', express.static(path.join(__dirname, localImages)));

app.listen(9001, () => console.log("Api listen on port 9001"))