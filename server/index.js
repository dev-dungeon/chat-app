require("dotenv").config()
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const errorHandler = require("./helpers/error");

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

// handle 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
