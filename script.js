const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

// Allow requests from specific origin
const corsOptions = {
    origin: 'https://mybackend-3m9h.onrender.com',
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Success');
});

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
