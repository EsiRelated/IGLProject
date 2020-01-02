# IGLProject

To run the application in a server locally :

  - You should have node.js, mongodb, and all the npm dependencies mentioned in packege.json file.

  - Change the url in "config/database.js" from "mongodb://mongo/scolar" to "mongodb://127.0.0.1:27017/scolar".

  - Run the command "npm start" in the rout folder after starting a mongod service

 

To run the application using Docker and docker-compose:

  - Run the command "docker-compose up" in the rout folder

  - That's it. (Docker will install all the images and the dependencies needed and set everything up for you)
