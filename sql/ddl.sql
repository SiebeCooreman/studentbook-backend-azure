/* create table course
(
    name        varchar(100) not null,
    id          int auto_increment
        primary key,
    description varchar(255) null,
    phase       int          not null,
    constraint course_id_uindex
        unique (id)
);

create table lecturer
(
    id   int auto_increment
        primary key,
    name varchar(100) not null,
    constraint lecturer_id_uindex
        unique (id)
);

create table lecturer_course
(
    id          int auto_increment
        primary key,
    lecturer_id int not null,
    course_id   int not null,
    constraint fk_course_id
        foreign key (course_id) references course (id),
    constraint fk_lecturer_id
        foreign key (lecturer_id) references lecturer (id)
);



INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 4', 1, 'Web development with Express and React', 2);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 1', 2, 'Valid HTML & CSS', 1);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Algoritmisch denken', 3, 'Learn to write algorithms', 1);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 2', 5, 'Servlets & JSP', 1);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 3', 6, 'Client-server, JS, security, deployment', 2);


INSERT INTO lecturers.lecturer (id, name) VALUES (1, 'Elke Steegmans');
INSERT INTO lecturers.lecturer (id, name) VALUES (2, 'Johan Pieck');
INSERT INTO lecturers.lecturer (id, name) VALUES (3, 'Greetje Jongen');
INSERT INTO lecturers.lecturer (id, name) VALUES (4, 'Jan Van Hee');

INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (1, 1, 1);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (2, 1, 6);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (3, 2, 1);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (4, 2, 2);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (5, 2, 3);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (6, 3, 2);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (7, 3, 5);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (8, 3, 6);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (9, 4, 2);
 */


 -- eigen queries

create table user
(
    id          int auto_increment primary key,
    name   varchar(100) not null,
    status varchar(255) not null,
    LoggedIn boolean    not null,
    message_id int,
    constraint user_id_uindex
        unique (id),
    constraint fk_message_id
    foreign key (message_id) references message(id)
);


create table message
(   
    id      int auto_increment,
    chat_id int not null,
    text    varchar(1000) not null,
    DateSent timestamp not null,
    type    varchar(7) not null,

    constraint message_id_uindex
    unique (id),
    constraint fk_author
    foreign key (author) references user (id),
    constraint fk_chat
    foreign key (chat_id) references chat (id),
    constraint type_enum CHECK (type = 'public' OR type = 'private'),
);

create table chat
(
    id  int auto_increment primary key,
    message_id int,

    constraint chat_id_uindex
    unique (id),
    constraint fk_message_id
    foreign key (message_id) references message(id)
);

create table user_has_chat
(
    id  int auto_increment primary key,
    chat_id int not null,
    user_id   int not null,
    message_id int not null,
    constraint fk_chat_id
        foreign key (chat_id) references chat (id),
    constraint fk_user_id
        foreign key (lecturer_id) references lecturer (id)
);


create table user_has_friend
(
    id      int auto_increment primary key,
    user_id int not null,
    friend_id int not null,

    constraint fk_user_id
        foreign key(user_id) references user(id),
    constraint fk_friend_id
        foreign key(friend_id) references user(id),
)



INSERT INTO studentbook.user (id, name, status, LoggedIn) VALUES (1, 'Siebe Cooreman', 'I am eating', True);
INSERT INTO studentbook.user (id, name, status, LoggedIn) VALUES (2, 'Greg Francois Reynders', 'Offline', False);
INSERT INTO studentbook.chat (id) VALUES (1);
INSERT INTO studentbook.message (id, chat_id, text, DateSent, author, type) VALUES (1, 1, "Hallo Greg, hoe gaat het", '2017-05-05 18:05:23', 1, 'public');
INSERT INTO studentbook.message (id, chat_id, text, DateSent, author, type) VALUES (1, 1, "Hallo Siebe, alles goed", '2017-05-05 19:05:23', 1, 'public');
INSERT INTO studentbook.user_has_friend (id, user_id, friend_id) VALUES (1, 1, 2);
INSERT INTO studentbook.user_has_chat(id, chat_id, user_id) VALUES (1, 1, 1)
INSERT INTO studentbook.user_has_chat(id, chat_id, user_id) VALUES (2, 1, 2)