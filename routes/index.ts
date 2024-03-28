import express from 'express';
import fs from 'fs';
const router = express.Router();

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
  res.render('index', { title: 'Gallery', page : 'gallery', displayName : '' });
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

router.get('/event_planning', function(req, res, next) {
  res.render('index', { title: 'Event Planning', page : 'event_planning', displayName : '' });
});

// POST ROUTES

router.post('/addEvent', (req, res) => {

  console.log("Post Event Active...");

  // Extract data from the request
  let title = req.body.title;
  let owner = req.body.username;
  let start = new Date(req.body.eventStart);
  let end = new Date(req.body.eventEnd);
  let description = req.body.eventDescription;

  // Read the existing JSON file
  fs.readFile('./client/data/calendarEvent.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading events.json');
    }

    // Parse the JSON data into a JavaScript object
    let events = JSON.parse(data);

    // Append the new record to the events array
    let newEvent = {
      id: Date.now(),
      owner: owner,
      title: title,
      start: start,
      end: end,
      description: description,
      attendees: []
    };
    events.push(newEvent);

    // Convert the modified JavaScript object back to a JSON string
    let updatedEventsJSON = JSON.stringify(events);

    // Write the updated JSON string back to the file
    fs.writeFile('./client/data/calendarEvent.json', updatedEventsJSON, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing to events.json');
      }
      console.log('New event added successfully');
      res.status(200).send('New event added successfully');
    });
  });
});

// Update events endpoint
router.post('/updateEvents', (req, res) => {
  // Assuming req.body contains the updated events data
  const updatedEvents = req.body;

  // Write the updated events data to the JSON file
  fs.writeFile('./client/data/calendarEvent.json', JSON.stringify(updatedEvents), err => {
    if (err) {
      console.error('Error updating events:', err);
      res.status(500).send('Internal server error');
    } else {
      console.log('Events updated successfully');
      res.status(200).send('Events updated successfully');
    }
  });
});

export default router;
