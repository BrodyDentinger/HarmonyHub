/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: January 26, 2024
File: app.js
Description: Express configurations.
*/

import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose";

import indexRouter from '../routes';

const app = express();

import * as DBConfig from './db'; // DBconfig is an alias
mongoose.connect(DBConfig.URI);
const db = mongoose.connection;

db.on('error', function(){
    console.error("Connection Error: failed to connect to database.");
});

db.on('open', function(){
    console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// STATIC CONFIGURATION
app.use(express.static(path.join(__dirname, "../client")));      // serve static files from 'client' directory
app.use(express.static(path.join(__dirname, "../node_modules"))); // serve static files from 'node_modules' directory

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err : createError.HttpError, req : express.Request,
                 res : express.Response, next : NextFunction) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;