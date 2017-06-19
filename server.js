var express = require("express"),
    app = express(),
    router = express.Router();

app.set("port", (process.env.port || 5000));

router.use(function (req, res, next) {
  console.log("%s %s", req.method, req.originalUrl);
  next();
});

app.use(express.static(__dirname + "/"));

router.get("/*", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

app.use("/*", router);

app.listen(app.get("port"), function () {
  console.log("App is running on port", app.get("port"));
});
