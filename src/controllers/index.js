import prisma from "../utils/prisma.js";

export const createNoteController = async (req, res) => {
  try {
    // request
    const { title, description } = req.body;
    // validation
    if (title.length === 0) {
      return res.status(400).json({
        message: "Input title tidak boleh kosong!",
      });
    }

    if (title.length < 2) {
      return res.status(400).json({
        message: "Title tidak boleh kurang dari 2 karakter!",
      });
    }

    // title
    const noteExists = await prisma.notes.findFirst({
      where: {
        title: title,
      },
    });

    if (noteExists) {
      return res.status(400).json({
        success: false,
        error: 400,
        message: "Note ini sudah ada di database",
      });
    }

    // description
    if (description.length === 0) {
      return res.status(400).json({
        message: "Input deskripsi tidak boleh kosong!",
      });
    }

    // send to database
    await prisma.notes.create({
      data: {
        title: title,
        description: description,
      },
    });

    res.status(201).json({
      success: true,
      code: 201,
      message: "Note berhasil dibuat!",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      Message: error.message,
    });
  }
};

export const getAllNoteController = async (req, res) => {
  try {
    // validation
    const notes = await prisma.notes.findMany();
    if (notes.length === 0) {
      return res.status(200).json({
        success: true,
        code: 200,
        message: "Tidak ada note",
      });
    }
    res.status(200).json({
      success: true,
      code: 200,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const getNoteByIdController = async (req, res) => {
  try {
    // request
    const noteId = req.params.id;
    // validation
    const note = await prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Id yang kamu kirim tidak ditemukan",
      });
    }

    // send response
    res.status(200).json({
      success: true,
      code: 200,
      message: "Berhasil mengabil data",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 500,
      message: error.message,
    });
  }
};

export const updateNoteByIdController = async (req, res) => {
  // request
  try {
    const reqId = req.params.id;
    const { title, description } = req.body;
    // validation
    const note = await prisma.notes.findUnique({
      where: reqId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `id ${reqId} tidak ditemukan`,
      });
    }
    if (title.length === 0) {
      return res.status(400).json({
        success: false,
        code: 404,
        message: `input title tidak boleh kosong`,
      });
    }
    if (description.length === 0) {
      return res.status(400).json({
        success: false,
        code: 404,
        message: `input title tidak boleh kosong`,
      });
    }

    // console.log("Id tersebut ketemu")
    // update

    await prisma.notes.update({
      where: {
        id: reqId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    res.status(200).json({
      success: true,
      message: "Note berhasil diupdate",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      error: error.message,
    });
  }
  // validasi req.body
};

export const deleteNoteByIdController = async (req, res) => {
  try {
    const { noteId } = req.body;
    console.log(noteId)
    const note = await prisma.notes.delete({
      where: { id: noteId },
    });

    res.status(200).json({
      success: true,
      code: 200,
      message: "Note berhasil dihapus",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      Message: error.message,
    });
  }
};
