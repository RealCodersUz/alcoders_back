const Products = require("./Products");

const allProductsService = async (query) => {
  try {
    const { q, page, limit, sort, categoryId } = query || {};

    const searchQuery = { is_deleted: false };
    const sortOptions = {};
    const paginationOptions = {};

    if (q) {
      searchQuery.title = { $regex: q, $options: "i" };
    }

    if (categoryId) {
      // Add categoryId filter
      searchQuery.category_id = categoryId;
    }

    const itemsPerPage = parseInt(limit) || 5;
    const offset = parseInt(page.offset) || 0;
    const requestedLimit = parseInt(page.limit) || itemsPerPage;

    paginationOptions.skip = offset;
    paginationOptions.limit = requestedLimit;

    if (sort && sort.by) {
      if (
        sort.by === "name_uz" ||
        sort.by === "price" ||
        sort.by === "quantity"
      ) {
        sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
      } else if (sort.by === "createdAt") {
        // Change "new" to "createdAt"
        sortOptions.createdAt = sort.order === "desc" ? -1 : 1;

        console.log("else ifda");
        console.log(sortOptions, "SPRT OPITIONS");

        //
      }
    }

    const products = await Products.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalProducts = await Products.countDocuments(searchQuery);

    return {
      products: products,
      total: totalProducts,
      offset: paginationOptions.skip,
      limit: paginationOptions.limit,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allProductsService;
