create table wwwSberExtraFields
(
    id                int identity
        constraint SberExtraFields_pk
            primary key,
    ROrdNum           int not null
        constraint SberExtraFields_RegOrders_ROrdNum_fk
            references RegOrders,
    service_type      varchar(100),
    region            varchar(100),
    contract_num      int,
    INN               varchar(50),
    reestr            varchar(200),
    cost_rub          int,
    cost_kop          int,
    hour_tarif_rub    int,
    hour_tarif_kop    int,
    distance          int,
    waypointment_type varchar(20),
    cargo_name        varchar(200),
    height            int,
    length            int,
    width             int,
    fragile           binary,
    human_readable_id varchar(500),
    request_file_id   int
        constraint SberExtraFields_SberRequestHistory_id_fk
            references wwwSberRequestHistory
)