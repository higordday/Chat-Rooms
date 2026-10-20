
const chats_getter = require('./../models/chats/list.js');

global.router.get('/', (request, response) => 
{

    (async() => 
    {
        try 
        {

            const chats = await chats_getter();

            response.render('index', { chats: chats });

        } catch (error) 
        {

            console.error(error.message);

            response.json({ status: false, error: error.message });

        }
    })();

});