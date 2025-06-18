import express from "express"
import { isValid } from "../../midlleware/middleware"
import controller from "../controllers/products"

const router = express.Router()

router.get("/", isValid, controller.getAll)
router.get("/get-actual-qty/:id", isValid, controller.actualQty)
router.post("/", isValid, controller.create)
router.put("/", isValid, controller.update)
router.delete("/:id", isValid, controller.delete)

export default router