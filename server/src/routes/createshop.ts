import express from "express";
import { isValid } from "../../midlleware/middleware";
import controller from "../controllers/createshop";

const router = express.Router();

router.get("/", isValid, controller.getAll);
router.get("/:id", isValid, controller.getOne);
router.post("/", isValid, controller.create)
router.put("/", isValid, controller.update);
router.delete("/:id", isValid, controller.delete);

export default router;
