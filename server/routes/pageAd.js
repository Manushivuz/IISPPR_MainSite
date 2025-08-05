import express from "express";
import {assignAdToPages,getAdsByPage,deletePageAdAssignments,getAllPageAds,updatePageAdPosition} from "../controllers/pageAdController.js";
const router = express.Router();

import isAdmin from "../middlewares/auth.js";


router.get("/", getAdsByPage);
router.get("/getall", getAllPageAds);

router.post("/",isAdmin,assignAdToPages);
router.patch("/", updatePageAdPosition);
router.delete("/:pageName",isAdmin,deletePageAdAssignments);



export default router;