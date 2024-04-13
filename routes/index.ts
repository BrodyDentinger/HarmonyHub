/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: MArch 28, 2024
File: index.js
Description: This file holds all the express routing.
*/

import express from 'express';
import fs from 'fs';
import Gallery from "../models/gallery";
import calendarEvent from "../models/calendarEvent";
import {HttpError} from "http-errors";
import CalendarEvent from "../models/calendarEvent";
import user from "../models/user";
const router = express.Router();
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home', displayName : '' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home', displayName : '' });
});

router.get('/ourEvents', function(req, res, next) {
  res.render('index', { title: 'Our Events', page : 'ourEvents', displayName : '' });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact', page : 'contact', displayName : '' });
});

router.get('/gallery', function(req, res, next) {

    Gallery.find().then(function (data :any){
    console.log(data);

    // console.log(contacts);
    res.render('index', { title: 'Gallery', page : "gallery",
      items: [data], displayName : '' });
  }).catch(function (err : HttpError){
    console.error("Error reading gallery from Database " + err);
    res.end();
  })
});

router.get('/portfolio', function(req, res, next) {
  res.render('index', { title: 'Portfolio', page : 'portfolio', displayName : '' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page : 'login', displayName : '' });
});

router.get('/news', function(req, res, next) {
  res.render('index', { title: 'News', page : 'news', displayName : '' });
});

router.get('/privacypolicy', function(req, res, next) {
  res.render('index', { title: 'Privacy Policy', page : 'privacypolicy', displayName : '' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page : 'register', displayName : '' });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', page : 'services', displayName : '' });
});

router.get('/team', function(req, res, next) {
  res.render('index', { title: 'Team', page : 'team', displayName : '' });
});

router.get('/ToS', function(req, res, next) {
  res.render('index', { title: 'Terms of Service', page : 'ToS', displayName : '' });
});

router.get('/feedback_form', function(req, res, next) {
  res.render('index', { title: 'Feedback Form', page : 'feedback_form', displayName : '' });
});

router.get('/stats', function(req, res, next) {
  res.render('index', { title: 'Statistics', page : 'stats', displayName : '' });
});

router.get('/update', function(req, res){
  res.render('index', { title: 'Update', page : 'update_user', displayName : '' });
});

router.get('/event_planning', function(req, res, next) {
  res.render('index', { title: 'Event Planning', page : 'event_planning', displayName : '' });
});

// populate events route for calendar initialization
router.get('/populate_events', function(req, res){
  calendarEvent.find().then(function(data:any){
    res.json(data);
  }).catch(function(err: HttpError){
    console.error("Error reading calendar events from Database." + err);
    res.end();
  });
});

// POST ROUTES

// Route to handle event updates
router.post('/updateEventDB', async (req, res) => {
  try {

    // Strip the ID and the updated data from req body
    const eventId = req.body.eventId; // eventId is passed in the request body
    const newStart = req.body.newStart;
    const newEnd = req.body.newEnd;
    const newTitle = req.body.newTitle;
    const eventsFromDb = req.body.eventsFromDb; // the json string of all events from the db

    // Find the event by MY id property (not mongos), and update it with the new info
    const result = await CalendarEvent.findOneAndUpdate(
        { id: eventId },
        {
          $set: {
            title: newTitle,
            start: newStart,
            end: newEnd
          }
        }
    );

    if (result) {
      console.log('Event updated successfully');
      res.status(200).send('Event updated successfully');
    } else {
      console.log('Event not found');
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Error updating event');
  }
});

// Route to handle adding calendar events
router.post('/addEvent', (req, res) => {

  console.log("Post Event Active...");

  // Extract data from the request
  let title = req.body.title;
  let owner = req.body.username;
  let start = req.body.eventStart;
  let end = req.body.eventEnd;
  let description = req.body.eventDescription;

  // Format that data from the req (form), and create a new calendarEvent model with it
  const eventData = {
    id: Date.now(),
    owner: owner,
    title: title,
    start: start,
    end: end,
    description: description,
    attendees: []
  };

  const newEvent = new CalendarEvent(eventData);

  // Save the new event to the database
  newEvent.save()
      .then(() => {
        console.log('New event added successfully');
        console.log("newEvent log: " + newEvent);
      })
      .catch(error => {
        console.error('Error adding event:', error);
      });
  });

/**
 * Delete an event from the DB
 */
router.post('/deleteEventDB', async (req, res) => {
  try {
    const eventId = req.body.eventId; // eventId is passed in the request body

    // Find the event by the custom ID and delete it
    const deletedEvent = await CalendarEvent.findOneAndDelete({ id: eventId });

    if (deletedEvent) {
      console.log('Event deleted successfully');
      res.status(200).send('Event deleted successfully');
    } else {
      console.log('Event not found');
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Error deleting event');
  }
});

/**
 * Authenticate user route
 */
router.post('/authUserDB', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userFromDB = await user.findOne({ Username: userName });

    const passwordFromDB = (userFromDB as any).Password;

    // compare the plaintext password to the encrpyed password from the db
    const passwordMatch = await bcrypt.compare(password, passwordFromDB);

    // If no match
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // if match
    else{
      // If authentication is successful
      res.status(200).json({ message: 'Authentication successful', user: userFromDB });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Register a user route.
 */
router.post('/registerUserDB', async (req, res) => {

  // fetch data from req body
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const username = req.body.userName;
  const email = req.body.Email;
  const phone = req.body.Phone;
  const password = req.body.Password;

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Turn it into a mongo model
  const UserData = {
    firstName: firstname,
    LastName: lastname,
    Username: username,
    EmailAddress: email,
    PhoneNumber: phone,
    Password: hashedPassword
  };

  const newUserDataModel = new user(UserData);

  // try to insert the newly created record into mongo db
  newUserDataModel.save()
      .then(() => {
        console.log('New user registered successfully.');
        res.status(200).json({ message: 'User registered successfully' });
      })
      .catch(error => {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
      });
});

/**
 * Updating a user in the system's information in the db.
 */
router.post('/updateUserDB', async (req, res) => {

  // fetch data from req body
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const username = req.body.userName;
  const email = req.body.Email;
  const phone = req.body.Phone;
  const password = req.body.Password;
  const idFromSession = req.body.userId;

  console.log("Id from session in route side: " + idFromSession);
  // Check if the password has changed
  let hashedPassword = password; // Initialize with the provided password
  if (password) {
    // Hash the password only if it's provided (not null or undefined)
    hashedPassword = await bcrypt.hash(password, 10); // Use the same salt rounds as before
  }

  // Turn it into a mongo model
  const UserData = {
    firstName: firstname,
    LastName: lastname,
    Username: username,
    EmailAddress: email,
    PhoneNumber: phone,
    Password: hashedPassword
  };

  const newUserDataModel = new user(UserData);
  const id = new ObjectId(idFromSession);

  try{
  // try to insert the newly created record into mongo db
  const result = await user.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstName: firstname,
          LastName: lastname,
          Username: username,
          EmailAddress: email,
          PhoneNumber: phone,
          Password: hashedPassword
        }
      }
  );

  // Successfully update / success code.
  if (result) {
    console.log('User updated successfully');
    res.status(200).send('User updated successfully');
    // Unsuccessful update
  } else {
    console.log('User not found');
    res.status(404).send('User not found.');
  }
// Error accessing db
} catch (error) {
  console.error('Error updating user:', error);
  res.status(500).send('Error updating user');
}

});

export default router;
