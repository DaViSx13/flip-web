USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwCheckUser]    Script Date: 11/18/2012 11:40:35 ******/
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

select auser, active, agentid, p.partname, p.partloc
from wwwUser u
	left join Partinf p on u.agentid=p.PartCode
where aUser=@user_ and aPassword COLLATE Cyrillic_General_CS_AS = @password_ COLLATE Cyrillic_General_CS_AS

if @@ROWCOUNT=1 insert [Log] ([user], [PKName]) values (@user_, @ip)
