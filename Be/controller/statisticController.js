const postsModel = require("../model/postsModel");
const reportsModel = require("../model/reportsModel");
const usersModel = require("../model/usersModel");
const eventsModel = require("../model/eventModel");
const jobsModel = require("../model/jobsModel");
const docsModel = require("../model/documentsModel");
const mongoose = require("mongoose");
const { getOnlinePerDay } = require("../socket/socketHelper");

//helper
const get6Lately = (query) => {
  let now = new Date().getMonth() + 1;
  const result = {};
  for (let i = 0; i < 6; i++) {
    if (now == 0) {
      now = 12;
    }
    result[`thang ${now}`] = query.reduce((prev, curr) => {
      if (new Date(curr.createdAt).getMonth() + 1 == now) {
        return prev + 1;
      }
      return prev;
    }, 0);
    now--;
  }
  return result;
};

//new user
const newUsers = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const usersQuery = await usersModel.find().select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = usersQuery.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(usersQuery);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//posts
const newPosts = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await postsModel.find().select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//event
const newEvents = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await eventsModel.find().select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
//reports
const newReports = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await reportsModel.find().select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
//jobs
const newJobs = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await jobsModel.find().select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//docs
const newDocs = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await docsModel.find().select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//docs
const approvedDocs = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await docsModel
      .find({ isApproved: true })
      .select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//docs
const pendingDocs = async (req, res) => {
  if (Object.keys(req.query).length == 0)
    return res.status(200).json({ message: "need query params" });
  try {
    const DBQuerys = await docsModel
      .find({ isApproved: false })
      .select("createdAt");
    let statistic = {};
    switch (req.query.query) {
      case "all":
        {
          statistic["all"] = DBQuerys.length;
        }
        break;
      case "month":
        {
          statistic = get6Lately(DBQuerys);
        }
        break;
      default: {
        statistic = {};
      }
    }

    res.status(200).json(statistic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//user online today
const onlineToday = async (req, res) => {
  try {
    res.status(200).json({ Online: getOnlinePerDay() });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  newUsers,
  newPosts,
  newEvents,
  newReports,
  newJobs,
  newDocs,
  onlineToday,
  approvedDocs,
  pendingDocs,
};
