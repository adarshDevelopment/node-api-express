# steps involved in this project

1. install express and configure server
2. install sequelize 
3. run `sequelize init` command to install models, seeders, migrations and config  
4. create routes and controller directories and create coressponding files

## database integration
5. install mysql driver using `npm i mysql2`
6. create modeld and migration using this command
    - sequelize model:generate --name Post --attributes title:string, content:text, imageUrl:string, categoryId:integer, userId:integer
  
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
    - 