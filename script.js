const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleProfile } = require('./controllers/profile');
const { handleApiCall, handleImage } = require('./controllers/image');


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

// // Allow requests from specific origin
// const corsOptions = {
//     origin: 'https://myfacerecognitionweb.onrender.com',
// };

// // Enable CORS for all routes
// app.use(cors(corsOptions));

//ROOT
app.get('/', (req, res) => { res.send("Success") })

//SIGNIN (post, pw over HTTP body)
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });


//REGISTER (post, add to database)
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

//PROFILE (get user)
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) });


//IMAGE (put, update count on user profile)
app.put('/image', (req, res) => { handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
