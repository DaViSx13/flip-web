USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetWbno]    Script Date: 01/10/2021 19:35:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[wwwSetWbNoClient]
	@rordnum int,
	@wbno varchar(50)
as
BEGIN TRY
BEGIN TRAN

if @wbno = 'NULL' set @wbno = NULL
update RegOrders
set RegOrders.Wb_no = @wbno
where RegOrders.ROrdNum = @rordnum
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


GO

GRANT EXECUTE ON wwwSetWbNoClient to pod
GRANT INSERT ON RegOrdersLog to pod
