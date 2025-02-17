const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addFeedbackSchema,
  patchFeedbackchema,
  allFeedbackchema,
} = require("./_schemas");
const addFeedbackervice = require("./addFeedback");
const editFeedbackervice = require("./editFeedback");
const showFeedbackervice = require("./showFeedback");
const removeFeedbackervice = require("./removeFeedback");
const allFeedbackervice = require("./allFeedback");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addNews = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addFeedbackSchema);

    const result = await addFeedbackervice(req);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    console.log(error);
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const patchNews = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchFeedbackchema);
    // if (req?.file) {
    //   let SITE_URL = process.env.SITE_URL;
    //   let image = `${SITE_URL}/${req.file.filename}`;
    //   console.log(`${SITE_URL}/${req.file.filename}`);
    //   // Only pass the necessary data from req.body
    //   req.body.image = image;
    // }
    const result = await editFeedbackervice({
      id: req.params.id,
      changes: { ...req.body }, // Include image in the changes
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showNews = async (req, res, next) => {
  try {
    const result = await showFeedbackervice({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getNews = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allFeedbackchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allFeedbackervice({
      q: query.q,
      sort: query.sort,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.feedback,
      pageInfo: {
        total: result.total,
        offset: result.offset,
        limit: result.limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteNews = async (req, res, next) => {
  try {
    const result = await removeFeedbackervice({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNews,
  patchNews,
  showNews,
  deleteNews,
  getNews,
};
