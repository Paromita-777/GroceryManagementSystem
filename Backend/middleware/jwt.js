
'use strict'

// Dependencies
const jwt = require('jsonwebtoken')

// enable .env file 
require('dotenv').config() 

// validate a JWT token - should be in HTTP header
const validateJwtToken = (req, res, next) => {

  // Testing 
  console.log("Validate JWTToken middleware called.")

  // Get the authorization header (case insensitive)
  const authHeader = req.get("Authorization")

  // Check if the header exists and it has the "Bearer"
  if(!(authHeader && authHeader.split(' ')[0] === "Bearer"))
    // No "Authorization: Bearer" present
    return res.status(401).send({message:`Unauthorised: 'Authorization: Bearer <token>' missing.`})

  
  // Extract the JWT token from header (after Bearer)
  const token = authHeader.split(" ")[1]

  // check if token is missing
  if(!token)
    return res.status(401).send({message: "Unauthorised: JWT token missing."})

  // verify the JWT token is valid using the secret in .env
  jwt.verify(token, process.env.JWT_SECRET,(error, decoded) => {

  // Check if JWT invalid
  if(error) return res.status(401).send({message: `Invalid JWT token: ${error}`})

  // Decode JWT token and put token data into the request object(req)
  // This allow us pass data to the next handler
  req.token = decoded

  // Testing : log decoded JWT
  console.log(decoded)


  // pass control to the next request handler
  next()
} )
}


/**
 * Ensures that the user is logged in successfully and is in the specified role. This also validates the JWT token.
 * @param {string} roleName The name of the role the user must be in 
 */
const validateUserRole =(roleName) =>{

  // When validateUserRole is called it returns a handler function

  return (req, res, next) => {
    
    // Validate JWT token, then call our role-validation code
    validateJwtToken(req, res, () => {

      // check if the user doesn't have the role 
      if(!(req.token.employee.roles && req.token.employee.roles.includes(roleName)))
        {
        // 403 forbidden
        return res.status(403).send({message:"Forbidden: Invalid role for this action."})
      }

      // Testing
      // console.log(`Employee role verified. Employee: ${req.token.employee.firstName} Role: ${roleName}`)

      // Pass control to the next request handler
      next()
    }) 
  }

}

// Export JWT helper
module.exports = {
  validateJwtToken,
  validateUserRole
}