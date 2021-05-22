const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false
  })
  .then(() => {
    console.log("MongoDB Connected Successfully!!");
  })
  .catch(() => {
    console.log("MongoDB Connection Failed!!");
  });
