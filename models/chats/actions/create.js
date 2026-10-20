
const database = require('./../../../database/model.js');

class create_chat_model 
{

    chats_quantity() 
    {

        return new Promise( (resolve, reject) => 
        {
            database.all('select * from chats', (error, rows) => 
            {

                if (error) { return reject(error); }

                if (rows.length >= 5) { return resolve(false); }

                resolve(true);

            });
        });

    }

    create(chat_id) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.run('insert into chats (id) values (?)', [chat_id], (error) => 
            {

                if (error) { return reject(error); }

                resolve(true);

            });
        });

    }

}

module.exports = create_chat_model;