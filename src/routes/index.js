import express from "express";

import {
  createNoteController,
  getAllNoteController,
  getNoteByIdController,
  updateNoteByIdController,
  deleteNoteByIdController,
} from "../controllers/index.js";

const router = express.Router();

router.post("/createNote", createNoteController);
router.get("/getAllNote", getAllNoteController);
router.get("/getNoteById/:id", getNoteByIdController);
router.patch("/updateNoteByid", updateNoteByIdController);
router.post("/deleteNoteById", deleteNoteByIdController);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

export default router;
