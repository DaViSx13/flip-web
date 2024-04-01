USE [ALERT_F]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure wwwFillSberExtraFields
    @order              int,               -- ЗАКАЗ
    @humanReadableID    varchar(500),      -- ИД отправления Сбер
    @serviceType        varchar(50),       -- Вид услуги
    @region             varchar(100),      -- Регион
    @contractNum        varchar(100),      -- Номер контракта
    @inn                int,               -- ИНН
    @reestr             varchar(50),       -- Код группы
    @costRub            int,               -- Предварительная стоимость доставки, руб
    @costKop            int,               -- Предварительная стоимость доставки, коп
    @hourTariffRub      int,               -- Стоимость каждого последующего часа доставки (час/руб)
    @hourTariffKop      int,               -- Стоимость каждого последующего часа доставки (коп/руб)
    @distance           int,               -- Предварительная дальность доставки, км
    @waypointType       varchar(20),       -- Тип точки (сбор/доставка/сбор-доставка)
    @cargoName          varchar(500),      -- Наименование груза
    @height             int,               -- Высота
    @width              int,               -- Ширина
    @length             int,               -- Длинна
    @fragile            binary             -- Признак бьющегося груза
AS
    IF @order IS NOT NULL
        BEGIN
           UPDATE
               SberExtraFields
            SET
                human_readable_id   = @humanReadableID,
                service_type        = @serviceType,
                region              = @region,
                contract_num        = @contractNum,
                INN                 = @inn,
                reestr              = @reestr,
                cost_rub            = @costRub,
                cost_kop            = @costKop,
                hour_tarif_rub      = @hourTariffRub,
                hour_tarif_kop      = @hourTariffKop,
                distance            = @distance,
                waypointment_type   = @waypointType,
                cargo_name          = @cargoName,
                height              = @height,
                width               = @width,
                length              = @length,
                fragile             = @fragile
            WHERE
                order_id            = @order
        END
    ELSE
        BEGIN
           INSERT INTO SberExtraFields(
                order_id,
                human_readable_id,
                service_type,
                region,
                contract_num,
                INN,
                reestr,
                cost_rub,
                cost_kop,
                hour_tarif_rub,
                hour_tarif_kop,
                distance,
                waypointment_type,
                cargo_name,
                height,
                width,
                length,
                fragile
           )
           VALUES (
                @order,
                @humanReadableID,
                @serviceType,
                @region,
                @contractNum,
                @inn,
                @reestr,
                @costRub,
                @costKop,
                @hourTariffRub,
                @hourTariffKop,
                @distance,
                @waypointType,
                @cargoName,
                @height,
                @width,
                @length,
                @fragile
           )
        END
go

GRANT EXECUTE ON wwwFillSberExtraFields TO pod

go
