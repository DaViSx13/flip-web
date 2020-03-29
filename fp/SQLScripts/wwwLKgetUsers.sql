USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetUsers]    Script Date: 03/26/2020 23:53:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwLKgetUsers]
as
select u.userID as id
, u.aUser
, u.active
, u.ClientID
, k.C_CO as C_Name
, c.RusName as c_city
, k.Loc
from wwwLKUser u
left join Klient k on u.ClientID = k.CACC
left join N_City c on c.id = k.C_CityID
where u.aUser != 'webadmin'
order by u.aUser

