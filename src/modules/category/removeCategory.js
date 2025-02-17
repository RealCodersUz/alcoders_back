const { NotFoundError } = require("../../shared/errors");
const Category = require("./Categorys");

const removeCategoryService = async ({ id }) => {
  const existing = await Category.findById(id);

  if (!existing) {
    throw new NotFoundError("Category Not Found.");
  }

  let delProd = await Category.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );

  return delProd;
};

module.exports = removeCategoryService;
