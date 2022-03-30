# Spacious App

![MIT License][license-shield]

## Table of Contents

- [Spacious App](#spacious-app)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Installation](#installation)
  - [Tests](#tests)
  - [Usage](#usage)

---

## About

Spacious is an app (back-end and front-end) that manages planets and characters entities.

## Installation

You'll need an unzip application and [docker][dc]

1. Extract the downloaded file:

```bash
$ unzip spacious.zip && cd spacious
```

2. Build Docker containers locally:

```bash
$ docker-compose up -d --build
```

3. Run migrations & seed:

```bash
$ docker-compose exec server knex migrate:latest --env development
$ docker-compose exec server knex seed:run --env development
```

## Tests

After you've spun up the container:

```bash
$ docker-compose exec server npm run test
```

## Usage

After you've spun up the container:

```bash
$ docker-compose up -d
```

Access the server with [`http:localhost:3000/graphql`][server] 

Access the Database Administrator with [`http://localhost:5050`][admin]

Log into the Admin with:
- Email: `admin@admin.com` 
- Password: `root`

Add a server with:
- Name: `spacious-app`
- Host: `postgres`
- User: `root`
- Password: `1234567890`

Access the Main Application with [`http://localhost:4000`][app]

[dc]: https://docs.docker.com/compose/
[app]: http://localhost:4000
[server]: http://localhost:3000/graphql
[admin]: http://localhost:5050
[license-shield]: https://img.shields.io/github/license/sophiabrandt/tdd-node-shows.svg?style=flat-square
