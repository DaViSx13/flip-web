create table dbo.SberRequestHistory
(
    id      int identity
        constraint SberReauestHistory_pk
            primary key,
    date_in datetime default GETDATE() not null,
    content varchar(8000)              not null
)
go

