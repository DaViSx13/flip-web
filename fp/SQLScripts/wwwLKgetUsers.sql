USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetUsers]    Script Date: 19.07.2018 12:47:36 ******/
DROP PROCEDURE [dbo].[wwwLKgetUsers]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetUsers]    Script Date: 19.07.2018 12:47:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwLKgetUsers]
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
left join N_City c on c.Code = k.Loc
where u.aUser != 'webadmin'
order by u.aUser

GO
grant execute on [wwwLKgetUsers] to [pod]
go

