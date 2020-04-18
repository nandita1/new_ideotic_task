const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")
//const expressValidator = require("express-validator");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")

//app
const app = express();

//db
mongoose
    .connect('mongodb+srv://nandita:nandita@cluster0-i9csd.mongodb.net/ideotic_task?retryWrites=true&w=majority', {
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client_new', 'build', 'index.html')); // relative path
    });
}

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
