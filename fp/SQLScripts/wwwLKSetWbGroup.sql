-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		vd.zinovev
-- Create date: 03.08.2021
-- Description:	Set group wb in LK Moscow
-- =============================================
CREATE PROCEDURE wwwLKSetWbGroup
	@wbs varchar(500),
	@order int
AS
BEGIN

	declare @wbNoSTRING varchar(100)
	declare cr cursor for
		select Value from split(@wbs, ',')
		
	open cr fetch next from cr into @wbNoSTRING while @@FETCH_STATUS = 0
	begin	
		if (select COUNT(1) from wwwLKWBGroup where wbNo = @wbNoSTRING) > 0
			begin
				update wwwLKWBGroup set orderNo = @order where wbNo = @wbNoSTRING  
			end
		else
			begin
				insert into wwwLKWBGroup (wbNo, orderNo) values (@wbNoSTRING, @order);
			end	
	end
	close cr
	deallocate cr
END
GO
