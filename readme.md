# steps involved in this project

1. install express and configure server
2. install sequelize 
3. run `sequelize init` command to install models, seeders, migrations and config  
4. create routes and controller directories and create coressponding files

## database integration
5. install mysql driver using `npm i mysql2`
6. create modeld and migration using this command
    - sequelize model:generate --name Post --attributes title:string, content:text, imageUrl:string, categoryId:integer, userId:integer
    - npx sequelize-cli migration:generate --name create-comments -> create without adding fields
7. Migrate tables:
    - first configure the config file and write your database name
    - run `sequelize db:migrate` command to migrate 

## Inserting data to Database Tables

8. steps to insert data into database
   - to insert data into the database, you must first import db object from the index.js file from the model directory into the controller file. since the db object contains key value pair of model name and the actual model classes, you can use their static methods from the controller.


## Validation

9. install a package called fastest-validator using `npm i fastest-validator`. 
    - import the Validator class from the package in the controller 
    - create a scheme, an object of key value pair of attributes and their properties
    - create new instance of Validtaor class and use the validate method to validate.
    - the validate method takes the object and the schema as arguments.
    - if correct, it returns true, else returns an object of errors.
  
## Password hashing 

10. install bcrypt package and hash your password
    - install bcrypt `npm i bcrypt`
    - use bycrypt.hash function to hash the password.
    - the first argument takes the plaintext password and the second one takes the salt value. its returns a promise so await keyword should be used.

## JWT package
11. To use jwt you do the following things
    - you import jwt package from jsonwebtoken and and sign it with user credentials and a secret key
    - the jwt.sign method takes two objects as function arguments, the first user credentials and the second the secret key
  
12. JWT auth verify
    - you use the verify method from the jsonwebtoken pacakge to verify the token to make sure that the token has not been tampered with and was created using the same Secret key the one passed in as the second argument.
    - the first argument of the function takes the token itself and the other one takes the secret key
    - if found invalid, it throws as exception 
    - you create a middleware to authenticate the user and call the next() callback function if everything works as expected
    - 

## Multer image upload
12. Node js uses middleware to upload images unlike Laravel. 
    - We first need to return an instance of the multer class by multer({storage: storage, fileFilter: fileFilter})
    - storage takes two objects, destination and fileName, both of which take function (req, file, cb). the first argument of cb function is error so you can pass null if there are no errors. the second arguents are destination and filename respectively
    - its the same for fileFilter. you can filter the file by file.mimetype === 'image/jpeg'. 
    - check multerImage.middleware file for more.
    - and then you call the factory middleware of the same instance and call the single function to upload a single image. It takes the field name as its only argument.
    - for file check and exception handle, you use the multer.single('file') manually and define the thrid parameter 'next' callback function yourself and check for exceptions. the function is asynchronous so you first wait for it to finish and then execute the lines of code below.
  

## Database seeding 
13. Database seeding
    - to crate seeder, type this command:
      - sequelize seed:generate --name category-seeder
    - to run the seed file:
      - sequelize db:seed:all -> run all seeders
      - sequelize db:seed --seed 20250426092310-categorySeeder.js
    - to undo a seed
      - sequelize db:seed:undo -> undos the most recent seed


## Associations
