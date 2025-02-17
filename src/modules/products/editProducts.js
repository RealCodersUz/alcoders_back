const Products = require("./Products");

const editProductsService = async ({ id, ...changes }) => {
  try {
    const updatedProducts = await Products.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedProducts) {
      throw new NotFoundError("Product Not Found.");
    }

    return updatedProducts;
  } catch (error) {
    throw error;
  }
};

module.exports = editProductsService;
