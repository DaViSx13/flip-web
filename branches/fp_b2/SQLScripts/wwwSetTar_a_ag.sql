USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetTar_a_ag]    Script Date: 09/10/2012 20:32:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwSetTar_a_ag]
	@wb_no varchar(50), @interid int, @tar_a_ag float, @rem varchar(1000), @user varchar(50)=null
as

set @rem = LTRIM( RTRIM(@rem) )
if (@rem <> '' ) 
	and ( @rem <> (select convert(varchar(1000), rems) from InterCo where Wb_No = @wb_no and interId = @interid) )
set @rem = @rem + '[' + @user + ']'

/*
if (ISDATE(@p_d_in)=0) or (ISDATE(@tdd)=0) or (@rcpn='')
	begin
	print 'Неверный формат данных' --as msg
	return
	end
*/
/*
update InterCo
set	A_Chg = @tar_a_ag,
	T_Chg = ISNULL(B_Chg, 0) + ISNULL(V_Chg, 0) + @tar_a_ag,
	Rems = @rem
where Wb_No = @wb_no and interId = @interid
*/

declare @agID int
select @agID = agentID from wwwUser where aUser = @user

if exists( select 1 from tAChgReq where interId = @interid and aState = 0 )
	begin
	update tAChgReq set wbno = @wb_no, interId = @interid, a_Chg = @tar_a_ag, agId = @agID, aRem = @rem, aTime = GETDATE()
		where interId = @interid and aState = 0
	end
else
	begin
	insert tAChgReq(wbno, a_chg, interId, agId, aRem)
		values(@wb_no, @tar_a_ag, @interid, @agID, @rem)	
	end


--print 'Operation completed successfully' --as msg



