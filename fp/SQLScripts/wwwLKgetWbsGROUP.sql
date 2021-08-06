USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWbsGROUP]    Script Date: 08/03/2021 14:32:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwLKgetWbsGROUP]
@order int
AS

declare @result table(
	wbNo varchar(50),
	rordnum int
)

insert into @result select Wb_no as wbNo, ROrdNum as rordnum from RegOrders where ROrdNum = @order
insert into @result SELECT wbNo, rordnum = @order FROM wwwLKWBGroup where orderNo = @order

SELECT
	wbNo as wbNum,
	rordnum = @order
FROM @result


