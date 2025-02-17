const News = require("./News");

const allNewsService = async (query) => {
  try {
    const { q, page, limit, sort } = query || {};

    const searchQuery = { is_deleted: false };
    const sortOptions = {};
    const paginationOptions = {};

    if (q) {
      searchQuery.title = { $regex: q, $options: "i" };
    }

    const itemsPerPage = parseInt(limit) || 10000;
    const currentPage = parseInt(page) || 1;
    const offset = parseInt(page.offset) || 0;
    const requestedLimit = parseInt(page.limit) || itemsPerPage;

    paginationOptions.skip = offset;
    paginationOptions.limit = requestedLimit;

    if (sort && sort.by) {
      if (sort.by === "name_uz") {
        sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
      }
    }

    const news = await News.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalNews = await News.countDocuments(searchQuery);

    return {
      news: news,
      total: totalNews,
      offset: paginationOptions.skip,
      limit: paginationOptions.limit,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allNewsService;
