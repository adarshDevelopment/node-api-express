# steps involved in this project

1. install express and configure server
2. install sequelize 
3. run `sequelize init` command to install models, seeders, migrations and config  
4. create routes and controller directories and create coressponding files

## database integration
5. install mysql driver using `npm i mysql2`
6. create model using this command
    - sequelize model:generate --name Post --attributes title:string, content:text, imageUrl:string, categoryId:integer, userId:integer