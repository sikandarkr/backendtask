const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { requireSession } = require("./middlewares/requireSession");
const cors = require("cors");
const general = require("./routes/general");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.options("*", cors());
app.set("secretKey", "nodeRestApi"); // jwt secret token
//public route
app.use("/pub/proxy", requireSession, general);
app.use("/api/proxy", requireSession, general);
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  res.json({ error: "Error" + err });

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(process.env.PORT, function () {
  console.log("Node server listening on port 5000");
});
