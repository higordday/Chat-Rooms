CREATE TABLE chats 
(

	db_id integer primary key autoincrement,
	id char(10)

);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE messages
(
	
	db_id integer primary key autoincrement,
	id char(10),
	chat char(10),
	username varchar(255),
	message text

);
