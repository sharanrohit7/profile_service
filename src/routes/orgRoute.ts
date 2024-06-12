import express from "express"
import { createProfileController } from "../controller/profile.controller"

const router = express.Router()

router.post("/create",createProfileController)
export default router