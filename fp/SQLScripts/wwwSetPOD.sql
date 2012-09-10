USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetPOD]    Script Date: 09/10/2012 15:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwSetPOD]
	@wb_no varchar(50), @p_d_in datetime, @tdd datetime, @rcpn varchar(50), @user varchar(50)=null
as

set @rcpn = LTRIM( RTRIM(@rcpn) )
if (ISDATE(@p_d_in)=0) or (ISDATE(@tdd)=0) or (@rcpn='')
	begin
	RAISERROR ('Неверный формат данных', -- Message text.
               16, -- Severity.
               1 -- State.
               );
	end

update Main
set DOD = @p_d_in,
	P_D_IN = CONVERT(varchar(20), GETDATE(), 112),
	P_D_IN_HOW=1,
	TDD = @tdd,
	User_TDD = ISNULL(@user, User_TDD),
	RCPN = @rcpn
where Wb_No = @wb_no

--print 'Operation completed successfully' --as msg
