const Products = require("./Products");

let SITE_URL = process.env.SITE_URL;

const addProductsService = async (req) => {
  try {
    const {
      name_uz,
      name_ru,
      name_en,
      name_kr,
      description_uz,
      description_ru,
      description_en,
      description_kr,
      price,
      type,
      included_uz,
      included_en,
      included_kr,
      included_ru,
      discount,
      category_id,
    } = req.body;

    let image = req.file ? `${SITE_URL}/${req.file.filename}` : null;

    const product = new Products({
      name_uz,
      name_ru,
      name_en,
      name_kr,
      description_uz,
      description_ru,
      description_en,
      description_kr,
      price,
      type,
      included_uz,
      included_en,
      included_kr,
      included_ru,
      discount,
      category_id,
      image: image,
    });

    await product.save();

    return product;
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw new Error("Failed to add product");
  }
};

module.exports = addProductsService;
