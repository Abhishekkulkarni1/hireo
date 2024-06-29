import express from "express"
import {deleteJob, getAllJobs, getMyJobs, getSingleJob, postJob, updateJobs} from "../controllers/jobController.js"
import {isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.get("/getalljobs", getAllJobs)
router.post("/post", isAuthenticated , postJob)
router.get("/getmyjobs", isAuthenticated , getMyJobs)
router.put("/updatemyjobs/:id", isAuthenticated , updateJobs)
router.delete("/deletejob/:id", isAuthenticated , deleteJob)
router.get("/:id", isAuthenticated , getSingleJob)

export default router