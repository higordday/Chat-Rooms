
const http = require('http');
const socket_io = require('socket.io');
const express = require('express');
const ejs = require('ejs');
const body_parser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const dotenv = require('dotenv');

// ---

const application = express();

// ---

const server = http.createServer(application);
const sio = socket_io(server);

// ---

global.router = express.Router();

// ---

dotenv.config();

// ---

application.use
(
    session({ secret: process.env.EXPRESS_SESSION_SECRET_KEY, resave: true, saveUninitialized: true })
);

application.use(flash());

// --- Main Middleware

application.use( (request, response, next) => 
{

    response.locals.message = request.flash('message');

    next();

}); 

// ---

application.engine('ejs', ejs.renderFile);
application.set('view engine', 'ejs');

application.set('views', path.join(__dirname, './views'));

// ---

application.use(body_parser.urlencoded({ extended: false }));
application.use(body_parser.json());

// ---

application.use(express.static(path.join(__dirname, './assets')));

// ---

const send_message = require('./models/chats/messages/send.js');

sio.on('connection', (socket) => 
{

    socket.on('join_chat', (chat_id) => { socket.join(chat_id); });

    socket.on('leave_chat', (chat_id) => { socket.leave(chat_id); });

    socket.on('send', (data) => 
    {

        (async() => 
        {
            try 
            {

                await send_message(data);

            } catch (error) 
            {

                console.error(error.message);

            }
        })();

        sio.to(data.chat).emit('broadcast', data);

    });

});

// ---

require('./routes/index.js');

// --- Chats

require('./routes/chats/create.js');
require(   './routes/chats/del.js');
require(  './routes/chats/room.js');

// ------

application.use('/', global.router);

// ---

server.listen
(
    process.env.SERVER_LISTENING_PORT, console.log(`\nServer Listening on ${process.env.SERVER_LISTENING_PORT} Port`)
);