'use strict'

// Dependencies
const express = require('express')
const Product = require('../../models/Product');
const {validateJwtToken, validateUserRole} = require('../../middleware/jwt')

// Create Router to handle this specific route (/api/v1/products)
const products = express.Router();

/* GET /api/v1/products
 * Define the routes/endpoints
 */

// Get all products
// GET /api/v1/products
products.get('/', async (req, res) => {

  /* GET /api/v1/products
  
    Swagger/OpenAPI documentation - Must be inside the Method/API endpoint.

    #swagger.operationId = "getProducts"
    #swagger.tags = ["Products"]
    #swagger.summary  = "Get all products"
    #swagger.description  = "Retrieve a listing of all products in the database. If you want a single item, use /api/v1/products{sku} instead."
    #swagger.consumes = ["application/json"]
    #swagger.produces = ["application/json"]
    #swagger.responses[200] = {
    description:"List of all products.",
    schema: [{ $ref: "#/definitions/Product"}]
    }
    #swagger.responses[500] = {
    description:"Server-side error.",
    schema: { message:"some error message..."}
    }

  */

  try{
    // const projection = {_id:0}
    const productDetails = await Product.find()
     return res.send({
      data:productDetails,
  });
  } catch(error){
    // send error response if something goes wrong
      return res.status(500).send({
        success:false,
        message:error.message,
    });
  }
});

// Get a product
// GET /api/v1/products/:sku
products.get('/:sku', async (req, res) => {

  /* GET /api/v1/products/:sku
    
    #swagger.operationId = "getProduct"
    #swagger.tags = ["Products"]
    #swagger.summary  = "Get a product"

    swagger.auto = false
    swagger.parameters["sku"] = {
      in:"path",
      description: "Code of a product.",
      required:true,
    }

  */

  // Extract sku from request parameters
   const inputData = {
    sku: req.params.sku
  }
try{
  // validate sku using mongoose schema
  await Product.validate(inputData,"sku")

  // filter for mongodb query
  const filter = {sku: inputData.sku.toUpperCase().trim()}

  // Find the product that matches the given sku
  const data = await Product.findOne(filter)
  
  if(!data){
    // #swagger.responses[400] = {schema: {message:"Error message..."}}
    return res.status(404).send({
      message:`Product with sku: ${inputData.sku} not found.`
  })
  }
  // #swagger.responses[200] = {schema:{$ref: "#/definitions/Product"}}
  else return res.status(200).send(data);

}catch(error){
  // #swagger.responses[500] = {schema: {message:"Error message..."}}
  return res.status(500).send({
    message:error.message,
  })
}
  
});

// Add a product
// POST /api/v1/products
products.post('/', validateJwtToken, async(req, res) =>{
  /* POST /api/v1/products/:sku
    
    #swagger.operationId = "postProduct"
    #swagger.tags = ["Products"]
    #swagger.summary  = "Create a product"
    #swagger.parameters["sku"] = {
      description: "Code of a product.",
    }

  */
try{
  // Build input data object
  const inputData = {
    sku: req.body.sku?.toUpperCase().trim(),
    name: req.body.name?.trim(),
    price: req.body.price,
    stockOnHand : req.body.stockOnHand
  }
  // validate using mongoose schema
  await Product.validate(inputData)

// check for existing sku
const existingSku = await Product.findOne({sku: inputData.sku})
if(existingSku){
  return res.status(409).send({
    message: "SKU already exists."
  })
}
// create product
const newProduct = new Product(inputData)
const savedProduct = await newProduct.save()
return res.status(201).send({
  message:"Product created successfully!",
  data: savedProduct
})
}catch(error){
  return res.status(400).send({message:error.message})
}
}
)

