USE [ALERT_F]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure wwwFillSberExtraFields
    @order              int,               -- �����
    @humanReadableID    varchar(500),      -- �� ����������� ����
    @serviceType        varchar(50),       -- ��� ������
    @region             varchar(100),      -- ������
    @contractNum        varchar(100),      -- ����� ���������
    @inn                int,               -- ���
    @reestr             varchar(50),       -- ��� ������
    @costRub            int,               -- ��������������� ��������� ��������, ���
    @costKop            int,               -- ��������������� ��������� ��������, ���
    @hourTariffRub      int,               -- ��������� ������� ������������ ���� �������� (���/���)
    @hourTariffKop      int,               -- ��������� ������� ������������ ���� �������� (���/���)
    @distance           int,               -- ��������������� ��������� ��������, ��
    @waypointType       varchar(20),       -- ��� ����� (����/��������/����-��������)
    @cargoName          varchar(500),      -- ������������ �����
    @height             int,               -- ������
    @width              int,               -- ������
    @length             int,               -- ������
    @fragile            binary,            -- ������� ��������� �����
    @fileID             int            -- �� �����
AS
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
                fragile,
                request_file_id
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
                @fragile,
                @fileID
           )
        END

        SELECT SCOPE_IDENTITY()
go

GRANT EXECUTE ON wwwFillSberExtraFields TO pod

go
