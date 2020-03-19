# NC News Backend Project

https://sm-ncnews.herokuapp.com/api/topics

This project is the backend for a news api, allowing access to articles, comments, users and topics.


### Prerequisites

In order to run this project, the following prerequisites are required to be installed globally:

| Dependency | Version |
| ---------- | ------- |
| PostgreSQL | 12.1    |
| Node.JS    | 12.9.1  |
| NPM        | 6.10.3  |

The following developer dependencies will need to be installed:

| Dependency    | Version |
| ------------- | ------- |
| Express       | 4.17.1  |
| Knex          | 0.20.2  |
| Node Postgres | 7.12.1  |
| Chai          | 4.2.0   |
| Chai-Sorted   | 0.2.0   |
| Mocha         | 6.2.2   |
| Supertest     | 4.0.2   |


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

The first things to do is cloning the project. For this click the clone or download button and copy the path.

In your terminal select the path in which you would like to clone the project into. Here is an example of changing directory

```
cd Documents/northcoders
```

To get a list of folder contents you can use ls

```
ls

```

Once in the desired directory, paste in the path you copied from github.

```
git clone https://github.com/PATH
```

When the project has cloned you can open it in, for example, Visual Studio Code. You can for example use the command

```
code .
```

### Installing

This section details the steps to get the development environment up and running. 


Step 1: Clone the repository with the command: 

```
$ git clone https://github.com/stellamartin222/NC_News
```

Step 2: Open the repository in your preferred code editor e.g VSCode, Atom etc

Step 3: Navigate into the cloned repository, install the dependencies using the terminal command:

```
npm i
```

Step 4: Create a local `knexfile.js` file in the main directory and insert the below code:

```const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  development: {
    connection: {
      database: "nc_news"
      // username: only applicable if Linux User,
      // password: only applicable if Linux User 
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      // username: only applicable if Linux User,
      // password: only applicable if Linux User
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

NB: postGreSQL will require a username and password if you are running a linux system. If you are running on Mac OSX, you can remove the username and password keys from both development and test.

Step 5: Run the following terminal commands to set up your local test and development databases:

```
$ npm run setup-dbs
$ npm run seed
```

To see your databases you can run the command:

```
$ psql
\c nc_news_test
```

or 

```
$ psql -f queries.sql > output.txt

```

The above command with create an .txt file, displaying the tables and the data inserted.

## Running the tests

To test the endpoints locally and ensure that everything has been configured correctly use the command:

```
$ npm t
```

### Endpoints

The table below outlines the purpose of each test category, for additional details please review the `app.spec.js` file.



Endpoint                           | Request | Tests                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api                               | GET     | Ensures that a JSON detailing the available endpoints and the requirements within each in served upon receiving a request.                                                                                                                                                                                                                              |
| /api/topics                        | GET     | Ensures that all topics are served. These are served as an array of each topic.                                                                                                                                                                                                                                                                         |
| /api/topics                        | POST    | Ensures that a new topic may be posted. An error is returned if the slug is less than 3 characters in length or a description is not provided.                                                                                                                                                                                                          |
| /api/users                         | GET     | Ensures that all users are served. These are served as an array of users.                                                                                                                                                                                                                                                                               |
| /api/users/:username               | GET     | Ensures that details of the requested user are served. An error is returned if the requested user does not exist.                                                                                                                                                                                                                                       |
| /api/articles                      | GET     | Ensures that all articles are served in an array. Also ensures that the 6 valid queries (sort-by, order, author, topic, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist.                                                                                              |
| /api/articles/:article_id          | GET     | Ensures that the correct article is displayed. An error is returned if the requested article ID does not exist or a non-integer is entered.                                                                                                                                                                                                             |
| /api/articles/:article_id/comments | GET     | Ensures that all comments from the specified article are served. An error is returned if the requested article ID does not exist or a non-integer is entered. Also ensures that the 4 valid queries (sort-by, order, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist. |
| /api/articles/:article_id/comments | POST    | Ensures that a new comment is posted to the specified article, serving the complete new comment. Ensures an error is returned if an invalid or non-existent article ID is entered. Also ensures that an error is returned if insufficient data is received in the body of the request                                                                   |
| /api/comments/:comment_id          | PATCH   | Ensures that the requested changes are made to the comment's vote property, serving the updated comment. Ensures that if additional keys are provided, they are ignored and that an error is returned if a non-integer is entered as the value of inc_votes.                                                                                            |
| /api/comments/:comment_id          | DELETE  | Ensures the specified comment is deleted and that an error is returned if the specified comment does not exist or a non-integer is entered                                                                                                                                                                                                              |
