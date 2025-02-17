const { NotFoundError } = require("../../shared/errors");
const Feedback = require("./Feedback");

const showFeedbackService = async ({ id }) => {
  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      throw new NotFoundError("Feedback not found.");
    }

    return feedback;
  } catch (error) {
    throw error;
  }
};

module.exports = showFeedbackService;
