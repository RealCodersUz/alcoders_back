const { NotFoundError } = require("../../shared/errors");
const Feedback = require("./Feedback");

const editFeedbackService = async ({ id, ...changes }) => {
  console.log(changes.changes);
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      changes.changes,
      {
        new: true,
      }
    );

    if (!updatedFeedback) {
      throw new NotFoundError("Feedback Not Found.");
    }

    return updatedFeedback;
  } catch (error) {
    throw error;
  }
};

module.exports = editFeedbackService;
