
const database = require('./../../database/model.js');

function chats_getter() 
{

    return new Promise( (resolve, reject) => 
    {
        database.all('select id from chats order by db_id desc', (error, rows) => 
        {

            if (error) { return reject(error); }

            resolve(rows);

        });
    });

}

module.exports = chats_getter;