const { NotFoundError } = require("../../shared/errors");
const Category = require("./Categorys");

const editCategoryService = async ({ id, ...changes }) => {
  console.log(changes.changes);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      throw new NotFoundError("Catyegory Not Found.");
    }

    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

module.exports = editCategoryService;
