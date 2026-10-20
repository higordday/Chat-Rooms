
const database = require('./../../../database/model.js');
const crypto = require('crypto');

function send_message(data) 
{

    const message_id = crypto.randomBytes(10).toString('hex');

    return new Promise( (resolve, reject) => 
    {
        database.run('insert into messages (id, chat, username, message) values (?, ?, ?, ?)', [message_id, data.chat, data.username, data.message], (error) => 
        {

            if (error) { return reject(error); }

            resolve(true);

        });
    });

}

module.exports = send_message;