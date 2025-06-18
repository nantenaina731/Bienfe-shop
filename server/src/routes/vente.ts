import express from "express"
import { isValid } from "../../midlleware/middleware"
import controller from "../controllers/vente"

const router = express.Router()

router.get("/:index/:take", isValid, controller.getAll)
router.post("/", isValid, controller.create)
router.post("/filter", isValid, controller.filter)
router.put("/", isValid, controller.update)
router.delete("/:id", isValid, controller.delete)

export default router