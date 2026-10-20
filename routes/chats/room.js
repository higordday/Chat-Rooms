
const rm = require('./../../models/chats/room.js');
const room_model = new rm();

global.router.get('/room', (request, response) => 
{

    const { username, chat } = { username: request.query.username, chat: request.query.chat };

    if ((!username) || (!chat)) 
    {

        request.flash('message', 'Select a Chat Room and enter your username'); response.redirect('/'); return;

    }

    (async() => 
    {
        try 
        {

            const real_room = await room_model.real_room(chat);

            if (!real_room) 
            {

                request.flash('message', 'The chat does not exist'); response.redirect('/'); return;

            }

            proceed();

        } catch (error) 
        {

            console.error(error.message);

            request.flash('message', error.message); response.redirect('/');

        }
    })();

    function proceed() 
    {

        if (/^[a-zA-Z0-9_]+$/.test(username) == false) 
        {

            request.flash('message', 'Special characteres are not allowed in the username'); response.redirect('/'); return;

        }

        (async() => 
        {
            try 
            {

                const messages = await room_model.get_all_previous_messages(chat);

                response.render('chat_room', { current_username: username, current_chat_id: chat, messages: messages })

            } catch (error) 
            {

                console.error(error.message);
                
                request.flash('message', error.message); response.redirect('/');

            }
        })();

    }

});