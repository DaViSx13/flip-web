create table dbo.SberRequestHistory
(
    id      int identity
        constraint SberReauestHistory_pk
            primary key,
    date_in datetime default GETDATE() not null,
    content varchar(max)              not null
)
go

