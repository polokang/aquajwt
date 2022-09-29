const express = require("express")
require("envdotjson").load()
require("express-async-errors")

const helmet = require("helmet")
const swaggerUi = require("swagger-ui-express")
var bodyParser = require('body-parser');
// const YAML = require("yamljs")

// const swaggerSpec = YAML.load("./swagger/swagger.yaml")
const routes = require("./routes")

const app = express()

const PORT = process.env.PORT || 8081

app.use(bodyParser.json());
app.use("/api", routes)



app.listen(PORT, () => {
  console.log(`Dev Server is listening on PORT: ${PORT}`)
})

app.get("/", (req, res) => {
  res.send("welecom to aqureport...")
})
module.exports = app