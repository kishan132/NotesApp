const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
      unique: true,
      maxlength: 10,
      minlength: 10
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.index({ phone: 1 });

userSchema.virtual("note", {
  ref: "Note",
  localField: "_id",
  foreignField: "author"
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
