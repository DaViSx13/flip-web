USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetClientInfo]    Script Date: 01/12/16 17:25:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwClientGetClientInfo]
  @CACC varchar(50)
as

select 
    CName = k.C_CO
  , [Address] = k.C_Adr
  , ContName = k.C_Name
  , ContPhone = k.C_Tel
  , ContMail = k.Email
  , CityID = k.C_CityID
from Klient k
where k.CACC = @CACC

go

grant execute on [dbo].[wwwClientGetClientInfo]  to [public]
go