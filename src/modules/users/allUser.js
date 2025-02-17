const Sales = require("../sales/Sales");
const User = require("./User");

const allUser = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      const nameQuery = {
        $or: [
          { full_name: { $regex: q, $options: "i" } },
          { role: { $regex: q, $options: "i" } },
        ],
      };
      searchQuery.$and = [nameQuery];
    }

    // Sorting
    if (sort && sort.by) {
      sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
    }

    // Pagination
    const itemsPerPage = parseInt(limit) || 3;
    const currentPage = parseInt(page) || 1;
    const offset = parseInt(page.offset) || 0;
    const requestedLimit = parseInt(page.limit) || itemsPerPage;

    paginationOptions.skip = offset;
    paginationOptions.limit = requestedLimit;

    const data = await User.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    // Fetch sales for each admin
    const adminSalesPromises = data.map(async (admin) => {
      const salesByMonth = {};

      // Fetching sales using the "admin_id" field, which contains IDs of admins
      const sales = await Sales.find({ admin_id: admin._id }).lean().exec();

      // Group sales by month
      sales.forEach(sale => {
        if (sale.updatedAt instanceof Date) { // Check if updatedAt is already a Date object
          const monthYear = sale.updatedAt.toISOString().slice(0, 7); // Extracting month-year format
          if (!salesByMonth[monthYear]) {
            salesByMonth[monthYear] = [];
          }
          salesByMonth[monthYear].push(sale);
        } else {
          const updatedAtDate = new Date(sale.updatedAt); // Convert string to Date object
          if (!isNaN(updatedAtDate.getTime())) { // Check if conversion is successful
            const monthYear = updatedAtDate.toISOString().slice(0, 7); // Extracting month-year format
            if (!salesByMonth[monthYear]) {
              salesByMonth[monthYear] = [];
            }
            salesByMonth[monthYear].push(sale);
          }
        }
      });

      return { user: admin, sales: salesByMonth };
    });

    // Wait for all promises to resolve
    const adminSales = await Promise.all(adminSalesPromises);

    const totalUser = await User.countDocuments(searchQuery);

    return {
      data: adminSales,
      pageInfo: {
        total: totalUser,
        offset: paginationOptions.skip,
        limit: paginationOptions.limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allUser;

