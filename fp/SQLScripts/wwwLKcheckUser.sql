USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKcheckUser]    Script Date: 27.08.2018 8:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwLKcheckUser] 
	@user varchar(50), @password varchar(50), @ip varchar(50)=null
as

declare @user_ varchar(50), @password_ varchar(50)
set @user_=@user
set @password_=@password
select	u.auser, 
		u.active,
		u.clientID,
		case u.clientID
		when -1 then 'adm'
		else k.C_CO
		end as clientName, 
		k.Loc as clientLOC,
		0 as planno
from wwwLKUser u
left join Klient k on k.CACC=u.clientID
where u.aUser=@user_ and u.aPassword COLLATE Cyrillic_General_CS_AS = @password_ COLLATE Cyrillic_General_CS_AS
and u.active = 1
if @@ROWCOUNT=1 insert [Log] ([user], [PKName]) values (@user_, @ip)

