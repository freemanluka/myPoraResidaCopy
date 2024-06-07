const express = require("express");
require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/handler")

const {PORT} = require("./config/envConfig")

const app = express();

require("./operations/routes")(app)
require("./operations/db")(app)

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Resida app is listening on port ${PORT}`)
})
