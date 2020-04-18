const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const expressValidator = require("express-validator");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")

//app
const app = express();

//db
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected");
    });

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//app.use(expressValidator());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", postRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
