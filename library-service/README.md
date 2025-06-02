# Project
Design a NodeJS backend in Typescript. The project is to progress on the language and in compliance with [[SOLID PRINCIPLES]].
It will be built in N-Tier architecture.

## Tools used:
- expressJS: server application design
- sequelize-typescript: ORM for relational database. There will be no database backup, it will be directly in memory. The dialect used is sqlite
- class-validator: to simplify validation of class attribute types
- eslint: to linter code with the addition of eslint-config-airbnb-typescript base configuration
- jest: for unit testing
- nodemon: automatic restart of development server in the event of code modification
- typescript: for the language itself
- ts-node: for language interpretation by NodeJS
Not forgetting all the extra modules for typing and proper operation.

# Achitecture
## files:

- **config**: All configuration files
- **controllers**: classes that link HTTP requests to business services
- **errors**: error handling files with a middleware function for centralized management in app
- **interfaces**: interface contracts
- **middleware**: enabling the integration of additional functionalities such as security checks, traceability, notifications, etc. They allow us to customize the system.
- **models**: are simple representations of the tables in the database.
- **schemas**: same principle as models, but with added “intelligence”. In essence, they provide the connection between the models and the ORM.
- **services**: are the business logic. They provide the link between controllers and schemas. We can also have purely computational logic services.
- **routes**: are all the routes for each controller.
- **tools**: where you can get all the tools from scratch.
- **types**: Allows you to add global types, to enrich existing types in the application.

In this example, we've taken a partial approach. There is no **repository**. Its function is to act as a link between the services and the **ORM** to be used. This layer can be used as an abstraction if several **ORM** are used in the application, which is not the case here.

## Application

This is a layered architecture. This is what is most often found in an *ExpressJS* application.
Routes retrieve requests and pass them on to the next level, the Controller. Before sending to the controller, they can also perform simple checks on the HTTP request. For security reasons, for example, they can check that the token is valid.
The Controller manages incoming requests, applies simple business rules and delegates complex tasks to Services.
The Service contains the business logic, such as data processing rules or calculations. Once this is done, the data is given to the Schema, which is a representation of the tables with associated logic, thanks to the ORM.
The Schema/ORM is used as an abstraction to communicate securely with a database.

## TEST API

Each command returns a token, which can be integrated into the header of an HTTP request for testing purposes.
```
curl -X POST http://localhost:3000/connexion/login -H 'Content-Type: application/json' -d '{"email":"admin@admin.com", "password": "admin"}'
curl -X POST http://localhost:3000/connexion/login -H 'Content-Type: application/json' -d '{"email":"reader@reader.com", "password": "reader"}'
```

For exemple
```
curl -X GET http://localhost:3000/api/genres -H 'Content-Type: application/json' -H 'Authorization: Bearer put-the-token-in-this-place'
curl -X POST http://localhost:3000/api/genres -H 'Content-Type: application/json' -H 'Authorization: Bearer put-the-token-in-this-place' -d '{"name": "Fantasy", "description": "description for genre Fantasy"}'
```
