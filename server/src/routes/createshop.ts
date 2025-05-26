import express from "express";
import { isValid } from "../../midlleware/middleware";
import controller from "../controllers/createshop";
import upload from "../../midlleware/uploads";

const router = express.Router();

router.get("/", isValid, controller.getAll);
router.get("/:id", isValid, controller.getOne);
router.post("/", isValid, upload.single("logo"), controller.create);
router.put("/", isValid, upload.single("logo"), controller.update);
router.delete("/:id", isValid, controller.delete);

export default router;
