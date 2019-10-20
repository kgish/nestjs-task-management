## NestJS Task Management

Task management server API using NestJS, based on the course [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero) at [Udemy](https://www.udemy.com).

## Installation

```bash
$ git clone https://github.com/kgish/nestjs-task-management.git
$ cd nestjs-task-management 
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing the app

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Development

During development start up the postgres container and run test in watch mode:

```
$ docker-compose up -d
$ npm run test:watch
$ npm run start:dev
```

## References

* [NestJS](https://nestjs.com)
* [Udemy](https://www.udemy.com)
* [TypeORM](https://typeorm.io)
* [Postgres Docker](https://hub.docker.com/_/postgres)
* [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero) at [Udemy](https://www.udemy.com)
* [NestJS Course Task Management Github](https://github.com/arielweinberger/nestjs-course-task-management)
