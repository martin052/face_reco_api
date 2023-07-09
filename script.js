const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const axios = require('axios');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// const db = require('knex')({
//     client: 'pg',
//     connection: {
//         host: 'dpg-cikroc15rnuvtgrauuvg-a',
//         port: 5432,
//         user: 'postgresdata_rsx6_user',
//         password: 'INpgwGHOnFydwhv9pPeMUP066ydpok6D',
//         database: 'postgres://postgresdata_rsx6_user:INpgwGHOnFydwhv9pPeMUP066ydpok6D@dpg-cikroc15rnuvtgrauuvg-a/postgresdata_rsx6'
//     }
// });

const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});


app.get('/', (req, res) => {
    res.send('Success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, axios) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
