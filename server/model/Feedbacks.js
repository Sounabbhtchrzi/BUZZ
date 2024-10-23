import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // email validation (optional)
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
