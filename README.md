# task-master

> A MERN stack to-do list app with separate list for each user.
> Features OAuth login with Google, Facebook, GitHub and Twitter as well as local authentication.
> Live demo [_here_](https://task-masterr.github.io).

## Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Features](#features)
-   [Setup](#setup)
-   [Contact](#contact)

## General info

A to do list app built using MERN stack and has a separate list for each user.
It features OAuth login with Google, Facebook, Github and Twitter as well as local authentication.

## Technologies

-   MongoDB 6.0
-   Express 4.18.2
-   React 18.2.0
-   Node.js 18.2.1
-   Vite 3.2.3

## Features
-   The website consists of Three pages, i.e Home, Login and Register page.
-   If the user is not logged in then the user is redirected to the login page by default.
-   The user can login by entering their username and password or by logging in to their social accounts (i.e. Google, Facebook, GitHub and Twitter).
-   The user can create new tasks, edit tasks and delete tasks.

## Setup

To run this project:

-   Make sure you have [NodeJs](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/) installed in your system.
-   Then, Install it locally using yarn:
-   Open Two Terminals:
-   In the first terminal:
```
$ cd backend
$ yarn
$ yarn start   # or 'yarn dev' if you have nodemon.
```
-   In the second terminal:
```
$ cd frontend
$ yarn
$ yarn dev
```
-   You need to create a .env file and add the following keys:
    - ADMIN_KEY (any random string)
    - SESSION_KEY (any random string)
    - GOOGLE_CLIENT_ID (generate from google for OAuth)
    - GOOGLE_CLIENT_SECRET (generate from google for OAuth)
    - FACEBOOK_APP_ID (generate from facebook for OAuth)
    - FACEBOOK_APP_SECRET (generate from facebook for OAuth)
    - TWITTER_CONSUMER_KEY (generate from twitter for OAuth)
    - TWITTER_CONSUMER_SECRET (generate from twitter for OAuth)
    - GITHUB_CLIENT_ID (generate from github for OAuth)
    - GITHUB_CLIENT_SECRET (generate from github for OAuth)
    - DB_USER_NAME (mongodb atlas username)
    - DB_PASSWORD (mongodb atlas password)
    - DB_CLUSTER (mongodb atlas cluster)
- After adding the environment variables set the proper SERVER_URL and CLIENT_URL in "backend/src/config/url.config.json" and "frontend/src/config/config.json"


## Contact

Created by [@akiif](https://akiif.dev/) - feel free to contact me!