USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwCheckUser]    Script Date: 02/28/2016 08:39:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwCheckUser] 
	@user varchar(50), @password varchar(50), @ip varchar(50)=null
as

declare @user_ varchar(50), @password_ varchar(50)
set @user_=@user
set @password_=@password
select u.auser, u.active, u.agentid, p.partname, p.partloc, ISNULL(k.PlanNo, 2) as planno
from wwwUser u
	left join Partinf p on u.agentid=p.PartCode
	left join Klient k on k.CACC=p.CACC
where u.aUser=@user_ and u.aPassword COLLATE Cyrillic_General_CS_AS = @password_ COLLATE Cyrillic_General_CS_AS
and u.active = 1
if @@ROWCOUNT=1 insert [Log] ([user], [PKName]) values (@user_, @ip)