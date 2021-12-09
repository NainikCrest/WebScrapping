# NodeJs BoilerPlate Code

<mark>This Repo consists of the base setup for Web Scrapping using Pupperteer.</mark>

- Myths :
  - Node.js is a framework.
  - Relies on Chrome V8 engine only.
  - It does not support multi-threads.
  - Beginner developers can’t work with Node.
- Facts :
  - Node.js is basically a server capable of executing JavaScript.
  - It is an open source and cross-platform system for building web applications.
  - It does, providing asynchronous and event-driven APIs.
  - Any programmer familiar with JavaScript can learn Node quickly.

<hr/>

###### Built and maintained by Nainik Mehta [Find Me!](#find-me).

## Let's Dig Into The Code And Explore!

1. [NodeJs Setup](#1-nodejs-setup)
2. [Setup The Project](#2-setup-the-project)
3. [Folder Structure](#3-folder-structure)
4. [Generic Routes Setup For CRUD](#4-generic-routes-setup-for-crud)
5. [MiddleWare And Helper Functions](#5-middlewares-and-helper-functions)
6. [Performance Practices And Future Work (Work In Progress️ ✍️)](#6-performance-practices-and-future-work)

<br/><br/>

# `1. NodeJs Setup`

I have setup this boilerplate code using Node Version: `16.13.0` (includes npm `8.1.0`)<br/>

### [📝] Have NodeJs in your System

You can have the Node LTS and configure it from [Nodejs.org](https://nodejs.org/en/download/)<br/>
🔗 [**Read More: Getting Started With NodeJS**](https://medium.com/@erickcodes/getting-started-with-node-js-84972881508b)

## `2. Setup The Project`

- You can clone this repo from command line using `git clone ${repo_url}`.

  - `git clone https://github.com/NainikCrest/Node_Boilerplate_Sequelize.git`

- Run `npm install | yarn`
- Create an `.env` file and add your configuration as per your need similar to reference file `.env.example`
- ## Seeding the data.
  - `sequelize db:seed:all` -> To get initial country listing
  - Dummy Email & Password registered :
    - Email: `whiteshark@crest.com` | Password: `111111`
- Run `npm start` -> to start the server.

## `3. Folder Structure`

<h1 align="center">
  <img src="src/public/assets/images/folderstructure.png" alt="Folder Structure"/>
</h1>

- `Postman Collection`
  - `sample_collection.json` -> This is where you can attach your postman collection with API details and examples.
  - `sample_environment.json` -> This is where your postman environment variables will come.
- `src` -> Folder where your whole server configuration and other things will come.
  - `server.js` -> This is the main file which start's your server (App Entry Point). Server configuration.
  - `public` -> All public files that we want to access throughout the application comes here.
  - `config`
    - `app.js` -> Express app configuration with all middlewares and routes included.
    - `config.js` -> Sequelize config file.
    - `envVars.js` -> This is where all your environment variables will be reference first which can be used throughout the app.
    - `logger.js` -> Making logs of various things in an attractive manner according to logs level using winston.
    - `password.js` -> Passport authentication handler to authorize the USER before accessing the API's.
  - `api` -> Core of the APP
    - `models` -> All our models used for app are placed here which are register in Sequelize dynamically from `index.js` file.
    - `routes` -> All our API routes are placed here which are exported dynamically from `index.js` file as reference to `fileName`.
    - `controller` -> All our logics will be executed here.
      - `base.js` -> A generic controller will can be used for simple CRUD operation for each routes.
    - `seeders` -> All our seeders to inject data will come here.
    - `validations` -> All our routes validation's are defined here using Joi.
  - `middleware`
    - `auth` -> Middleware to authorise wether the user is allowed to access the route.
    - `permission` -> Middleware to check wether user has permission to trigger particular action.(\*Used Optional)
  - `helpers`
    - `apiError.js` -> General Error Response Handler for throwing error to every action.
    - `constants` -> General Messages and all other constants that are used in the app.
    - `errorHandler.js` -> Contains error Response to be passed in API and Validation Error Handler for Joi.
    - `utils.js` -> All our reusable common functions outside bussiness logics will be placed here.
- `.env` -> All our environment variables.
- `.env.example` -> Reference file for `.env`.
- `.gitognore` -> Files & Folder to be excluded from the git.
- `package.json` -> Node initialization with all our packages that are used.
- `README.md` -> A general overview of the project.

## Find Me!

Wanna Reach Me Out 📌?<br/>
Reach Me Out At :
[Nainik Mehta](https://github.com/NainikCrest)
<a href="https://www.linkedin.com/in/nainik-mehta-25nk12"><img src="src/public/assets/images/linkedin.svg" width="16" height="16"></img></a>
<a href="https://twitter.com/Nainik25"><img src="src/public/assets/images/twitter.svg" width="16" height="16"></img></a>

<!-- <a href="https://whitelioninfosystems.com/employee/606d5c041c705034c8f53878"><img src="src/public/assets/images/portfolio.png" width="16" height="16"></img></a> -->
<br/>
<br/>
Full Stack Developer | Driving Initiatives In Executing Ideas To Reality And Surplus Them |<br/>
Let's Connect To Explore 👇<br />
<a href="https://www.linkedin.com/in/nainik-mehta-25nk12"><img src="src/public/assets/images/linkedin.svg" width="16" height="16"></img></a>
<a href="https://twitter.com/Nainik25"><img src="src/public/assets/images/twitter.svg" width="16" height="16"></img></a>
<!-- <a href="https://whitelioninfosystems.com/employee/606d5c041c705034c8f53878"><img src="src/public/assets/images/portfolio.png" width="16" height="16"></img></a> -->
