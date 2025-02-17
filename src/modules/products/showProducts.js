const { NotFoundError } = require("../../shared/errors");
const Products = require("./Products");

const showProductsService = async ({ id }) => {
  try {
    const product = await Products.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found.");
    }

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = showProductsService;
