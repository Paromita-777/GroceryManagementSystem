// Require dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')


// enable .env file
require('dotenv').config()

// Setup the basic Express app
// creating an instance of express application which will be used to define routes, middleware and settings.
const app = express()

// set the port number where the server will listen for requests.
// const port = 3000
const port = process.env.PORT



/* 
 * MongoDB connection string
 * 
 * Examples:
 * 
 *   - localhost with no authentication
 *     mongodb://{server}:{port}/{default_db}
 * 
 *   - localhost with basic authentication (username + password)
 *     mongodb://{username}:{password}@{server}:{port}/{default_db}?authSource={auth_db}&authMechanism={auth_type}
 */

const dbConnectionString = process.env.MONGODB_CONNECTION_STRING
// const dbConnectionString = `mongodb://administrator:password%40123@localhost:27017/GroceryManagemetSystem?directConnection=true&authSource=admin`

// Config API to automatically parse incoming JSON requests (put parsed data in req.body)
app.use(express.json())

// Enable CORS + pre-flight requests for ALL routes/endpoints across the app
// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors({
  origin: "*",  // "http://server.com/"
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
  optionsSuccessStatus: 200  // 204 is not liked by some legacy browsers (IE11, smart TVs, etc)
}))

/*
* OpenAPI/Swagger API documentation
 */

// Expose OpenAPI/Swagger docs via the swaggerUI web interface
const swaggerFile = require('./swagger.json')
const swaggerUiExpressOptions ={
  swaggerOptions:{
    persistAuthorization:true,
  }
}
app.use(`/swagger/v1`, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiExpressOptions))


// Store Mongoose DB connection to MongoDB database
const dbConnection = mongoose.connection

// OPTIONAL: Code to run if Mongoose connects successfully
// dbConnection.once("connected", () => {
//   console.log("DB connected successfully! 😀")
// })

// Error handler for any Mongoose database errors
dbConnection.on("error", (err) => {
  console.log("DB error: " + err)
})

// Using Mongoose to connect to our MongoDB database
mongoose
  // Try connecting to the database
  .connect(dbConnectionString)
  // Success - connected to DB 😀
  .then(() => {

    console.log("DB connected successfully! 😀")

    // Routing using controllers (breaking logic into separate files/locations)
    // Everything for /api/v1 is in /controllers/api_v1/...
    app.use('/api/v1/products', require('./controllers/api_v1/products'));
    app.use('/api/v1/employees', require('./controllers/api_v1/employees'));

  })
  // Error - problem connecting to DB ❌
  .catch((err) => {
    
    // Handle errors for the initial database connection
    console.error("Database connection error: " + err)

    // OPTIONAL: Kill Node server, otherwise it will run using ONLY the default routes below
    // This forcefully exists using error state (1)
    process.exit(1)
  })

// Default routes of app
app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send('This product API provides access to products. You should use /api/v1/')
})

// OPTIONAL: Code section that will run only if current file is the entry point.
if (require.main === module) {

  // Start the API listening (waiting for connections)
  app.listen(port, () => {
    console.log(`Product API listening on port ${port}`)
  })

}