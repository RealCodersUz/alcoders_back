const News = require("./News");

let SITE_URL = process.env.SITE_URL;
const addNewsService = async (req) => {
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

    console.log(req, "req");

    // Rasmlarni saqlash
    const image = `${SITE_URL}/${req.file.filename}`; // Rasm URL to'g'ri
    console.log("Image Path:", image); // Tekshirish uchun

    const news = new News({
      name_uz,
      name_ru,
      name_en,
      name_kr,
      description_uz,
      description_ru,
      description_en,
      description_kr,
      image: image, // Rasm maydoni
    });

    await news.save();
    console.log("News saved successfully:", news); // Tekshirish uchun

    return news;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add news");
  }
};

module.exports = addNewsService;
