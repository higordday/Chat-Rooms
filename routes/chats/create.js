
const ccm = require('./../../models/chats/actions/create.js');
const create_chat_model = new ccm();

global.router.post('/chats/create', (request, response) => 
{

    const chat_id = request.body.id;

    (async() => 
    {
        try 
        {

            const chats_quantity = await create_chat_model.chats_quantity();

            if (!chats_quantity) 
            {

                return response.json({ status: false, error: 'You have reached the Chat limit' });

            }

            create();

        } catch (error) 
        {

            console.error(error.message);

            response.json({ status: false, error: error.message });

        }
    })();

    function create() 
    {

        (async() => 
        {
            try 
            {

                await create_chat_model.create(chat_id);

                response.json({ status: true, error: null });

            } catch (error) 
            {

                console.error(error.message);

                response.json({ status: false, error: error.message });

            }
        })();

    }

});