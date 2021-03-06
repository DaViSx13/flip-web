USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientCheckUser]    Script Date: 10/23/2019 08:30:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwClientCheckUser] 
	@user varchar(50), @password varchar(50), @ip varchar(50)=null
as

declare @user_ varchar(50), @password_ varchar(50)
set @user_=@user
set @password_=@password
select u.auser, u.active
	, u.agentID, p.partname as agentName, p.partloc as agentLOC
	, u.userID as clientID, k.C_CO as clientName, k.Loc as clientLOC, ISNULL(k.PlanNo, 2) as planno
from wwwClientUser u
	left join Partinf p on u.agentid=p.PartCode
	left join Klient k on k.CACC=u.CACC
where u.aUser=@user_ and u.aPassword COLLATE Cyrillic_General_CS_AS = @password_ COLLATE Cyrillic_General_CS_AS
and u.active = 1
if @@ROWCOUNT=1 insert [Log] ([user], [PKName]) values (@user_, @ip)

