<div align="center">
  <br/>
  <img
    alt="Grocerrific"
    src="https://user-images.githubusercontent.com/26303683/48803712-fdea8700-ed12-11e8-8826-bf0028541148.png"
    width=500px
  />
  <br/>
</div>

# What is Grocerrific?
[Grocerrific](https://grocerrific.herokuapp.com) is a grocery shopping full stack application.
## Codebase
This project is built using ReactJs library to build the user interface, apllication state management with Redux as the predictable state container, MongoDB is our database of choice powered by Express for both data persistence and serving static content.
### Technologies
* [ReactJS](https://reactjs.org/): React is a declarative, efficient, and flexible JavaScript library for building user interfaces.
It lets you compose complex UIs from small and isolated pieces of code called “components”.
* [Redux](https://redux.js.org/): Redux is a predictable state container for JavaScript apps.
* [Webpack](https://webpack.js.org/): Webpack is a static module bundler for modern JavaScript applications.
* [Express](https://expressjs.com/): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [MongooseJS](https://mongoosejs.com/): Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
* [Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js
* [Nodemon](https://nodemon.io/): Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
* [React-Toastify](https://fkhadra.github.io/react-toastify/): A Javascript library for non-blocking notifications.
* [Jest](https://jestjs.io/): Jest is a complete and ready to set-up JavaScript testing solution.
* [Babel](https://babeljs.io/): Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.
* [React-Router-Dom](): DOM bindings for [React Router](https://reacttraining.com/react-router/): a collection of navigational components that compose declaratively with your application.

## Getting Started
This section provides a quick start guide.
### Prerequisites
* [NodeJs](https://nodejs.org/): NodeJs is a JavaScript run-time environment that uses an event-driven, 
non-blocking I/O model that makes it lightweight and efficient.
* [Yarn](https://yarnpkg.com/): Yarn is a package manager for your code. It allows you to use and share code with 
other developers from around the world. Yarn does this quickly, securely, and reliably so you don’t ever have to worry.
* [MongoDB](https://www.mongodb.com): MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need. MongoDB stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time
### Installation
1. Make sure all prerequisites are installed
2. Ensure that the MongoDB service is running on your machine
3. Clone the repository, i.e `git clone https://github.com/monsieurkayode/grocerrific.git`
4. Cd into the project directory using `cd grocerrific/`
5. Reference the env.sample file to create a `.env` file to setup environment variables
6. `yarn`
### Build
To build and run the application
```bash
  yarn build:dev
  yarn start:dev
  Open http://localhost:5000 in your browser
```
### Starting the application
```bash
  yarn dev
  Open http://localhost:8080 in your browser
```
## License
MIT
