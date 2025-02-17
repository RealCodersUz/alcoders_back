const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addProductsSchema,
  patchProductsSchema,
  allProductsSchema,
} = require("./_schemas");
const addProductsService = require("./addProducts");
const editProductsService = require("./editProducts");
const showProductsService = require("./showProducts");
const removeProductsService = require("./removeProducts");
const allProductsService = require("./allProducts");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addProducts = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addProductsSchema);

    const result = await addProductsService(req);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchProducts = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchProductsSchema);
    const result = await editProductsService({
      id: req.params.id,
      req,
      ...req.body,
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
const showProducts = async (req, res, next) => {
  try {
    const result = await showProductsService({ id: req.params.id });

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

const getProducts = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allProductsSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const categoryId = req.query.categoryId;
    const result = await allProductsService({
      q: query.q,
      sort: query.sort,
      categoryId: categoryId,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.products,
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
const deleteProducts = async (req, res, next) => {
  try {
    const result = await removeProductsService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProducts,
  patchProducts,
  showProducts,
  deleteProducts,
  getProducts,
};
