
const dcm = require('./../../models/chats/actions/del.js');
const delete_chat_model = new dcm();

global.router.delete('/chats/delete', (request, response) => 
{

    const chat_id = request.body.id;

    (async() => 
    {
        try 
        {

            const existing_chat = await delete_chat_model.existing_chat(chat_id);

            if (!existing_chat) 
            {

                return response.json({ status: false, error: 'The Chat does not exist' });

            }

            _delete_();

        } catch (error) 
        {

            console.error(error.message);

            response.json({ status: false, error: error.message });

        }
    })();

    function _delete_() 
    {

        (async() => 
        {
            try 
            {

                await delete_chat_model.delete(chat_id);

                del_messages();

            } catch (error) 
            {

                console.error(error.message);

                response.json({ status: false, error: error.message });

            }
        })();

    }

    function del_messages() 
    {

        (async() => 
        {
            try 
            {

                await delete_chat_model.delete_all_associated_messages(chat_id);

                response.json({ status: true, error: null });

            } catch (error) 
            {

                console.error(error.message);

                response.json({ status: false, error: error.message });

            }
        })();

    }

});