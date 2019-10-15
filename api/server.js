  
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session')
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const KnexSessionStore = require('connect-session-knex')(sessions);
const knexConfig = require("../data/dbConfig")
const Secret = process.env.SECRET
const server = express();
const sessionConfiguration ={
  name:'sid',
  secret: "I'll Never Tell",
  cookie:{
    httpOnly:true, // js has no access
    maxAge:1000*60*60, //ms
    secure:false, //If production would be true
  },
  resave:false,
  saveUninitialized:true,
  // stores to database instead of local memory
  store: new KnexSessionStore({
    knex: knexConfig,
    createtable: true,
    clearInterval:1000*60*30 // every 30 mins check and delete expired sessions
  })
}

//Global Middleware
server.use(sessions(sessionConfiguration))
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;