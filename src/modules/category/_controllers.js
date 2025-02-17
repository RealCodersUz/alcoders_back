const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addCategorySchema,
  patchCategorySchema,
  allCategorySchema,
} = require("./_schemas");
const addCategoryService = require("./addCategorys");
const editCategoryService = require("./editCategory");
const showCategoryService = require("./showCategory");
const removeCategoryService = require("./removeCategory");
const allCategoryService = require("./allCategory");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addCategory = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addCategorySchema);

    const result = await addCategoryService(req);

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

const patchCategory = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchCategorySchema);
    if (req?.file) {
      let SITE_URL = process.env.SITE_URL;
      let image = `${SITE_URL}/${req.file.filename}`;
      console.log(`${SITE_URL}/${req.file.filename}`);
      // Only pass the necessary data from req.body
      req.body.image = image;
    }
    const result = await editCategoryService({
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
const showCategory = async (req, res, next) => {
  try {
    const result = await showCategoryService({ id: req.params.id });

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

const getCategory = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allCategorySchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allCategoryService({
      q: query.q,
      sort: query.sort,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.category,
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
const deleteCategory = async (req, res, next) => {
  try {
    const result = await removeCategoryService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCategory,
  patchCategory,
  showCategory,
  deleteCategory,
  getCategory,
};
