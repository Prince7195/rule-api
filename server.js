const expess = require("express");
const app = expess();
const bodyParser = require("body-parser");

const trools = require("./routes/trools");

const PORT = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res,next) => {
    res.status(200).send("Welcome to Rule Engine!");
})

app.use("/trools", trools);

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
