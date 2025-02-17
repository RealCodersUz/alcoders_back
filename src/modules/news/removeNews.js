const { NotFoundError } = require("../../shared/errors");
const News = require("./News");

const removeNewsService = async ({ id }) => {
  const existing = await News.findById(id);

  if (!existing) {
    throw new NotFoundError("News Not Found.");
  }

  let delProd = await News.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );

  return delProd;
};

module.exports = removeNewsService;
