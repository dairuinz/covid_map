CREATE TABLE IF NOT EXISTS users
(
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL DEFAULT 'unknown',
    e_mail VARCHAR(255) NOT NULL DEFAULT 'unknown',
    password VARCHAR(255) NOT NULL,
    isAdmin TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(username)
);

insert into users (id, username, e_mail, password, isAdmin) values (12341, 'orestis_m', 'ormaraziotis@gmail.com', 'roheyan22', 1);
