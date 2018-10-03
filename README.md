# VidBits TAT

Sample application for a course of Cypress at the talkingabouttesting.coursify.me school.

## Pre-requirements

- [git](https://git-scm.com/downloads)
- [MongoDb](https://www.mongodb.com/download-center)
- [Node.js](https://nodejs.org/en/) (version 8 or greater)

> To check the Node.js version installed in your compouter, run `node -v`. You should see something like this v8.12.0. If you don't have Node.js installed, use the above link to download and install it.

## Installation

Run `npm i` to install the project and dev dependencies.

## Installing and starting the database

Follow the instructions in [this file](./MONGODB_INSTALLATION.md) to install and start the database.

## Starting the application

Run `npm start` to start the application.

> After that you should be able to access the application in the browser through the following URL: http://localhost:4001.

## Running the tests

There are [Cypress](https://cypress.io) end to end tests available for this application.

### Interactive mode

Run `npx cypress oepn` to run the tests interactive mode.

### Headless mode

Run `npm t` to run the tests in headless mode.

___

Made with 💚 by [Walmyr Filho](http://walmyr-filho.com)