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
const authRoutes = require("./routes/auth.routes")
const productsRoutes = require("./routes/products.routes")
const workersRoutes = require("./routes/workers.routes")
const ticketsRoutes = require("./routes/tickets.routes")
const rentalsRoutes = require("./routes/rentals.routes")
const ordersRoutes = require("./routes/orders.routes")

const errorMiddleware = require("./middlewares/error.middleware")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "API do Shopping funcionando"
  })
})

app.use("/users", usersRoutes)
app.use("/movies", moviesRoutes)
app.use("/stores", storesRoutes)
app.use("/auth", authRoutes)
app.use("/products", productsRoutes)
app.use("/workers", workersRoutes)
app.use("/tickets", ticketsRoutes)
app.use("/rentals", rentalsRoutes)
app.use("/orders", ordersRoutes)

app.use(errorMiddleware)

module.exports = app