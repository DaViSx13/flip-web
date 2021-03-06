USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetTar_a_ag]    Script Date: 11/09/16 19:12:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwSetTar_a_ag]
	@wb_no varchar(50), @interid int, @tar_a_ag float, @rem varchar(1000), @user varchar(50)=null
as

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName, @aUser = @user

BEGIN TRY
BEGIN TRAN

set @rem = LTRIM( RTRIM(@rem) )
if (@rem <> '' ) 
	and ( @rem <> (select convert(varchar(1000), rems) from InterCo where Wb_No = @wb_no and interId = @interid) )
set @rem = @rem + '[' + @user + ']'

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
	
select @wb_no AS wb_no

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwSetTar_a_ag: '+ ERROR_MESSAGE()
    RAISERROR (@ErrorMessage, -- Message text.
           16, -- Severity,
           1);
END CATCH
