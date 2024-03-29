USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSpCourLog]    Script Date: 04/16/2023 10:54:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwSpCourLog]
	@courId int, @ano varchar(50), @event varchar(50), @eventTime varchar(50), @rem varchar(50) = NULL
as

if LTRIM(rtrim(@rem)) = '' set @rem = NULL

if @event = 'vieword' 
	update OrdHdr with(rowlock) set wwwSeen = 1 where OrderNo = @ano and wwwSeen is null
else
begin
	if LTRIM(rtrim(@event)) = 'ready' 			
	update OrdHdr with(rowlock) set wwwSeen = 3 where OrderNo = @ano;	
	insert wwwCourLog (courId, ano, [event], eventTime, aTime, rem)
				values(@courId,@ano, @event, @eventTime, GETDATE(), @rem);			
end

select 'ok' as result

