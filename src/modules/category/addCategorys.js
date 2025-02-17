const Category = require("./Categorys");

let SITE_URL = process.env.SITE_URL;

const addCategoryService = async (req) => {
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
    } = req.body;

    let image = `${SITE_URL}/${req.file.filename}`;
    // for (let i = 0; i < req.files.length; i++) {
    //   images.push(req.files[i] ? `${SITE_URL}/${req.files[i].filename}` : "");
    // }

    const category = new Category({
      name_uz,
      name_ru,
      name_en,
      name_kr,
      description_uz,
      description_ru,
      description_en,
      description_kr,
      image: image,
    });

    await category.save();

    return category;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add category");
  }
};

module.exports = addCategoryService;
