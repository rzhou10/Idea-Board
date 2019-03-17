const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const configRoutes = require("./routes");
const cors = require("cors");
const pages = express.static(__dirname + "/public");

app.use("/", pages);
app.use(bodyParser.json());
app.use(cors());
configRoutes(app);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || PORT);