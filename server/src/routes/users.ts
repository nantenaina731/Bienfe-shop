import express from "express"
import { isValid } from "../../midlleware/middleware"
import controller from "../controllers/users"

const router = express.Router()

router.get("/", isValid, controller.getAll)
router.get("/:id", isValid, controller.getOne)
router.get("/email/:email", isValid, controller.getByEmail)
router.post("/", isValid, controller.create)
router.post("/secret-create-user/jahBless", controller.create)
router.post("/login", controller.getLogin)
router.post("/search", isValid, controller.search)
router.post("/filter-by-type", isValid, controller.filterByType)
router.put("/", isValid, controller.update)
router.put("/no-password", isValid, controller.updateNoPass)
router.delete("/:id", isValid, controller.delete)

export default router