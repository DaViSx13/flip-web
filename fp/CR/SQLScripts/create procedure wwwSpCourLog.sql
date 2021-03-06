USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSpCourLog]    Script Date: 04/10/2013 13:34:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwSpCourLog]
	@courId int, @ano varchar(50), @event varchar(50), @eventTime varchar(50), @rem varchar(50) = NULL
as

if LTRIM(rtrim(@rem)) = '' set @rem = NULL

if @event = 'vieword' 
	update OrdHdr set wwwSeen = 1 where OrderNo = @ano and wwwSeen is null
else
	insert wwwCourLog (courId, ano, [event], eventTime, aTime, rem)
				values(@courId,@ano, @event, @eventTime, GETDATE(), @rem)

