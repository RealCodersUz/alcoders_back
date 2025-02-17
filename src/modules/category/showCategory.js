const { NotFoundError } = require("../../shared/errors");
const Category = require("./Categorys");

const showCategoryService = async ({ id }) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      throw new NotFoundError("Category not found.");
    }

    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = showCategoryService;
