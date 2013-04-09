USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetWbno]    Script Date: 04/08/2013 13:06:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwSetWbno]
	@rordnum int,
	@wbno varchar(50)
as
BEGIN TRY

if @wbno = 'NULL' set @wbno = NULL
update AgOrders
set AgOrders.Wb_no = @wbno
where AgOrders.ROrdNum = @rordnum
select @rordnum AS ROrdNum
END TRY
BEGIN CATCH
    RAISERROR ('Error in wwwSetWbno', -- Message text.
           16, -- Severity,
           1);
END CATCH


