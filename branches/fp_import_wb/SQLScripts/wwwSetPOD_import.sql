USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetPOD_import]    Script Date: 02/13/2014 14:41:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwSetPOD_import]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwSetPOD_import]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetPOD_import]    Script Date: 02/13/2014 14:41:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[wwwSetPOD_import]
	@wb_no varchar(50), @p_d_in datetime, @tdd datetime, @rcpn varchar(15), @user varchar(50)=null
as
declare @exist int
,@goodDate int=0
 
select @exist = COUNT(*) 
from Main where Wb_No = ltrim(rtrim(@wb_no))

select @goodDate = case when (DATEDIFF (hour,D_Acc,@p_d_in)<1)then 0 else 1 end
from Main where Wb_No = ltrim(rtrim(@wb_no))


update Main
set DOD = @p_d_in,
	P_D_IN = CONVERT(varchar(20), GETDATE(), 112),
	P_D_IN_HOW=1,
	TDD = @tdd,
	User_TDD = ISNULL(@user, User_TDD),
	RCPN = @rcpn
where Wb_No = ltrim(rtrim(@wb_no))

select @wb_no as wb_no, dbo.fn_CountMnfBdyForUserById(ltrim(rtrim(@wb_no)),@user) as countNo, @exist as ex,@goodDate as gd

GO

GO
GRANT EXECUTE ON [dbo].[wwwSetPOD_import] TO [pod] AS [dbo]
GO

GRANT UPDATE ON [dbo].Main TO [pod] AS [dbo]
GO