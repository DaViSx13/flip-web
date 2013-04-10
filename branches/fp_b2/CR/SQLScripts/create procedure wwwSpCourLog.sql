create procedure wwwSpCourLog
	@courId int, @ano varchar(50), @event varchar(50), @eventTime varchar(50), @rem varchar(50) = NULL
as

if LTRIM(rtrim(@rem)) = '' set @rem = NULL

insert wwwCourLog (courId, ano, [event], eventTime, aTime, rem)
			values(@courId,@ano, @event, @eventTime, GETDATE(), @rem)

go

grant execute on [wwwSpCourLog] to [pod] 
go