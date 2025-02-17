const Feedback = require("./Feedback");

let SITE_URL = process.env.SITE_URL;

const addFeedbackService = async (req) => {
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

    // let image = `${SITE_URL}/${req.file.filename}`;
    // for (let i = 0; i < req.files.length; i++) {
    //   images.push(req.files[i] ? `${SITE_URL}/${req.files[i].filename}` : "");
    // }

    const feedback = new Feedback({
      name_uz,
      name_ru,
      name_en,
      name_kr,
      description_uz,
      description_ru,
      description_en,
      description_kr,
    });

    await feedback.save();

    return feedback;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add feedback");
  }
};

module.exports = addFeedbackService;
