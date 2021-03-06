USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetPOD]    Script Date: 05/12/16 16:56:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwSetPOD]
	@wb_no varchar(50), @p_d_in datetime, @tdd datetime, @rcpn varchar(15), @user varchar(50)=null
as
declare @err varchar(150)
BEGIN TRY
BEGIN TRAN

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName, @aUser = @user

set @rcpn = LTRIM( RTRIM(@rcpn) )
if (ISDATE(@p_d_in)=0) or (ISDATE(@tdd)=0) or (@rcpn='')
	begin
	RAISERROR ('Неверный формат данных', -- Message text.
               16, -- Severity.
               1 -- State.
               );
    return
	end
if @p_d_in > GETDATE()
	begin
	select @err = 'Дата '+convert(varchar(15), @p_d_in, 104)+' больше текущей '+convert(varchar(15), GETDATE(), 104)
	RAISERROR (@err, -- Message text.
               16, -- Severity.
               1 -- State.
               );
    return
	end
if exists(select 1 from Main where Wb_No = @wb_no)
	update Main with(rowlock)
	set DOD = @p_d_in,
		P_D_IN = CONVERT(varchar(20), GETDATE(), 112),
		P_D_IN_HOW=1,
		TDD = @tdd,
		User_TDD = ISNULL(@user, User_TDD),
		RCPN = @rcpn
	where Wb_No = @wb_no
else
	begin
	if not exists(select 1 from tPOD where wb_no = @wb_no)
		insert tPOD (wb_no, DOD, TDD, RCPN, aUser)
		values (@wb_no, @p_d_in, @tdd, @rcpn, @user)
	else
		update tPOD
			set DOD = @p_d_in
				,TDD = @tdd
				,RCPN = @rcpn
				,aUser = @user
				,aTime = getDate()
		where wb_no = @wb_no	
	end

select @wb_no as wb_no

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwSetPOD: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH
