import mongoose from "mongoose";

const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
  projectTweet: {
    type: String,
    required: true,
  },
  productPitch: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
    required: false,
  },
  referral: {
    type: String,
    required: false,
  },
  helpfulLinks: {
    type: String,
    required: true,
  },
  founderBackground: {
    type: String,
    required: true,
  },
  evidenceOfExceptionalAbility: {
    type: String,
    required: true,
  },
  discordId: {
    type: String,
    required: false,
  },
  votes: {
    type: [String],
    required: true,
    default: [],
  },
  submittedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
