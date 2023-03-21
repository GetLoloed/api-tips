-- we don't know how to generate root <with-no-name> (class Root) :(
grant alter, alter routine, create, create routine, create tablespace, create temporary tables, create user, create view, delete, delete history, drop, event, execute, file, index, insert, lock tables, process, references, reload, replication client, replication slave, select, show databases, show view, shutdown, super, trigger, update, grant option on *.* to root@'127.0.0.1';

grant alter, alter routine, create, create routine, create tablespace, create temporary tables, create user, create view, delete, delete history, drop, event, execute, file, index, insert, lock tables, process, references, reload, replication client, replication slave, select, show databases, show view, shutdown, super, trigger, update, grant option on *.* to root@'::1';

grant alter, alter routine, create, create routine, create tablespace, create temporary tables, create user, create view, delete, delete history, drop, event, execute, file, index, insert, lock tables, process, references, reload, replication client, replication slave, select, show databases, show view, shutdown, super, trigger, update, grant option on *.* to root@localhost;

create table admin
(
    id          int auto_increment
        primary key,
    created_at  timestamp default current_timestamp() not null,
    modified_at timestamp default current_timestamp() not null on update current_timestamp(),
    pincode     int                                   null
);

create table restauranttable
(
    id          int auto_increment
        primary key,
    created_at  timestamp default current_timestamp() not null,
    modified_at timestamp default current_timestamp() not null on update current_timestamp(),
    name        varchar(255)                          null
);

create table services
(
    id          int auto_increment
        primary key,
    created_at  timestamp default current_timestamp() not null,
    modified_at timestamp default current_timestamp() not null on update current_timestamp(),
    shiftType   int                                   null,
    shiftClosed tinyint(1)                            null
);

create table tabletips
(
    id                 int auto_increment
        primary key,
    created_at         timestamp default current_timestamp() not null,
    modified_at        timestamp default current_timestamp() not null on update current_timestamp(),
    tips               int                                   null,
    id_restaurantTable int                                   null,
    id_service         int                                   null,
    constraint tabletips_ibfk_1
        foreign key (id_restaurantTable) references restauranttable (id),
    constraint tabletips_ibfk_2
        foreign key (id_service) references services (id)
);

create index id_restaurantTable
    on tabletips (id_restaurantTable);

create index id_service
    on tabletips (id_service);

create table users
(
    id          int auto_increment
        primary key,
    created_at  timestamp default current_timestamp() not null,
    modified_at timestamp default current_timestamp() not null on update current_timestamp(),
    firstname   varchar(255)                          null,
    lastname    varchar(255)                          null,
    status      tinyint(1)                            null,
    active      tinyint(1)                            null
);

create table serviceusers
(
    id_service int null,
    id_user    int null,
    constraint serviceusers_ibfk_1
        foreign key (id_service) references services (id),
    constraint serviceusers_ibfk_2
        foreign key (id_user) references users (id)
);

create index id_service
    on serviceusers (id_service);

create index id_user
    on serviceusers (id_user);

create table tipspayments
(
    id          int auto_increment
        primary key,
    created_at  timestamp default current_timestamp() not null,
    modified_at timestamp default current_timestamp() not null on update current_timestamp(),
    amount      int                                   null,
    id_user     int                                   null,
    constraint tipspayments_ibfk_1
        foreign key (id_user) references users (id)
);

create index id_user
    on tipspayments (id_user);

