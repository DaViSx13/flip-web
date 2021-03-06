USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetClientInfo]    Script Date: 01/12/16 17:25:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwClientGetClientInfo]
  @clientID varchar(50)
as

declare @CACC varchar(50)
if @clientID is not null and @clientID <> '' 
  select 
      @CACC = CACC
  from wwwClientUser where userID = @clientID

select 
    CACC,
    CName = k.C_CO
  , [Address] = k.C_Adr
  , ContName = k.C_Name
  , ContPhone = k.C_Tel
  , ContMail = k.Email
  , CityID = k.C_CityID
  , City = C_CITY
from Klient k
where k.CACC = @CACC

go

grant execute on [dbo].[wwwClientGetClientInfo]  to [pod]
go