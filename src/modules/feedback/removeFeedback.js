const { NotFoundError } = require("../../shared/errors");
const Feedback = require("./Feedback");

const removeFeedbackService = async ({ id }) => {
  const existing = await Feedback.findById(id);

  if (!existing) {
    throw new NotFoundError("Feedback Not Found.");
  }

  let delProd = await Feedback.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );

  return delProd;
};

module.exports = removeFeedbackService;
