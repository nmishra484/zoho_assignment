const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const knex = require('knex');

//knex database and server
const psql = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password:'totora73#%^',
      database: 'postgres',
    },
  });

//app config
const app = express();
const register = require('./controller/register');
const login = require('./controller/login');

psql.select('*').from('users').then(data=>{
    console.log(data);
})


//middleware
app.use(cors());

app.use(bodyParser.json());

//api routes
app.get('/',(req,res)=>{res.send(/*database.users*/'its working!')})
app.post('/login', (req, res) => { login.handleSignin(req,res,psql,bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req,res,psql,bcrypt) })

app.listen(5000,()=>{
    console.log("app is listening on port 5000")
})