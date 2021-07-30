USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetWebWbs]    Script Date: 07/29/2021 09:48:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwLKgetWebWbsGROUP]
@order int
AS

SELECT [id],
	[Wb_No] as wbNum,
	[VOL_WT] as cost,
	rordnum = @order
FROM wwwClientWB
where [Ord_No] = @order
order by id desc

GRANT EXECUTE on [wwwLKgetWebWbsGROUP] to pod
