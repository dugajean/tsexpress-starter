import 'reflect-metadata';
import express from 'express';
import Application from '@tsexpress-starter/application';

const app = new Application(__dirname, express());

// app.beforeRoutes() => console.log('Do something before routes are registered');
// app.afterRoutes() => console.log('Do something after routes are registered');

app.start();
