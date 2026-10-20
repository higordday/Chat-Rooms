
function create_chat() 
{

    const generate_id = (length = 10) => Math.random().toString(36).substring(2, 2 + length).padEnd(length, '0');

    fetch
    (
        '/chats/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: generate_id() }) }
        
    ).then( (response) => 
    {

        if (!response.ok) 
        { 
            
            console.error('Chat Creation Failure - HTTP POST Request Failed'); alert('Chat Creation Failure'); return; 

        }

        return response.json();

    }).then( (data) => 
    {

        if (!data.status) { alert(data.error); return; }

        alert('Successfully created the new Chat');

        window.location.reload();

    }).catch( (error) => 
    {

        console.error(error.message);

        alert('Chat Creation Failure');

    });

}

function delete_chat(id) 
{

    fetch
    (
        '/chats/delete', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) }

    ).then( (response) => 
    {

        if (!response.ok) 
        { 
            
            console.error('Chat Deletion Failure - HTTP DELETE Request Failure'); alert('Chat Deletion Failure'); return; 
        
        }

        return response.json();

    }).then( (data) => 
    {

        if (data.status == false) { alert(data.error); return; }

        alert('Successfully deleted Chat');

        window.location.reload();

    }).catch( (error) => 
    {

        console.error(error.message);

        alert('Chat Deletion Failure');

    });

}