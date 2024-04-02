create table wwwSberRequestHistory
(
    id      int identity
        constraint SberReauestHistory_pk
            primary key,
    date_in datetime default getdate() not null,
    content varchar(max)               not null
)