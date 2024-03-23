import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home', displayName : '' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home', displayName : '' });
});

router.get('/events', function(req, res, next) {
  res.render('index', { title: 'Events', page : 'events', displayName : '' });
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


export default router;
