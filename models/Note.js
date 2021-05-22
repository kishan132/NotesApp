const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    note: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

noteSchema.index({ author: 1, updatedAt: -1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
