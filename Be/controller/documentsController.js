const postsModel = require("../model/postsModel");
const documentsModel = require("../model/documentsModel");
const mongoose = require("mongoose");

//create document
const createOne = async (req, res) => {
  try {
    if (!req.files.length === 0)
      return res.status(400).json({ message: "need doc file" });
    const newDocument = await new documentsModel(req.body);
    newDocument.file = req.files[0].filename;
    if (req.files[1]) {
      newDocument.img = req.files[1].filename;
    }
    newDocument.userId = req.user._id;
    await newDocument.save();
    res.status(200).json(newDocument);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//get all document
const getAll = async (req, res) => {
  try {
    const documentsQuery = await documentsModel.find().populate("userId");
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get a document
const getOne = async (req, res) => {
  try {
    const documentsQuery = await documentsModel
      .findById(req.params.id)
      .populate("userId");
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all approved documents
const getDocumentApproved = async (req, res) => {
  try {
    const documentsQuery = await documentsModel
      .find({
        isApproved: true,
      })
      .populate("userId");
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all approved documents
const getDocumentPeding = async (req, res) => {
  try {
    const documentsQuery = await documentsModel
      .find({
        isApproved: false,
      })
      .populate("userId");
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update one
const updateOne = async (req, res) => {
  try {
    const documentsQuery = await documentsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//approved
const approved = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(401).json({ message: "only admin can do this" });
    const documentsQuery = await documentsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isApproved: true },
      },
      { new: true }
    );
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//approved
const unApproved = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(401).json({ message: "only admin can do this" });
    const documentsQuery = await documentsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isApproved: false },
      },
      { new: true }
    );
    res.status(200).json(documentsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//delete
const deleteOne = async (req, res) => {
  try {
    const documentQuery = await documentsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted", documentQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  getDocumentApproved,
  approved,
  unApproved,
  getDocumentPeding,
};
