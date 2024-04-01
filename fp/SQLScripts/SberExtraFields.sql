create table SberExtraFields
(
    id                int identity
        constraint SberExtraFields_pk
            primary key,
    order_id          int not null
        constraint SberExtraFields_RegOrders_ROrdNum_fk
            references RegOrders,
    service_type      varchar(100),
    region            varchar(100),
    contract_num      int,
    INN               int,
    reestr            int,
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
    human_readable_id varchar(500)
)