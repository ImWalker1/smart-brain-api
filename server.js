const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controlers/register')
const signin = require('./controlers/signin')
const profile = require('./controlers/profile')
const image = require('./controlers/image')
const db = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res)=>{
	res.send('it is working')
})
app.post('/signin', (req, resp)=>{signin.handleSignin(req, resp, db, bcrypt)} )
app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (reg, resp)=>{ profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res)=>{ image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{ image.handleApiCall(req, res)})

 app.listen (process.env.PORT || 3000, ()=>{
 	console.log(`App is runnning on port ${process.env.PORT}`)
 })


