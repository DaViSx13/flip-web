USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetWbno]    Script Date: 03/19/2013 12:46:51 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwSetWbno]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwSetWbno]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetWbno]    Script Date: 03/19/2013 12:46:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[wwwSetWbno]
	@rordnum int,
	@wbno varchar(50)
as
update AgOrders
set Wb_no = @wbno
where ROrdNum = @rordnum


GO


grant execute on [dbo].[wwwSetWbno] to pod
go

