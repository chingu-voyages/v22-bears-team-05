# GoalTrack

A simple web app to help break your goals into manageable steps

Chingu Voyage-22 (bears-team-05) (https://chingu.io/)

## Overview:

GoalTrack is a responsive web app aimed at helping users reach their goals through a method of breaking goals into manageable steps via tasks and action items. 

## Demo:

https://goaltrack.vercel.app/

## Table of Contents  
- [Features](#features)
- [Development](#development)
  - [Technologies](#technologies)
  - [Development Style and Git Branches](#development-style-and-git-branches)
  - [Useage](#usage)
  - [Configuration](#configuration)
- [Development Environment](#development-environment)
- [Runtime](#runtime)
  - [Vercel Deployment](#vercel-deployment)
    - [Vercel Deployment Steps](#vercel-deployment-steps)
  - [Heroku Deployment](#heroku-deployment)
    - [Heroku Deployment Steps](#heroku-deployment-steps)
- [Future Updates](#future-updates)
  - [Known Bugs + Planned Fixes](#known-bugs-+-planned-fixes)
- [Authors](#authors)

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

## Development Environment

Before starting the server in your local dev. environment,the following environment variables should be defined:

| Variable Name               | Description                     |
|:-----------------------------------|:----------------------------|
| MONGO_CONNECTION_STRING | MongoDB Atlas connection string (e.g. `mongodb+srv://MONGO_USER:MONGO_PASSWORD@cluster...`) |
| SESSION_SECRET | Random character string used to encode session cookies |
| REDIS_URL | Set to 127.0.0.1:6379 (default local Redis url) |
| PORT | Server Port (5000 by default for local deploy). In production Heroku will provide its own port. |

This is accomplished by including the following in the .env file located in the root of the `/server` directory. This .env file must never be pushed to GitHub since it contains application sensitive information such as the database username and password.

The /server/.env file must contain the following:

```
MONGO_CONNECTION_STRING="mongodb+srv://..."
SESSION_SECRET="random character string"
REDIS_URL="127.0.0.1:6379"
PORT=5000
```

## Runtime

### Vercel Deployment

#### Vercel Deployment Steps

1. After downloading the repository, navigate to the `/client` directory in your command line and install dependencies:

```
cd local-repo-root-directory/client

npm install
```

2. install the Vercel command-line interface using npm:

```
npm i -g vercel
```

3. Initialize Vercel by running this command and following the prompts from your command line:

```
vercel init
```

4. Deploy. By default the deploy command deploys to a preview URL and requires the `--prod` flag to deploy to production

```
vercel 

-- or --

vercel --prod
```

Your client is now deployed on Vercel!

### Heroku Deployment

Due to having both the server and client in a single Github Repo, the server must be deployed to Heroku using a git command to push a subtree from the root of the repository directory.

#### Heroku Deployment Steps

Before deploying to Heroku, make sure you have created an account with a new project on https://heroku.com

***Disclaimer**: In order to deploy with Heroku with Redis, you must have a verified Heroku account which means adding a credit card to your account.*

1. After downloading the repository, from the command line, go to `/server` directory and install dependencies.

```
cd local-repo-root-directory/server

npm install
```

2. Download the Heroku command line interface.

MacOS

```
brew tap heroku/brew && brew install heroku
```

Ubuntu 16+

```
sudo snap install --classic heroku
```

For Windows, find the download for 64-bit or 32-bit [here](https://devcenter.heroku.com/articles/heroku-cli).

3. Login with Heroku from the command line

```
heroku login
```

4. Check to see if your project already has a redis instance

```
heroku addons | grep heroku-redis
```

5. If you don't have a redis instance, add one now using the free hobby-dev tier. Make sure to replace 'your-app-name' with your project name in Heroku.

This will automatically add the REDIS_URL env variable to your Heroku project settings. 

```
heroku addons:create heroku-redis:hobby-dev -a your-app-name
```

6. the Heroku command line uses git commits to figure out what to push to Heroku. If you have not pushed your project to your own remote branch on Github or if you have previously made changes in the code, make sure you run the following:

```
git add .
git commit -m "my commit message"
```

7. Since we want to push the `/server` directory to Heroku only, we must use a subtree. This is how we do it:

Before we do that, we need to go back one level in the directory since the last place we left off was inside the `/server` directory. 

```
cd ../
```

```
git subtree push --prefix server heroku master
```

Although this method works, if there is ever a time where the commits made to your remote repository do not match the commits made in Heroku, there will be a conflict and the above command will not let you commit. If a problem ever comes up, the below command is the alternative method of pushing to Heroku.

```
git push heroku $(git subtree split --prefix=server $(git symbolic-ref --short -q HEAD)):master --force
```

That's it! You're now deployed on Heroku using the Redis add-on.

## Future Updates

User Data:
- Goals and tasks should delete themselves upon completion

"My Stats" Page:
1. Number of Goals, tasks, and action items completed for the user to see lifetime achievements.
2. Total time spent accomplishing Action Items

### Known Bugs + Planned Fixes

Session Cookies
- Currently the server is unable to set cookies for the client's browser on iOS devices (except in the Google App on iOS) due to recent updates to cookie security requirements on these devices. To fix this, we either need to make a GET request from the client to fetch the cookie to meet `sameSite: lax` security requirements or we need to host both the server and client on the same domain.

## Authors

- Babak Chehraz ([Portfolio](https://www.babakchehraz.com/)) [LinkedIn](https://bit.ly/3kfXjrO) (Email: babak.chehraz@gmail.com)
- Thomas DePasquale (Email: t.depasquale@hotmail.com)
- Animesh KC ([Blog](https://blog.animeshkc.me/))
