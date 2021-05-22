const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const Twilio = require("twilio");

const client = new Twilio(accountSid, authToken);

// Send verification code to user's mobile number
const sendVerificationCode = (phone) => {
  client.verify
    .services(verifyServiceSid)
    .verifications.create({ to: `+91${phone}`, channel: "sms" })
    .then((verification) =>
      console.log("Verification code sent!, Status: ", verification.status)
    );
};

module.exports = {
  sendVerificationCode
};
