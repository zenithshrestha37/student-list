const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");
const cors = require("cors");

let rollbar = new Rollbar({
  accessToken: "414f61a39955404b807df8b0b8a9ddb6",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// require rollbar below

// create the Rollbar class below

const app = express();
app.use(express.json());
app.use(cors());
let studentList = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  // send rollbar some info
  rollbar.info("html file server successfully");
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = studentList.findIndex((studentName) => {
    return studentName === name;
  });

  if (index === -1 && name !== "") {
    studentList.push(name);
    // add rollbar log here

    res.status(200).send(studentList);
  } else if (name === "") {
    // add a rollbar error here

    res.status(400).send({ error: "no name was provided" });
  } else {
    // add a rollbar error here too

    res.status(400).send({ error: "that student already exists" });
  }
});

const port = process.env.PORT || 4545;

// add rollbar errorHandler middleware here

app.listen(port, () => console.log(`server running on port ${port}`));
