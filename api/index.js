const app = require("express")();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const https = require("https");
const http = require("http");

const projects = require("./projects-data.json");

app.set("port", process.env.PORT || 8081);

app.get("/api/source", (req, res) => {
  try {
    res.send(projects);
  } catch (err) {
    var errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage);
  }
});

function processErrorResponse(res, statusCode, message) {
  console.log(`${statusCode} ${message}`);
  res.status(statusCode).send({
    error: {
      status: statusCode,
      message: message,
    },
  });
}

app.listen(app.get("port"), function () {
  console.log(
    "Express app vercel-express-react-demo is running on port",
    app.get("port")
  );
});

module.exports = app;
