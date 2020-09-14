# GoalTrack

A simple web app to help break your goals into manageable steps

Chingu Voyage-22 (bears-team-05) (https://chingu.io/)

## Overview:

GoalTrack is a web app which helps users reach their goals through a method of reducing the complexity of goals via tasks and action items.

## Demo:

https://goaltrack.vercel.app/

## Features

- Account Login/ Register via email+password authentication

Once authenticated, users are able to...

- Add Goals
- Add Tasks to Goals
- Add Action Items to Tasks
- Remove, edit, complete, and rename Goals, Tasks, and Action Items
- Start, Pause, and Complete a timer for a given Action Item.
- View total time spent on Goals, Tasks, or a single Action Item
- Add tags to Goals, Tasks, and Action Items
- Set customizable rewards which are given after completing Goals, Tasks, or Action Items
- View personal account stats based on tags after completing items that contain tags, in a bar graph format

## Development

### Technologies

The primary libraries and dependencies used in the development of GoalTrack are shown below. For a complete list of dependencies, consult the package.json files inside `client` and `server` folders.

| Library                             | Purpose                 | Client or Server? |
|:------------------------------------|:------------------------|:------------------------|
| [React](https://reactjs.org/) | A JavaScript library for building UIs | Client
| [NextJS](https://nextjs.org)        | Frontend Framework      | Client |
| [Apollo Client](https://www.apollographql.com/docs/react/) | State management library for JavaScript that enables you to manage both local and remote data with GraphQL   | Client |
| [Airbnb](https://airbnb.io/javascript/react/)       | React/JavaScript dev. Style Guide    | Client |
| [Styled Components](https://styled-components.com/) | Allows for CSS-in-JS for a nicer development experience | Client |
| [React Icons](https://react-icons.github.io/)       |  Icons Library for React     | Client |
| [Husky](https://github.com/typicode/husky) | Allows for pre-commit code linting and automatic run of local tests | Client |
| [d3](https://d3js.org/)       | A JavaScript library for data visualization | Client |
| [GraphQL](https://graphql.org/)       | API Query Language | Both |
| [Jest](https://jestjs.io/) | Test Runner | Both |
| [Apollo Server](https://www.apollographql.com/docs/apollo-server/)       | GraphQL Server      | Server |
| [MongoDB with Mongoose](https://mongoosejs.com/) | Schema-Based MongoDB Application Data Modeling | Server |
| [Express](https://expressjs.com/)       | Backend Server Framework | Server |
| [Redis](https://redis.io/)       | In memory data structure for session cookies storage | Server |

### Development Style and Git Branches

We developed the project using a source-control branching model called [Trunk Based Development](https://trunkbaseddevelopment.com/) which is used at tech companies like Google and Facebook. The model involves developers collobrating on a single branch known as the trunk, or more commonly known as the Master branch on Github.

In addition, we would create short-lived Git branches, unique to each developer, where we would push small commits and conduct code reviews using pull requests.

### Usage

| (1) Commands (`/client`)           | Purpose                           |
|:-----------------------------------|:----------------------------------|
| `npm run start`                    | Run Frontend Production Server    |
| `npm run dev`                      | Run Frontend Dev. Server locally  |
| `npm run build`                    | Build Frontend for Production     |
| `npm run cy:open`                  | Run Cypress Tests                 |
| `npm run dev`                      | Run Frontend Locally              |


| (2) Commands (`/server`)         | Purpose                            |
|:---------------------------------|:-----------------------------------|
| `npm start`                      | Run Backend Server                 |
| `npm run devStart`               | Run Backend locally using Nodemon  |
| `npm run test`                   | Run Backend Tests                  |

### Configuration

| Location                           | Purpose                     |
|:-----------------------------------|:----------------------------|
| `/client`                          | Frontend source directory   |
| `../components`                    | App Components (React)      |
| `../pages`                         | Nextjs Pages directory      |
| `../public`                        | Static Assets               |
| `../theme`                         | Global Styles directory     |
| `../utils`                         | Frontend Helper Methods     |
| `../../graphql`                    | GraphQL Server Queries, Mutations, Variables used in Apollo Client  |
| `/server`                          | Backend source directory   |
| `../graphql`                       | GraphQL Resolvers, Type Definitions, and Schema   |
| `../../utils`                      | GraphQL Helper Methods   |
| `../../resolvers`                  | GraphQL Resolvers   |
| `../models`                        | MongoDB/Mongoose Data Models and Schemas   |
| `../tests`                         | Backend Tests   |
| `../utils`                         | Backend Helper Methods   |

## Runtime

- TODO: graphic of architecture as seen in sample README on trello

### Vercel Deployment

- TODO: something about having to be in client directory in order to deploy project to vercel from command line

To deploy the client to Vercel, we use the Vercel command line from the `/client` directory. Normally we would import the Github repo straight into Vercel's dashboard, but being part of the Chingu Organization means we cannot since only the organization's owner can do this.

#### Deployment Steps

### Heroku Deployment

- TODO: Something along the lines of... Since server and client are in the same repo, need a subtree command. Similar to what is said under Heroku Deployment in the ideanebulae sample readme

Due to having both the server and client in a single Github Repo, 

#### Deployment Steps

## Future Updates

"My Stats" Page
1. Number of Goals, tasks, and action items completed for the user to see lifetime achievements.
2. Total time spent accomplishing Action Items

### Known Bugs + Planned Fixes

Session Cookies
- Currently the server is unable to set cookies for the client's browser on iOS devices due to recent updates to cookie security requirements on these devices. To fix this, we either need to make a GET request to fetch the cookie to meet `sameSite: lax` requirements or we need to host both the server and client on the same domain. Due to time constraints we are unable to fix this upon  submission to Chingu.

## Authors

## License