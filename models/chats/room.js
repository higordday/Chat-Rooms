
const database = require('./../../database/model.js');

class room_model 
{

    real_room(id) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.get('select * from chats where id = ?', [id], (error, row) => 
            {

                if (error) { return reject(error); }

                if (!row) { return resolve(false); }

                resolve(true);

            });
        });

    }

    get_all_previous_messages(chat_id) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.all('select username, message from messages where chat = ?', [chat_id], (error, rows) => 
            {

                if (error) { return reject(error); }

                resolve(rows);

            });
        });

    }

}

module.exports = room_model;