alter procedure wwwGetUsers
as
select 
[login] = u.aUser
, u.active
, u.agentID
, p.PartName 
, p.PartLoc
from wwwUser u
	left join Partinf p on u.agentID = p.PartCode
order by [login]
go

grant execute on wwwGetUsers to [pod]
go

