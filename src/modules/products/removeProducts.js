const { NotFoundError } = require("../../shared/errors");
const Products = require("./Products");

const removeProductsService = async ({ id }) => {
  const existing = await Products.findById(id);

  if (!existing) {
    throw new NotFoundError("Product Not Found.");
  }

  let delProd = await Products.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );

  return delProd;
};

module.exports = removeProductsService;
