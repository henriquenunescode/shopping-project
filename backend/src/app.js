/* const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

module.exports = app */

const express = require("express")
const cors = require("cors")

const usersRoutes = require("./routes/users.routes")
const moviesRoutes = require("./routes/movies.routes")
const storesRoutes = require("./routes/stores.routes")

const errorMiddleware = require("./middlewares/error.middleware")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/movies", moviesRoutes)
app.use("/stores", storesRoutes)

app.use(errorMiddleware)

module.exports = app