var express = require("express"),
    app = express();

app.set("port", (process.env.port || 5000));

app.use(express.static(__dirname + "/"));

app.get("/*", function(req, res) {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(app.get("port"), function() {
  console.log("App is running on port", app.get("port"));
});
