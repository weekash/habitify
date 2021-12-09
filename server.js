const express = require("express");
const dotenv = require("dotenv");
const app = express();

const connectDB = require("./db");
const path = require("path");
dotenv.config();
app.use(express.json({ extended: true }));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/habit", require("./routes/api/habit"));
app.use("/api/history", require("./routes/api/history"));

//server static assets

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("server successfully started on port 5000");
});
