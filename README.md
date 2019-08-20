# TS Express Starter

[![license](https://img.shields.io/github/license/dugajean/tsexpress-starter.svg)](LICENSE)

Express with TypeScript and more.

## Install

###### Git Clone Starter Project

```sh
git clone https://github.com/dugajean/tsexpress-starter
```

###### Manage with TS Express Starter CLI

```sh
yarn global add @tsexpress-starter/cli

tsexpress-starter --version
```

## Usage

Start off with a `server.js` in _src/_ with the following contents:

```javascript
import express from 'express';
import Application from '@tsexpress-starter/application';

new Application(__dirname, express()).start();
```

A new folder within the _src/app_ folder represents a module/domain. So to create your endpoints, simply use the CLI and run `tsexpress-starter make:domain <my domain>`, which then sets up a new folder within _src/app_ for you.

Any method within the `controller.ts` file can be decorated with one of the HTTP verbs that suits your needs: `Get`, `Post`, `Put`, `Patch` and Delete. Each of these decorators accepts a path as a first argument and a list of middlewares after the first argument.

Example controller:

```javascript
// src/app/sample/controller.ts

import { Get, Post } from '@tsexpress-starter/routes';
import fooMiddlewareFunc from '../../middleware/fooMiddlewareFunc';
import barMiddlewareFunc from '../../middleware/barMiddlewareFunc';
import bazMiddlewareFunc from '../../middleware/bazMiddlewareFunc';

export class Controller {
  @Get('/') // GET http://localhost:3000/sample
  home(req, res) {
    res.send('This is the home page.');
  }

  @Get('/posts', fooMiddlewareFunc, barMiddlewareFunc) // GET http://localhost:3000/sample/posts
  postsIndex(req, res) {
    res.send('This is where we list all posts.');
  }

  @Post('/posts', bazMiddlewareFunc) // POST http://localhost:3000/sample/posts
  createPost(req, res) {
    res.send('This is where we create a new post.');
  }
}
```

You're free to do anything you would do in a normal Express app. These features are all optional and can simply be ignored. Just use Express with Typescript.

## Integration with TypeORM

If you want to connect to a database with this "framework", I would suggest using TypeORM. There's also a helper package that makes the integration with TypeORM quite easy.

Find out more about it here: https://www.npmjs.com/package/@tsexpress-starter/typeorm

## Tests

Write your own tests and run them with:

```javascript
$ yarn test
```

## License

TSExpress Starter is released under the [the MIT License](LICENSE).
