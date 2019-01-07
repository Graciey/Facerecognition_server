const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const knex  = require('knex');
const register = require('./controllers/register');
const SignIn = require('./controllers/signin');
const Profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageApi = require('./controllers/image');

const db =  knex({
    client: 'pg',
    connection: {
      host : ' postgresql-parallel-12575',
      user : 'postgres',
      password : '',
      database : 'smart_brain'
    }
  });
  db.select('*').from('users').then(data => {
      console.log(data)
  });
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());

const database = {
    users: [
        {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '1234',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
    }
]
};

app.get('/', (req,res)=> {
    res.send(database.users)
});

app.post('/signin', (req,res) => {SignIn.handleSignIn(req,res,db, bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db, bcrypt)} )
app.post('/profile/:id', (req,res) => {Profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {imageApi.handleApi(req,res)})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port 3000 ${process.env.PORT}`)
})

/*
/ --> res =  this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> Get = user
/image --> PUT --> user
*/