# tsexpress-starter

[![build status](https://img.shields.io/travis/com/dugajean/tsexpress-starter.svg)](https://travis-ci.com/dugajean/tsexpress-starter)
[![license](https://img.shields.io/github/license/dugajean/tsexpress-starter.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/tsexpress-starter.svg)](https://npm.im/tsexpress-starter)

Express with TypeScript and more.

## Install

###### Git Clone

```sh
git clone https://github.com/dugajean/tsexpress-starter
```

## Usage

Start off with a `server.js` in _src/_ with the following contents:

```javascript
import express from 'express';
import Application from './core/application';

new Application(express()).start();
```

A new folder within the _src/app_ folder represents a module. So to create your routes, you simply create that folder and place a `controller.js` file in it; this file will hold your routes.

Any method within this controller can be decorated with one of the HTTP verbs that suits your needs: `Get`, `Post`, `Put`, `Patch` and Delete. Each of these decorators accepts a path as a first argument and an indefinite list of middlewares after the first argument.

Example controller:

```javascript
// src/app/sample

import { Get, Post } from '../../core/http-decorators/verbs';
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

## Tests

```javascript
$ yarn test
```

## License

TSExpress Starter is released under the [the MIT License](LICENSE).