// Update a product (entire product object)
// PUT /api/v1/products/:sku
products.put('/:sku', validateJwtToken, async (req, res) => {

  /* PUT /api/v1/products/:sku
    
    #swagger.operationId = "updateProduct"
    #swagger.tags = ["Products"]
    #swagger.summary  = "Replace a product completely"
    #swagger.parameters["sku"] = {
      description: "Code of a product.",
    }

  */

  // build document object with the request body
  const inputData = {
    sku: req.body.sku?.toUpperCase().trim(),
    name: req.body.name?.trim(),
    price: req.body.price,
    stockOnHand : req.body.stockOnHand
  }

  // Validate input data against the mongoose model
  try{
    // validate the input data

    // request body
    await Product.validate(inputData)  

    // URL/ query string 
    await Product.validate({sku:req.params.sku},"sku")

  }catch(error){
    // validation error 
    return res.status(400).send({
      message:error.message
    })
  }

  // update item in the database

  // Build filter to find product by sku
  const filter = {sku: req.params.sku}

  try{
    // Find the product (by sku in the URL )and replace it
  const data = await Product.findOneAndReplace(filter, inputData)

  // check if nothing was found
  if(data == null){

    // If product not found return 404
    return res.status(404).send({
      message:`Product with the given sku: ${req.params.sku} not found.`
    })
  }
    // send a confirmation message if product has been replaced successfully
    return res.status(200).send({
      message:`Product ${data.sku}:${data.name} has been replaced successfully.`
    })

  }catch(error){
    // handle unexpected error 
    return res.status(400).send({
      message: error.message
    })

  }
});

// Update a product (partial update)
// PATCH /api/v1/products/:sku
products.patch('/:sku', validateJwtToken, async (req, res) => {
   /* PATCH /api/v1/products/:sku
    
    #swagger.operationId = "updateProduct"
    #swagger.tags = ["Products"]
    #swagger.summary  = "Update a product completely"
    #swagger.parameters["sku"] = {
      description: "Code of a product.",
    }

  */

  // Filter out non existing model properties

  const allowedProperties =["sku","name","price","stockOnHand"]

  for (const propertyName of Object.keys(req.body)){
    if(!allowedProperties.includes(propertyName))delete req.body[propertyName]
  }

// build document object with the request body
  const inputData = req.body

  // Validate input data against the mongoose model
  try{
    // validate the input data

    // URL/ query string 
    await Product.validate({sku:req.params.sku},"sku")

    // request body
    await Product.validate(inputData,Object.keys(inputData))  

  }catch(error){
    // validation error 
    return res.status(400).send({
      message:error.message
    })
  }

  // update item in the database

  try{

    // Define filter to find product by sku
    const filter = {sku: req.params.sku}

    // Find the product (by sku in the URL )and partially update it with the given data
  const data = await Product.findOneAndUpdate(filter, inputData)

  // check if nothing was found
  if(data == null){

    // If product not found return 404
    return res.status(404).send({
      message:`Product with the given sku: ${req.params.sku} not found.`
    })
  }
    // send a confirmation message if product has been updated successfully
    return res.status(200).send({
      message:`Product with sku: ${data.sku} has been updated successfully.`
    })

  }catch(error){
    // handle unexpected error 
    return res.status(400).send({
      message: error.message
    })

  }

});

// Delete a product
// DELETE /api/v1/products/:sku
products.delete('/:sku', validateJwtToken, async (req, res) => {
  /* DELETE /api/v1/products/:sku
    
    #swagger.operationId = "deleteProduct"
    #swagger.tags = ["Products"]
    #swagger.summary  = "Delete a product"
    #swagger.parameters["sku"] = {
      description: "Code of a product.",
    }

  */

  // Extract sku from request parameters 
  const inputData = {
    sku: req.params.sku
  }

  // Validating sku using mongoose schema validation 
  try{
    await Product.validate(inputData,"sku")

  }catch(error){
    return res.status(400).send(
      {
        message:error.message
      })
  }

  // Build filter to find product by sku
  const filter = {sku: inputData.sku}

  try{
    // Find the product by sku and delete it
  const data = await Product.findOneAndDelete(filter)

  // check if nothing was found
  if(data == null){

    // If product not found return 404
    return res.status(404).send({
      message:`Product with the given sku: ${inputData.sku} not found.`
    })
  }
    // send a confirmation message if product has been deleted successfully
    return res.status(200).send({
      message:`Product with the given sku: ${inputData.sku} has been deleted.`
    })

  }catch(error){
    // handle unexpected errors
    return res.status(500).send ({
      message: "An unexpected error occured while deleting the product.",
      error: error.message
    }) 
  }
});

// Export/return the Router to the calling code
module.exports = products;