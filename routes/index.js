"use strict";
/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: MArch 28, 2024
File: index.js
Description: This file holds all the express routing.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const gallery_1 = __importDefault(require("../models/gallery"));
const calendarEvent_1 = __importDefault(require("../models/calendarEvent"));
const calendarEvent_2 = __importDefault(require("../models/calendarEvent"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/ourEvents', function (req, res, next) {
    res.render('index', { title: 'Our Events', page: 'ourEvents', displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact', page: 'contact', displayName: '' });
});
router.get('/gallery', function (req, res, next) {
    gallery_1.default.find().then(function (data) {
        console.log(data);
        // console.log(contacts);
        res.render('index', { title: 'Gallery', page: "gallery",
            items: [data], displayName: '' });
    }).catch(function (err) {
        console.error("Error reading gallery from Database " + err);
        res.end();
    });
});
router.get('/portfolio', function (req, res, next) {
    res.render('index', { title: 'Portfolio', page: 'portfolio', displayName: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.get('/news', function (req, res, next) {
    res.render('index', { title: 'News', page: 'news', displayName: '' });
});
router.get('/privacypolicy', function (req, res, next) {
    res.render('index', { title: 'Privacy Policy', page: 'privacypolicy', displayName: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: '' });
});
router.get('/team', function (req, res, next) {
    res.render('index', { title: 'Team', page: 'team', displayName: '' });
});
router.get('/ToS', function (req, res, next) {
    res.render('index', { title: 'Terms of Service', page: 'ToS', displayName: '' });
});
router.get('/feedback_form', function (req, res, next) {
    res.render('index', { title: 'Feedback Form', page: 'feedback_form', displayName: '' });
});
router.get('/stats', function (req, res, next) {
    res.render('index', { title: 'Statistics', page: 'stats', displayName: '' });
});
router.get('/event_planning', function (req, res, next) {
    res.render('index', { title: 'Event Planning', page: 'event_planning', displayName: '' });
});
// Trying populate events route for calendar initialization
router.get('/populate_events', function (req, res) {
    calendarEvent_1.default.find().then(function (data) {
        res.json(data);
    }).catch(function (err) {
        console.error("Error reading calendar events from Database." + err);
        res.end();
    });
});
// POST ROUTES
router.post('/addEvent', (req, res) => {
    console.log("Post Event Active...");
    // Extract data from the request
    let title = req.body.title;
    let owner = req.body.username;
    let start = req.body.eventStart;
    let end = req.body.eventEnd;
    let description = req.body.eventDescription;
    // Read the existing JSON file
    // Parse the JSON data into a JavaScript object
    //let events = JSON.parse(data);
    // Append the new record to the events array
    const eventData = {
        id: Date.now(),
        owner: owner,
        title: title,
        start: start,
        end: end,
        description: description,
        attendees: []
    };
    const newEvent = new calendarEvent_2.default(eventData);
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
// Update events endpoint
router.post('/updateEvents', (req, res) => {
    // Assuming req.body contains the updated events data
    const updatedEvents = req.body;
    // Write the updated events data to the JSON file
    fs_1.default.writeFile('./client/data/calendarEvent.json', JSON.stringify(updatedEvents), err => {
        if (err) {
            console.error('Error updating events:', err);
            res.status(500).send('Internal server error');
        }
        else {
            console.log('Events updated successfully');
            res.status(200).send('Events updated successfully');
        }
    });
});
exports.default = router;
