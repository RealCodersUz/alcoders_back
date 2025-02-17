const { NotFoundError } = require("../../shared/errors");
const News = require("./News");

const showNewsService = async ({ id }) => {
  try {
    const news = await News.findById(id);

    if (!news) {
      throw new NotFoundError("News not found.");
    }

    return news;
  } catch (error) {
    throw error;
  }
};

module.exports = showNewsService;
