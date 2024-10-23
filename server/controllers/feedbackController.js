import Feedback from '../model/Feedbacks.js';

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const feedback = new Feedback({
      name,   // Optional
      email,  // Optional
      message // Required
    });

    await feedback.save();

    // Send success response
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    // Handle errors, e.g., validation failures
    res.status(400).json({
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
};
