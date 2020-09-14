# GoalTrack

A simple web app to help break your goals into manageable steps

Chingu Voyage-22 (bears-team-05) (https://chingu.io/)

## Overview:

GoalTrack is a web app created in NextJS which helps users reach their goals through a method of reducing the complexity of goals via tasks and action items.

## Features

- Account Login/ Register via email+password authentication

Authenticated Users are able to...

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

Frontend
d3

### Development Style and Git Branches

- TODO: something about trunk based development and mention code reviews on our own branches using PRs

### Usage

| Command                            | Purpose                 |
|:-----------------------------------|:------------------------|
| `npm run dev`                      | Run Frontend Locally   |



### Configuration

| Location                           | Purpose                     |
|:-----------------------------------|:----------------------------|
| `/client`                          | Frontend source directory   |



## Runtime

- TODO: graphic of architecture as seen in sample README on trello

### Vercel Deployment

- TODO: something about having to be in client directory in order to deploy project to vercel from command line

#### Deployment Steps

### Heroky Deployment

- TODO: Something along the lines of... Since server and client are in the same repo, need a subtree command. Similar to what is said under Heroku Deployment in the ideanebulae sample readme

#### Deployment Steps

## Authors

## License