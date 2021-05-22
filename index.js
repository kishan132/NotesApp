const express = require("express");
const compression = require("compression");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
require("dotenv").config();
require("./db/mongoose");

const userRoutes = require("./routes/users");
const notesRoutes = require("./routes/notes");

const app = express();

const port = process.env.PORT;

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(compression());

app.use(userRoutes);
app.use(notesRoutes);

app.listen(port, () => {
  console.log(`\nServer is live at port ${port}`);
});
