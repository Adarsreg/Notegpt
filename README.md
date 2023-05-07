Full Stack Notes APP

Notegpt is a simple note-taking application that leverages the cutting-edge power of OPENAI's text-davinci-003 model to automatically generate content for notes provided by the user. Built using MERN STACK, Notegpt provides a seamless and intuitive user experience, allowing users to effortlessly create and store notes, with the option to generate content using OPENAI's state-of-the-art language processing technology. The application is fully scalable and designed to handle a high volume of users, while maintaining fast response times and robust security.
It is built with Vite, React, and Node.js. It allows users to create, read, and delete notes. 

Requirements
To run this application, you need to have Node.js and npm installed on your computer.

Installation
1.Clone the repository
    git clone https://github.com/Adarsreg/Notegpt.git
2.Install dependencies for both the frontend and the backend
    cd Notegpt/frontend
    npm install

    cd ../backend
    npm install


Usage
1.Start the backend server

    cd Notegpt/backend/server
    nodemon server
    
This will start the server on http://localhost:5000.

2.Start the frontend application

    cd Notegpt/frontend
    npm run dev
This will start the frontend application on http://localhost:5000.

Deployment
The frontend application can be easily deployed to Vercel, a cloud platform for static sites and serverless functions. Simply create an account, connect your GitHub repository, and deploy.

To deploy the backend, you can use a platform like Heroku. You can follow these instructions to deploy a Node.js application to Heroku.

Make sure to set the environment variables OPENAI_API_KEY and MONGO_URI to their respective values on your production environment.

NOTE:
You need to have a mongodb_url from mongodb's site: https://www.mongodb.com/
Also you need open ai's api key from their website: https://platform.openai.com/account/api-keys

Create an account and paste your mongo_db_url in .env file
Paste your open ai api key in chatgpt.tsx file

Credits
Vite
React
Node.js
Express
MongoDB
License
This project is licensed under the MIT License.

SCREENSHOT:

![Screenshot (25)](https://user-images.githubusercontent.com/97781350/236697926-4a79c6cf-7b93-4345-a7ca-a727b8c9ed38.png)
![Screenshot (26)](https://user-images.githubusercontent.com/97781350/236697913-d3e446cf-658f-4928-bbc8-d4514c951a63.png)





