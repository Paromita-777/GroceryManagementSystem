'use strict'

// Dependencies
const express = require('express')
const Employee = require('../../models/Employee');
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {validateJwtToken, validateUserRole} = require('../../middleware/jwt')

// enable .env file 
require('dotenv').config()

// Create Router to handle this specific route (/api/v1/products)
const employees = express.Router()

/*
 * Define the routes/endpoints
 */

// Get all employees
// GET /api/v1/employees
employees.get('/',  async (req, res) => {
  /* GET /api/v1/employees
    Swagger/OpenAPI documentation - Must be inside the Method/API endpoint.
    
    #swagger.operationId = "getEmployee"
    #swagger.tags = ["Employees"]
    #swagger.summary  = "Get list of employees"
    #swagger.description = "Retrieving a list of all employees from database."
    #swagger.responses [200] ={
    description: "List of all employees",
    schema:[{ref:"#/definitions/Employee"}]
    }
    #swagger.responses [500] = {
    description: "Server-side error",
    schema: {message: "Some error message..."}
    }

    #swagger.security = [{"Bearer": []}]


  */

  try{
    const filter = {}
    const projection = {_id:0, empId:1,firstName:1, lastName:1 }
    const employeeDetails = await Employee.find(filter, projection).lean()
     return res.send({
      data:employeeDetails,
  });
  } catch(error){
    // send error response if something goes wrong
      return res.status(500).send({
        success:false,
        message:error.message,
    });
  }
});

// Get an employee
// GET /api/v1/employees/:userName
employees.get('/:userName', async (req, res) => {

   /* 
    Swagger/OpenAPI documentation - Must be inside the Method/API endpoint.
    /* GET /api/v1/employees/
    #swagger.operationId = "getAnEmployee"
    #swagger.tags = ["Employees"]
    #swagger.summary  = "Get an employee"
    #swagger.parameters["username"] = {
      description: "Code of a employee.",
    }

  */

  // Extract username from request parameters
   const inputData = {
    username: req.params.userName
  }
try{
  // validate username using mongoose schema
  await Employee.validate(inputData,"username")

  // filter for mongodb query
  const filter = {username: inputData.username.trim()}

  // projection 
  const projection = {_id:0, empId:1,firstName:1, lastName:1, }
  

  // Find the employee that matches the given username
  const data = await Employee.findOne(filter, projection).lean()
  
  if(!data){
    return res.status(404).send({
      message:`Employee not found.`
  })
  }
  else return res.status(200).send(data);

}catch(error){
  return res.status(400).send({
    message:error.message,
  })
}
  
});

// Add an employee
// POST /api/v1/employees
employees.post('/',validateUserRole('admin'), async(req, res) =>{
try{
  // Build input data object
  const inputData = {
    firstName: req.body.firstName?.trim(),
    lastName: req.body.lastName?.trim(),
    username: req.body.username?.trim(),
    password: req.body.password
  }
  // validate password manually
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@$_.])[A-Za-z\d@$_!#.]{6,30}$/;

    if (!passwordRegex.test(inputData.password)) {
      return res.status(400).send({
        message: "Password must be 6-30 characters, include upper/lowercase, one number, and one special character (@ $ _ ! # .)."
      });
    }


  // validate using mongoose schema
  await Employee.validate(inputData, ['firstName','lastName','username'])


// check for existing username
const userNameExists = await Employee.exists({username: inputData.username})
if(userNameExists){
  return res.status(409).send({
    message: "Username already exists."
  })
}

// Hash password before saving employee data to database
  inputData.password = await bcrypt.hash(req.body.password, 10)


// create employee
const newEmployee = new Employee(inputData)
const savedEmployee = await newEmployee.save()
return res.status(201).send({
  message:"A new employee has been created successfully!",
  data: savedEmployee
})
}catch(error){
  return res.status(400).send({message:error.message})
}
}
)


// Login
// POST /api/v1/employees/login
employees.post('/login', async(req, res) =>{

  /* POST /api/v1/employees/login
    #swagger.operationId = "login"
    #swagger.tags =["Employees"]
    #swagger.summary = "Login using username and password."
   
   */

    // Get the request body data (if it exists)

    const {username, password} = req.body || {}

    // Check username and password provided (400 if not)
    if(!username || !password)
      return res.status(400).send({
        message:"Login requires username and password."
      })
    
    // Find matching user

     const employee = await Employee.findOne({username: username})
     
     if(employee === null)
      return res.status(401).send({message:"Username or password incorrect."})
   

    // Check if user's provided password matches hashed password stored in the database  (401-- Unauthorized)

     if (!(await bcrypt.compare(password, employee.password)))
      return res.status(401).send({message:"Username or password incorrect."})

    //Valid username and password
    // Construct JWT toke for authorization (store user data)
    const jwtToken = jwt.sign(
      // 1. Payload
      {
        employee:{
          empId: employee.empId,
          username: employee.username,
          roles:employee.roles ?? [],
        }

      },
      // 2. Secret 
      process.env.JWT_SECRET,

      // 3. Extra option
      {
        expiresIn:"10m",
      }
    )
    
    // Return JWT token
    return res.send({token: jwtToken})
  }
);
// Export/return the Router to the calling code
module.exports = employees;