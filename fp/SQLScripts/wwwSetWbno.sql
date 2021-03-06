USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetWbno]    Script Date: 04/09/2013 09:36:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwSetWbno]
	@rordnum int,
	@wbno varchar(50)
as
BEGIN TRY
BEGIN TRAN

if @wbno = 'NULL' set @wbno = NULL
update AgOrders
set AgOrders.Wb_no = @wbno
where AgOrders.ROrdNum = @rordnum
select @rordnum AS ROrdNum

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwSetWbno: '+ ERROR_MESSAGE()
    RAISERROR (@ErrorMessage, -- Message text.
           16, -- Severity,
           1);
END CATCH


