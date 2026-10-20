
const database = require('./../../../database/model.js')

class delete_chat_model 
{

    existing_chat(id) 
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

    delete(chat_id) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.get('delete from chats where id = ?', [chat_id], (error) => 
            {

                if (error) { return reject(error); }

                resolve(true);

            });
        });

    }

    delete_all_associated_messages(chat_id) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.run('delete from messages where chat = ?', [chat_id], (error) => 
            {

                if (error) { return reject(error); }

                resolve(true);

            });
        });

    }

}

module.exports = delete_chat_model;