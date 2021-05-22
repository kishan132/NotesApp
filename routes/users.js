const express = require("express");
const jwt = require("jsonwebtoken");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = require("twilio")(accountSid, authToken);

const auth = require("../middleware/auth");

const User = require("../models/User");
const Note = require("../models/Note");

const {
  validateRegisterInput,
  validatePhoneInput,
  validateVerifyInput,
  validateUpdateInput
} = require("../validation/users/index");

const { sendVerificationCode } = require("../messages/index");

const router = express.Router();

// Register User and Send Verification Code
router.post("/users", async (req, res) => {
  console.log("Requesting register user");
  const { phone, name } = req.body;

  const { errors, isValid } = validateRegisterInput({ phone, name });
  if (!isValid) {
    return res.status(400).send({ errors: errors });
  }

  try {
    const isUser = await User.findOne({ phone }).select({ phone: 1 }).lean();
    if (isUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "User with this phone already exist" }] });
    }

    const user = new User({ phone, name });

    await user.save();

    sendVerificationCode(phone);

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Send & Resend Verification Code
router.post("/users/send-otp", async (req, res) => {
  const { phone } = req.body;

  const { errors, isValid } = validatePhoneInput({ phone });
  if (!isValid) {
    return res.status(400).send({ errors: errors });
  }

  try {
    const user = await User.findOne({ phone }).select({ phone: 1 }).lean();
    if (!user) {
      return res
        .status(400)
        .send({ errors: [{ msg: "User is not registered" }] });
    }

    sendVerificationCode(phone);

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Mobile Code Verification Route
router.post("/users/verify", async (req, res) => {
  const { phone, code } = req.body;

  const { errors, isValid } = validateVerifyInput({ phone, code });
  if (!isValid) {
    return res.status(400).send({ errors: errors });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).send({ errors: [{ msg: "Unable to find user" }] });
    }

    const verification_check = await client.verify
      .services(verifyServiceSid)
      .verificationChecks.create({ to: `+91${phone}`, code: code });

    if (
      verification_check.status !== "approved" ||
      verification_check.status === "pending"
    ) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Invalid verification code" }] });
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7 days"
      }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Logout from current device or session
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// Logout from all devices
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// Get User
router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send();
  }
});

// Update User
router.patch("/users/me", auth, async (req, res) => {
  const { name } = req.body;

  const updates = Object.keys({ name });
  const allowedUpdates = ["name"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ errors: [{ msg: "Invalid Updates" }] });
  }

  const { errors, isValid } = validateUpdateInput({ name });
  if (!isValid) {
    return res.status(400).send({ errors: errors });
  }

  try {
    req.user.name = name;

    await req.user.save();

    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete User (Delete Notes and User)
router.delete("/users/me", auth, async (req, res) => {
  try {
    const [, user] = await Promise.all([
      Note.deleteMany({ author: req.user._id }),
      req.user.remove()
    ]);

    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
