const express = require("express");
const path = require("path");
// require rollbar below

// create the Rollbar class below

const app = express();

app.use(express.json());

let studentList = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  // send rollbar some info
});

app.post("/api/student", (req, res) => {
  const { name } = req.body;
  name = name.trim();
  studentList.push(name);
  // add rollbar log here

  res.status(200).send(studentList);
});

const port = process.env.PORT || 4545;

// add rollbar errorHandler middleware here

app.listen(port, () => console.log(`server running on port ${port}`));
