const postsModel = require("../model/postsModel");
const reportsModel = require("../model/reportsModel");
const mongoose = require("mongoose");

//create report
const createOne = async (req, res) => {
  try {
    const newreport = await new reportsModel(req.body);
    newreport.userId = req.user._id;
    await newreport.save();
    res.status(200).json(newreport);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//get all report
const getAll = async (req, res) => {
  try {
    const reportsQuery = await reportsModel.find().populate("userId");
    res.status(200).json(reportsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get a report
const getOne = async (req, res) => {
  try {
    const reportsQuery = await reportsModel
      .findById(req.params.id)
      .populate("userId");
    res.status(200).json(reportsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all approved reports
const getReportUnAction = async (req, res) => {
  try {
    const reportsQuery = await reportsModel
      .find({
        isAction: false,
      })
      .populate("userId");
    res.status(200).json(reportsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update one
const updateOne = async (req, res) => {
  try {
    const reportsQuery = await reportsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(reportsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//approved
const approved = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(401).json({ message: "only admin can do this" });
    const reportsQuery = await reportsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isAction: true },
      },
      { new: true }
    );
    res.status(200).json(reportsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//approved
const unApproved = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(401).json({ message: "only admin can do this" });
    const reportsQuery = await reportsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isAction: false },
      },
      { new: true }
    );
    res.status(200).json(reportsQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//delete
const deleteOne = async (req, res) => {
  try {
    const reportQuery = await reportsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted", reportQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createOne,
  getAll,
  getOne,
  getReportUnAction,
  updateOne,
  approved,
  unApproved,
  deleteOne,
};
