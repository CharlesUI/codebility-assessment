# This is the backend assessment challenge complete by "Charles David Vivas"

# Main technologies
  - Javascript
  - NodeJs / ExpressJs
  - MongoDb / Mongoose
  - JsonWebToken

# Steps undertaken to finish the Challenge:
  - The first thing I did is too structure the folder, I created the main SRC folder that will house all the files that will be in the application
  - The package.json will also now be configured to cater the changes of the folder structure since the index is now in another folder
  - As usual, the index will always be the forefront of the structure that will call all the other modules, while the other middlewares have their own folder structure for further scalability and clarity
  - Custom Error classes are also implemented to provide a folder structure that will make the code cleaner 
  - I first created the 2 main enpoints which are /api/auth -> login and register
  - Then the second one which is /api/weather -> city params and coordinates query for longitude and latitude
  - After setting the routers for both of them, their own controllers for their HTTP requests are then created
  - Since one endpoint for weather is protected, a middleware for authorization is created with the help of JWT to validate the tokens that are generated upon successful login of the user

# Index file explanation in simple details
  - The app instance is created using expressJs for HTTP server start
  - Middleware functions like connection to database and custom Error Classes are imported
  - The two (2) main routers are also imported coming from their own sources
  - Middlewares for Cross Resource Origin Sharing and Parsing of JSON files are also used
  - The main routes for auth and weather is implemented, the public one does not have the authentication since that is where the token will be generated
  - Middlewares for notFound and errorHandlers are implemented to ensure that once a failure to access the main enpoints are done, then it will throw the errors that we want to show
  - Lastly, we have the start function, this is a custom function for use to ensure that we connect to the right URI whether we are running it locally or in production


    
